/** Modules: Site menu */
import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export class Navbar {
	constructor() {
		this.element = document.querySelector('.js-navbar');
		this.buttons = document.querySelectorAll('.js-navbar-button');
		this.options = {
			activeClass: 'is-active',
		};

		if (this.element) {
			this.init();
		}
	}

	open = () => {
		disablePageScroll();
		this.buttons.forEach((button) => button.classList.add(this.options.activeClass));
		this.element.classList.add(this.options.activeClass);
		this.element.style.paddingRight = getComputedStyle(document.body).paddingRight;
	};

	close = () => {
		this.buttons.forEach((button) => button.classList.remove(this.options.activeClass));
		this.element.classList.remove(this.options.activeClass);
		this.element.style.removeProperty('padding-right');
		enablePageScroll();
	};

	init() {
		this.buttons.forEach((button) => {
			if (button.dataset?.navbarAction === 'open') button.addEventListener('click', this.open);
			if (button.dataset?.navbarAction === 'close') button.addEventListener('click', this.close);
		});

		this.element.addEventListener('click', ({ target }) => {
			if (target && target.closest('a[href]')) this.close();
		});
	}
}
