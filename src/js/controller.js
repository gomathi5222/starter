import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
// if (module.hot) {
//   module.hot.accept();
// }
// const recipeContainer = document.querySelector('.recipe');
// https://forkify-api.herokuapp.com/v2
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
    // console.log(id);
    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
    // test
    // controlServings();
  } catch (err) {
    // console.error(err);
    // ${err}💥💥💥
    recipeView.renderError();
  }

}


const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // console.log(resultsView);
    // 1) Get search Query
    const query = searchView.getQuery();
    if (!query) return;
    // 2) load search results
    await model.loadSearchResults(query)
    // 3) rendering results
    resultsView.render(model.getSearchResultsPage(3));

    // 4) The initial pagination results
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}
controlSearchResults();
const controlPagination = function (goToPage) {
  // 1) rendering new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) The initial new pagination results
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings);

  // update the recipe view
  recipeView.render(model.state.recipe);
  console.log(model.state.recipe);
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

}
init();