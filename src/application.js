import Model from './model';
import {
  addHandlerForButton,
  addHandlerForArrowKeys,
  addHandlerForDots,
  addHandlerForInitialRender,
  render,
} from './view';

function nextSlide(model) {
  if (model.getSlideInView() >= model.getNumOfSlides() - 1) {
    model.setSlideInView(0);
  } else {
    const newSlideInView = model.getSlideInView() + 1;
    model.setSlideInView(newSlideInView);
  }
}

function prevSlide(model) {
  if (model.getSlideInView() === 0) {
    model.setSlideInView(model.getNumOfSlides() - 1);
  } else {
    const newSlideInView = model.getSlideInView() - 1;
    model.setSlideInView(newSlideInView);
  }
}

const handleOptions = {
  right: nextSlide,
  left: prevSlide,
};

function handleSlideWithBtn(model, direction) {
  handleOptions[direction](model);

  model.updateSlideDistances();

  render(model.getSlideData(), model.getSlideInView());
}

function handleSlideWithArrowKey(model, e) {
  e.preventDefault();

  const clickedKey = e.key;

  if (clickedKey !== 'ArrowRight' && clickedKey !== 'ArrowLeft') return;

  const regexp = /(right|left)/;

  const [direction] = clickedKey.toLowerCase().match(regexp);

  handleOptions[direction](model);

  model.updateSlideDistances();

  render(model.getSlideData(), model.getSlideInView());
}

function handleSlidesWithDots(model, e) {
  const clickedDot = e.target;

  if (!clickedDot.matches('.dots__dot')) return;

  const slideNum = clickedDot.dataset.position;

  model.setSlideInView(slideNum);
  model.updateSlideDistances();

  render(model.getSlideData(), model.getSlideInView());
}

function handleInitialRender(model, initialRender) {
  render(model.getSlideData(), model.getSlideInView(), initialRender);
}

export default function slider(initialSlide) {
  const model = new Model(initialSlide);

  addHandlerForInitialRender(model, handleInitialRender);

  addHandlerForButton('right', model, handleSlideWithBtn);
  addHandlerForButton('left', model, handleSlideWithBtn);
  addHandlerForArrowKeys(model, handleSlideWithArrowKey);
  addHandlerForDots(model, handleSlidesWithDots);

  render(model.getSlideData(), model.getSlideInView());
}
