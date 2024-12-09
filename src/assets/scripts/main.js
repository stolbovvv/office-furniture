import Splide from '@splidejs/splide';
import { Fancybox } from '@fancyapps/ui';
import { Navbar } from './modules/Navbar';
import { Popup } from './modules/Popup';
import { Quiz } from './modules/Quiz';
import { Review } from './modules/Review';

window.addEventListener('DOMContentLoaded', () => {
	/**
	 * Main modules
	 */

	new Navbar();
	new Popup('#popup-callback');
	new Quiz('#quiz');

	document.querySelectorAll('.review-card').forEach((review) => {
		new Review(review, {
			collapsed: true,
			contentLength: 200,
			bodySelector: '.review-card__body',
			buttonSelector: '.review-card__button-text',
		});
	});

	/**
	 * Galleries
	 */

	Fancybox.bind('[data-fancybox="about-gallery"]');
	Fancybox.bind('[data-fancybox="case-gallery"]');

	/**
	 * Sliders
	 */

	const servicesSliders = document.querySelectorAll('[data-slider="services"]');
	const directionsSliders = document.querySelectorAll('[data-slider="directions"]');
	const casesSliders = document.querySelectorAll('[data-slider="cases"]');
	const reviewsSliders = document.querySelectorAll('[data-slider="reviews"]');
	const teamSliders = document.querySelectorAll('[data-slider="team"]');
	const imagesSliders = document.querySelectorAll('[data-slider="images"]');

	servicesSliders.forEach((servicesSlider) => {
		new Splide(servicesSlider, {
			destroy: true,
			pagination: false,
			breakpoints: {
				767.5: {
					gap: 10,
					perPage: 1,
					destroy: false,
				},
			},
		}).mount();
	});

	directionsSliders.forEach((directionsSlider) => {
		new Splide(directionsSlider, {
			destroy: true,
			autoWidth: true,
			pagination: false,
			breakpoints: {
				1023.5: {
					gap: 20,
					destroy: false,
				},
				767.5: {
					gap: 10,
				},
			},
		}).mount();
	});

	casesSliders.forEach((casesSlider) => {
		new Splide(casesSlider, {
			destroy: true,
			autoWidth: true,
			pagination: false,
			breakpoints: {
				1023.5: {
					gap: 20,
					destroy: false,
				},
				767.5: {
					gap: 10,
				},
			},
		}).mount();
	});

	reviewsSliders.forEach((reviewsSlider) => {
		new Splide(reviewsSlider, {
			updateOnMove: true,
			pagination: false,
			perPage: 3,
			perMove: 1,
			gap: 20,
			breakpoints: {
				1279.5: {
					perPage: 2,
				},
				1023.5: {
					perPage: 1,
					gap: 10,
				},
			},
		}).mount();
	});

	teamSliders.forEach((teamSlider) => {
		new Splide(teamSlider, {
			pagination: false,
			perPage: 5,
			gap: 20,
			breakpoints: {
				1279.5: {
					perPage: 4,
				},
				1023.5: {
					perPage: 3,
				},
				767.5: {
					perPage: 2,
					gap: 10,
				},
				575.5: {
					perPage: 1,
				},
			},
		}).mount();
	});

	imagesSliders.forEach((imagesSlider) => {
		new Splide(imagesSlider, {
			type: 'fade',
			arrows: false,
			pagination: true,
		}).mount();
	});
});

console.log(
	'%cGOWEB.PRO\n' + '%cХочешь такой же сайт?' + '%c\n\nПиши в telegram: @goweb_pro\nНаш сайт: https://goweb.pro',
	'font-size: 37px; font-weight: 900; color: rgb(90, 205, 211);',
	'font-size: 14px; background: rgb(90, 205, 211); padding: 5px 10px; color: rgb(255, 255, 255);',
	'line-height: 1.5; background: none;',
);
