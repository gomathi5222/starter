class searchView {
    #parentEl = document.querySelector('.search');
    getQuery() {
        return this.#parentEl.querySelector('.search__field').value;
    }
}

export default new searchView();