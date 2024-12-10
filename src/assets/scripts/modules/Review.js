import truncate from 'truncate-html';

export class Review {
	constructor(
		selector = '.js-review',
		{
			collapsed = true,
			contentLength = 100,
			bodySelector = '.js-review-body',
			buttonSelector = '.js-review-button',
		} = {},
	) {
		this.element = typeof selector === 'string' ? document.querySelector(selector) : selector;
		this.collapsed = collapsed;
		this.contentLength = contentLength;

		if (this.element) {
			this.body = this.element.querySelector(bodySelector);
			this.button = this.element.querySelector(buttonSelector);

			if (this.body && this.button) {
				this.content = this.body.innerHTML;
				this.init();
			}
		}
	}

	init() {
		if (this.content.replace(/<[^>]*>/g, '').trim().length <= this.contentLength) {
			this.button.remove();
		} else {
			this.updateContent();
			this.button.addEventListener('click', () => this.toggle());
		}
	}

	updateContent() {
		if (this.collapsed) {
			this.body.innerHTML = truncate(this.content, this.contentLength);
			this.button.textContent = 'Развернуть';
		} else {
			this.body.innerHTML = truncate(this.content, Infinity);
			this.button.textContent = 'Свернуть';
		}
	}

	toggle() {
		this.collapsed = !this.collapsed;
		this.updateContent();
	}
}
