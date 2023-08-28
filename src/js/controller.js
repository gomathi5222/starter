import { async } from 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
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
    // console.log(model.state.recipe);
  } catch (err) {
    // console.error(err);
    // ${err}💥💥💥
    recipeView.renderError();
  }
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
}
init();

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query)
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
}
controlSearchResults();