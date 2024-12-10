/** Module: Popup */

import { disablePageScroll, enablePageScroll } from 'scroll-lock';

export class Popup {
	constructor(selector = '.js-popup') {
		this.element = document.querySelector(selector);
		this.openButtons = document.querySelectorAll(`.js-popup-button[data-popup-open="${this.element.id}"]`);
		this.closeButtons = document.querySelectorAll(`.js-popup-button[data-popup-close="${this.element.id}"]`);
		this.options = {
			activeClass: 'is-active',
		};

		if (this.element) {
			this.init();
		}
	}

	open = () => {
		disablePageScroll();
		this.element.classList.add(this.options.activeClass);
		this.element.style.paddingRight = getComputedStyle(document.body).paddingRight;
	};

	close = () => {
		this.element.classList.remove(this.options.activeClass);
		this.element.style.removeProperty('padding-right');
		enablePageScroll();
	};

	init() {
		this.openButtons.forEach((button) => button.addEventListener('click', this.open));
		this.closeButtons.forEach((button) => button.addEventListener('click', this.close));

		this.element.addEventListener('click', ({ target }) => {
			if (target && Object.prototype.hasOwnProperty.call(target.dataset, 'popupClose')) this.close();
		});
	}
}
