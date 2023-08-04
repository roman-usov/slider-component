import { calculateDistanceFromCurrent } from './helpers';

export default class Model {
  constructor(initialSlide) {
    this.state = initializeStateFromDOM(initialSlide);
  }

  getSlideInView() {
    return this.state.slideInView;
  }

  getNumOfSlides() {
    return this.state.numOfSlides;
  }

  setSlideInView(value) {
    this.state.slideInView = value;
  }

  getSlideData() {
    return this.state.slideData;
  }

  getSlide(number) {
    return this.state.slideData.find(({ num }) => num === number) || null;
  }

  updateSlideDistances() {
    this.state.slideData.forEach((slide, i) => {
      slide.distanceFromView = calculateDistanceFromCurrent(
        this.getSlideInView(),
        i
      );
    });
  }
}

function initializeStateFromDOM(initialSlide) {
  const slideInView = initialSlide;
  const slideData = [];

  const numOfSlides = document.querySelectorAll('.slide').length;

  for (let i = 0; i <= numOfSlides - 1; i += 1) {
    const slide = {
      number: i,
      distanceFromView: calculateDistanceFromCurrent(slideInView, i),
    };

    slideData.push(slide);
  }

  return {
    slideInView,
    numOfSlides,
    slideData,
  };
}
