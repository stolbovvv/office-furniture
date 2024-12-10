export class Quiz {
	constructor(selector = '.js-quiz') {
		this.element = document.querySelector(selector);

		if (this.element) {
			this.initializeProperties();
			this.addEventListeners();
			this.initializeQuiz();
			this.markInitialSelectedVariants();
		}
	}

	initializeProperties() {
		this.steps = [...this.element.querySelectorAll('.js-quiz-step')];
		this.buttonVariants = [...this.element.querySelectorAll('button.js-quiz-variant')];
		this.customVariants = [...this.element.querySelectorAll('label.js-quiz-variant')];
		this.navigation = [];
		this.result = this.element.querySelector('.js-quiz-result');
		this.questions = this.element.querySelector('.js-quiz-questions');
		this.prevButton = this.element.querySelector('.js-quiz-prev-button');
		this.nextButton = this.element.querySelector('.js-quiz-next-button');
	}

	toggleDisplay(element, shouldShow) {
		element.style.display = shouldShow ? '' : 'none';
	}

	updatePrevButtonState() {
		if (this.prevButton) {
			this.prevButton.disabled = this.navigation.length <= 1;
		}
	}

	navigateToStep(id) {
		const isResultStep = id === 'quiz-result';
		this.toggleDisplay(this.questions, !isResultStep);
		this.toggleDisplay(this.result, isResultStep);

		if (!isResultStep) {
			this.steps.forEach((step) => {
				step.id === id ? step.classList.add('is-current') : step.classList.remove('is-current');
			});
		}

		this.updatePrevButtonState();
	}

	navigateToPrevStep() {
		if (this.navigation.length > 1) {
			this.navigation.pop();
			this.navigateToStep(this.navigation.at(-1));
		}
	}

	navigateToNextStep() {
		const currentStep = this.steps.find((step) => step.classList.contains('is-current'));
		if (currentStep) {
			const selectedVariant = currentStep.querySelector('.js-quiz-variant.is-selected');
			const input = selectedVariant?.querySelector('input');

			if (input && !input.value.trim()) {
				alert('Введите свой вариант');
				return;
			}

			const nextStepId = selectedVariant?.dataset?.nextStep;
			if (nextStepId) {
				this.navigation.push(nextStepId);
				this.navigateToStep(nextStepId);
			}
		}
	}

	handleVariantClick(variantElement) {
		const currentStep = this.steps.find((step) => step.classList.contains('is-current'));
		if (currentStep) {
			// Снимаем класс с других вариантов
			currentStep.querySelectorAll('.js-quiz-variant').forEach((variant) => {
				variant.classList.remove('is-selected');
			});

			// Добавляем класс выбранному варианту
			variantElement.classList.add('is-selected');

			const input = variantElement.querySelector('input');
			// Проверяем наличие значения в input
			if (input && !input.value.trim()) {
				return; // Если нет значения, не переходим к следующему шагу
			}

			const nextStepId = variantElement.dataset?.nextStep;
			if (nextStepId) {
				this.navigation.push(nextStepId);
				this.navigateToStep(nextStepId);
			}
		}
	}

	markInitialSelectedVariants() {
		this.steps.forEach((step) => {
			const firstVariant = step.querySelector('.js-quiz-variant');
			if (firstVariant) {
				firstVariant.classList.add('is-selected');
			}
		});
	}

	addEventListeners() {
		this.prevButton?.addEventListener('click', () => this.navigateToPrevStep());
		this.nextButton?.addEventListener('click', () => this.navigateToNextStep());

		this.buttonVariants.forEach((buttonVariant) => {
			buttonVariant.addEventListener('click', () => {
				this.handleVariantClick(buttonVariant);
			});
		});

		this.customVariants.forEach((customVariant) => {
			const input = customVariant.querySelector('input');

			// Обработка клика на label, чтобы отметить его как is-selected
			customVariant.addEventListener('click', (e) => {
				if (e.target.nodeName === 'INPUT') return; // Если кликнули по input, не меняем состояние
				this.handleVariantClick(customVariant);
			});

			// Обработка нажатия Enter в input
			input?.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					const nextStepId = customVariant.dataset?.nextStep;
					if (input.value && nextStepId) {
						this.handleVariantClick(customVariant);
					} else {
						alert('Введите свой вариант');
					}
				}
			});
		});
	}

	initializeQuiz() {
		this.toggleDisplay(this.result, false);
		const firstStepId = this.steps?.[0]?.id;
		if (firstStepId) {
			this.navigation.push(firstStepId);
			this.navigateToStep(firstStepId);
		}
		this.updatePrevButtonState();
	}
}
