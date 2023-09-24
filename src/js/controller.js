import { async } from 'regenerator-runtime';
import * as model from './model.js';
import { MODAL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2
// 2a2fcd7f-0ea8-4052-b1c4-d92c8594a6a2
///////////////////////////////////////
// console.log("test");
// const renderSpinner = function (parentEl) {
//     const markup = `
//           <div class="spinner">
//             <svg>
//               <use href="${icons}#icon-loader"></use>
//             </svg>
//           </div>`;
//     parentEl.innerHTML = '';
//     parentEl.insertAdjacentHTML('beforeend', markup);
// };
const controlRecipes = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    // update search result view to selected search results
    resultsView.update(model.getSearchResultsPage());
    bookmarkView.update(model.state.bookmark);
    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    // 3)updating bookmark View
    // debugger;
    console.log(model.state.recipe);
    // test
    // controlServings();
  } catch (err) {
    // console.error(err);
    // ${err}💥💥💥
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 1) Get search Query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load search results
    await model.loadSearchResults(query);
    // 3) rendering results
    resultsView.render(model.getSearchResultsPage());
    // bookmarkView.update(model.state.bookmark);

    // 4) The initial pagination results
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
controlSearchResults();
const controlPagination = function (goToPage) {
  // 1) rendering new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) The initial new pagination results
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
  // console.log(model.state.recipe);
};

const controlAddBookmark = function () {
  //  1)Render bookmarks view
  bookmarkView.render(model.state.bookmark);
  // 2) Add/remove bookmarks
  if (!model.state.recipe.bookmark) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // 3) Update the bookmarks view
  recipeView.update(model.state.recipe);
};
const controlBookmark = function () {
  bookmarkView.render(model.state.bookmark);
};
const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    // upload the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // success message
    addRecipeView.renderMessage();
    bookmarkView.render(model.state.bookmark);

    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Window.history.back();
    // close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(`${err} 💥💥`);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmark);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView._addhandlerUpload(controlAddRecipe);
};
init();
