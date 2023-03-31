document.addEventListener("DOMContentLoaded", () => {
  // tabs
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    // скрываем контент
    tabsContent.forEach((item) => {
      item.classList.add("hide"); // добавляем класс hide всему контенту
      item.classList.remove("show", "fade"); // удаляем класс show
    });
    tabs.forEach((item) => {
      // удаляем у всех табов класс активности
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    //показываем контент. по умолчанию (i) это первый элемент
    tabsContent[i].classList.add("show", "fade"); // добавляем класс show. (i) это элемент которому добавляем
    tabsContent[i].classList.remove("hide"); // удаляем класс hide
    tabs[i].classList.add("tabheader__item_active"); // добавляем класс активности табам
  }
  hideTabContent(); // вызываем обе функции
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    // назначаем родителю табов вешаем обработчик (е) это объект события
    const target = e.target; // для сокращения

    if (target && target.classList.contains("tabheader__item")) {
      //проверяем что кликнули и клик был совершен в блоке родителя
      tabs.forEach((item, i) => {
        // перебираем все табы и передаем 2 аргумента
        if (target == item) {
          // item Это элемент, i это номер элемента по порядку
          hideTabContent(); // проверяем что клик произошел по элементу и вызываем сначала hide функция
          showTabContent(i); // после show с передачей в него номера по порядку по которому кликнули
        }
      });
    }
  });

  // timer

  const deadline = "2023-04-10";

  function getTimeRemaining(endtime) {
    /**
     * Date.parse(endtime) в этой части мы получаем конечное кол-во милсек от deadline(до которого надо досчитать)
     * после мы отнимаем кол-во милсек от нашей текущей даты
     */
    const t = Date.parse(endtime) - Date.parse(new Date());
    const days = Math.floor(t / (1000 * 60 * 60 * 24)); // делим милсек на кол-во милсек в 1 дне
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // в 1 часе, так же при помощи % мы получаем остаток от деления, получаем хвостик который не больше 24
    const minutes = Math.floor((t / 1000 / 60) % 60); // в 1 минуте
    const seconds = Math.floor((t / 1000) % 60); // в 1 секунде

    return {
      total: t,
      days,
      hours,
      minutes,
      seconds,
    };
  }
  // f которая проверяет число в таймере и если оно однозначное(4,5,8...) мы добавляем 0 иначе возвращаем число(12,15,20...)
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }
  // selector это главный элем на странице для таймера
  function setClock(selector, endtime) {
    // создаем переменные в которые будем помещать элементы со страницы
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000); // запускает updateClock каждую секунду

    updateClock(); // вызываем ее до чтобы при обновлении страницы не моргал таймер и не показывал стандартные данные в html

    // функция которая обновляет наш таймер
    function updateClock() {
      // расчет времени который остался на данную секунду, endtime это наш deadline который будет передаваться из setClock
      const t = getTimeRemaining(endtime); // в t находиться объект из этой функции
      // теперь записываем данные расчетов в элементы
      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);
      // проверяем что если таймер закончился и дошел до deadline то мы его останавливаем
      if (t.total <= 0) {
        clearInterval(timeInterval);
        // после остановки таймера/достижения deadline, таймер приобретает вид 00 чтобы не уходил в отрицание
        days.innerHTML = "00";
        hours.innerHTML = "00";
        minutes.innerHTML = "00";
        seconds.innerHTML = "00";
      }
    }
  }
  // запускаем функцию и передаем блок таймера и конечную точку
  setClock(".timer", deadline);

  ////  Modal

  const modalTriger = document.querySelectorAll("[data-modal]");
  const modalClose = document.querySelector("[data-close]");
  const modal = document.querySelector(".modal");
  //если делать через toggle то modal.classList.toggle('show')
  // в верстке добавить класс show => modal

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId) //если пользователь открыл триггер модалки то заново модалка по таймауту не откроется
  }   
  // работать такое будет только с таким навешиванием обработчика, т.е надо использовать функцию
  modalTriger.forEach((btns) => {
    btns.addEventListener("click", openModal);
  });

  // modalTriger.forEach((btns) => {
  //   // для того чтобы работало на каждой кнопке используем перебор а потом
  //   btns.addEventListener("click", () => {
  //     // на аргумент(объект события) вешаем обработчик и проводим действия
  //     modal.classList.add("show");
  //     modal.classList.remove("hide");
  //     document.body.style.overflow = "hidden";
  //     // либо просто вызвать функцию, но передать ее в качестве аргумента после 'click'
  //     // openModal()
  //   });
  // });
  // вынесли повторяющийся код в функцию чтобы не повторять себя
  function closeModal() {
    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeModal); // при нажатии на крестик окно закрывается

  // здесь клик вешается на окно, но сам контент с текстом и формой это не окно, и если кликать по контенту то ничего закрываться не будет
  modal.addEventListener("click", (e) => {
    // вешаем обработчик на окно
    if (e.target === modal) {
      // проверка на то что клик был совершен именно в окне
      closeModal(); // закрываем окно
    }
  });

  document.addEventListener("keydown", (e) => {
    // при нажатии на esc закрывать модальное окно
    if (e.code == "Escape" && modal.classList.contains("show")) {
      // проверяем на то что был нажат esc и окно открыто
      closeModal(); // вызываем функцию закрытия
    }
  });

  const modalTimerId = setTimeout(openModal, 5000)

  function showModalByScroll() {
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal()
      window.removeEventListener('scroll', showModalByScroll)
    }
  }

  window.addEventListener('scroll', showModalByScroll)

  // использование классов для карточек 

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector) {
      this.src = src
      this.alt = alt
      this.title = title
      this.descr = descr
      this.price = price
      this.parent = document.querySelector(parentSelector)
      this.transfer = 75
      this.changeToRub()
    }

    changeToRub() {
      this.price = this.price * this.transfer
    }

    render() {
      const elem = document.createElement('div')

      elem.innerHTML = `
      <div class="menu__item">
      <img src=${this.src} alt=${this.alt}>
      <h3 class="menu__item-subtitle">${this.title}</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
      </div>`
      this.parent.append(elem)

    }
  }

  new MenuCard(
    "img/tabs/elite.jpg", 
    "elite", 
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    20,
    '.menu .container'
  ).render()
});
