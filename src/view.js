export function render(slideData, slideInView) {
  const slides = document.querySelectorAll('.slide');
  const newActiveSlideEl = document.querySelector(
    `[data-position="${slideInView}"]`
  );
  const prevActiveSlideEl = document.querySelector('.dots__dot--active');

  slides.forEach((slide, i) => {
    const { distanceFromView } = slideData.find(({ number }) => number === i);

    slide.style.transform = `translateX(${distanceFromView})`;
  });

  prevActiveSlideEl.classList.remove('dots__dot--active');
  newActiveSlideEl.classList.add('dots__dot--active');
}

export function addHandlerForButton(direction, model, handler) {
  const handlerOptions = {
    right: () => {
      const rightBtnEl = document.querySelector('.slider__btn--right');
      rightBtnEl.addEventListener(
        'click',
        handler.bind(null, model, direction)
      );
    },
    left: () => {
      const leftBtnEl = document.querySelector('.slider__btn--left');
      leftBtnEl.addEventListener('click', handler.bind(null, model, direction));
    },
  };

  handlerOptions[direction]();
}

export function addHandlerForArrowKeys(model, handler) {
  const boundHandler = handler.bind(null, model);

  function controlSlidesWithKeysWhenVisible(observedElements) {
    observedElements.forEach(observedElement => {
      if (observedElement.isIntersecting) {
        document.addEventListener('keydown', boundHandler);
      } else {
        document.removeEventListener('keydown', boundHandler);
      }
    });
  }

  const sliderEl = document.querySelector('.slider');

  const sliderObserver = new IntersectionObserver(
    controlSlidesWithKeysWhenVisible,
    {
      root: null,
      threshold: 0.7,
    }
  );

  sliderObserver.observe(sliderEl);
}

export function addHandlerForDots(model, handler) {
  const dotContainerEl = document.querySelector('.dots');
  const slides = model.getSlideData();

  slides.forEach((slide, i) => {
    const dot = document.createElement('button');
    dot.classList.add('dots__dot');
    dot.setAttribute('data-position', `${i}`);
    
    if (slide.number === model.getSlideInView()) {
      dot.classList.add('dots__dot--active');
    }

    dotContainerEl.append(dot);
  });

  dotContainerEl.addEventListener('click', handler.bind(null, model));
}
