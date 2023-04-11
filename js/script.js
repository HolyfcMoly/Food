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

  tabs()
  modal("[data-modal]", ".modal", modalTimerId)
  timer()
  calc()
  cards()
  forms('form', modalTimerId)
  slider()
});