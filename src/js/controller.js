import * as model from './model.js';
import recipeView from './views/recipeView.js';
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
    console.log(id);
    // 1) Loading recipe
    await model.loadRecipe(id);
    // 2) Rendering Recipe
    recipeView.render(model.state.recipe);
    console.log(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
}
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
}
init();