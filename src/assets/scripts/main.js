import Splide from '@splidejs/splide';
import { Navbar } from './modules/Navbar';

window.addEventListener('DOMContentLoaded', () => {
	/**
	 * Main modules
	 */

	new Navbar();

	/**
	 * Sliders
	 */

	const servicesSliders = document.querySelectorAll('[data-slider="services"]');
	const directionsSliders = document.querySelectorAll('[data-slider="directions"]');
	const casesSliders = document.querySelectorAll('[data-slider="cases"]');
	const reviewsSliders = document.querySelectorAll('[data-slider="reviews"]');

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
});

console.log(
	'%cGOWEB.PRO\n' + '%cХочешь такой же сайт?' + '%c\n\nПиши в telegram: @goweb_pro\nНаш сайт: https://goweb.pro',
	'font-size: 37px; font-weight: 900; color: rgb(90, 205, 211);',
	'font-size: 14px; background: rgb(90, 205, 211); padding: 5px 10px; color: rgb(255, 255, 255);',
	'line-height: 1.5; background: none;',
);
