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
		const queryAll = (className) => [...this.element.querySelectorAll(className)];

		this.steps = queryAll('.js-quiz-step');
		this.buttonVariants = queryAll('button.js-quiz-variant');
		this.customVariants = queryAll('label.js-quiz-variant');
		this.navigation = [];
		this.stepRatios = [];
		this.result = this.element.querySelector('.js-quiz-result');
		this.resultValue = this.element.querySelector('.js-quiz-result-value');
		this.questions = this.element.querySelector('.js-quiz-questions');
		this.prevButton = this.element.querySelector('.js-quiz-prev-button');
		this.nextButton = this.element.querySelector('.js-quiz-next-button');
		this.counterCount = this.element.querySelector('.js-quiz-counter-count');
	}

	toggleDisplay(element, shouldShow) {
		element.style.display = shouldShow ? '' : 'none';
	}

	updateResultValue() {
		if (!this.resultValue) return;

		const result = this.stepRatios.every((ratio) => !isNaN(Number(ratio)))
			? this.stepRatios.reduce((acc, ratio) => acc * ratio, 1)
			: null;

		this.resultValue.textContent = result
			? `${Number.parseFloat(result).toFixed(2)} ₽`
			: 'Не удалось определить сумму...';
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
				step.classList.toggle('is-current', step.id === id);
			});
		}

		this.counterCount.textContent = this.navigation.length;
		this.updateResultValue();
		this.updatePrevButtonState();
	}

	navigateToPrevStep() {
		this.stepRatios.pop();

		if (this.navigation.length > 1) {
			this.navigation.pop();
			this.navigateToStep(this.navigation.at(-1));
		}
	}

	navigateToNextStep() {
		const currentStep = this.steps.find((step) => step.classList.contains('is-current'));
		if (!currentStep) return;

		const selectedVariant = currentStep.querySelector('.js-quiz-variant.is-selected');
		const input = selectedVariant?.querySelector('input');

		if (input && !input.value.trim()) {
			alert('Введите свой вариант');
			return;
		}

		const ratio = selectedVariant?.dataset?.stepRatio;
		if (ratio) {
			this.stepRatios.push(ratio);
		}

		const nextStepId = selectedVariant?.dataset?.nextStep;
		if (nextStepId) {
			this.navigation.push(nextStepId);
			this.navigateToStep(nextStepId);
		}
	}

	handleVariantClick(variantElement) {
		const currentStep = this.steps.find((step) => step.classList.contains('is-current'));
		if (!currentStep) return;

		currentStep.querySelectorAll('.js-quiz-variant').forEach((variant) => {
			variant.classList.remove('is-selected');
		});

		variantElement.classList.add('is-selected');

		const input = variantElement.querySelector('input');
		if (input && !input.value.trim()) return;

		const formInput = variantElement?.dataset?.formInput;
		const formInputValue = variantElement.querySelector('.js-quiz-form-input-value');
		if (formInput && formInputValue) {
			const value = formInputValue.tagName === 'INPUT' ? formInputValue.value : formInputValue.textContent;

			this.result.querySelector(`input#${formInput}`).value = value;
		}

		const ratio = variantElement?.dataset?.stepRatio;
		if (ratio) {
			this.stepRatios.push(ratio);
		}

		const nextStepId = variantElement.dataset?.nextStep;
		if (nextStepId) {
			this.navigation.push(nextStepId);
			this.navigateToStep(nextStepId);
		}
	}

	markInitialSelectedVariants() {
		this.steps.forEach((step) => {
			step.querySelector('.js-quiz-variant')?.classList.add('is-selected');
		});
	}

	addEventListeners() {
		this.prevButton?.addEventListener('click', () => this.navigateToPrevStep());
		this.nextButton?.addEventListener('click', () => this.navigateToNextStep());

		this.buttonVariants.forEach((buttonVariant) => {
			buttonVariant.addEventListener('click', () => this.handleVariantClick(buttonVariant));
		});

		this.customVariants.forEach((customVariant) => {
			const input = customVariant.querySelector('input');

			customVariant.addEventListener('click', (e) => {
				if (e.target.nodeName === 'INPUT') return;
				this.handleVariantClick(customVariant);
			});

			input?.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					if (input.value) {
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
