import tabs from './modules/tabs'
import modal from './modules/modal'
import timer from './modules/timer'
import calc from './modules/calc'
import cards from './modules/cards'
import forms from './modules/forms'
import slider from './modules/slider'
import { openModal } from './modules/modal'
document.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000)

  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active")
  modal("[data-modal]", ".modal", modalTimerId)
  timer()
  calc()
  cards()
  forms('form', modalTimerId)
  slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    totalCount: '#total',
    currentCount: '#current',
    slideWrapper: '.offer__slider-wrapper',
    slideField: '.offer__slider-inner',
    slide: '.offer__slide'
  })
});