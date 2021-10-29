class fcTooltip {
    constructor(el) {
        this.content = el.dataset.content;

        let top = window.pageYOffset + el.getBoundingClientRect().top;
        let left = window.pageXOffset + el.getBoundingClientRect().left;

        this.el = document.createElement('div');
        this.el.classList.add('fc-tt');

        this.el.style.top = `${top}px`;
        this.el.style.left = `${left}px`;

        this.contentWrap = document.createElement('div');
        this.contentWrap.classList.add('fc-tt-content');
        this.closeButton = document.createElement('button');
        this.closeButton.classList.add('fc-tt-close');
        this.closeButton.innerText = `⨯`;

        this.contentWrap.innerHTML = this.content;

        this.closeButton.addEventListener('click', () => {
            document.body.removeChild(this.el);
        })

        this.el.append(this.contentWrap);
        this.el.append(this.closeButton);

        document.body.append(this.el);
    }
}

let ttTriggers = document.querySelectorAll('.fc-tt-trigger');

ttTriggers.forEach((tr) => {
    tr.addEventListener('click', () => {
        new fcTooltip(tr);
    })
})