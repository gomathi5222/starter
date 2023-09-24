import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

constructor(){
    super();
    this._addhandlerShowWindow();
    this._addhandlerHideWindow();
}
toggleWindow(){
    this._overlay.classList.toggle('hidden')
    this._window.classList.toggle('hidden')
  }
  _addhandlerShowWindow(){
    this._btnOpen.addEventListener('click',this.toggleWindow.bind(this))
  }
  _addhandlerHideWindow(){
    this._btnClose.addEventListener('click',this.toggleWindow.bind(this));
    this._overlay.addEventListener('click',this.toggleWindow.bind(this));
  }
  _addhandlerUpload(handler){
    this._parentEl.addEventListener('submit',function(e){
        e.preventDefault();
        const dataArr =[...new FormData(this)];
        const data = Object.fromEntries(dataArr);
        handler(data);
        

    })
  }
  _generateMarkup() {}
}
export default new AddRecipeView();
