import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _ErrorMsg = 'No recipe found for your query! Please try again :)';
  _message = '';

  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new ResultView();
