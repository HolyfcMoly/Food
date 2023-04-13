/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    // Calculator
    // получаем элемент для записи результата
    const result = document.querySelector('.calculating__result span')
    // получаем все значения для калькуляции
    let sex, ratio, height, weight, age
    // проверяем, получаем значение из хранилища и назначаем переменной
    if(localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex')
    } else { // если не установленно, то устанавливаем по умолчанию и записываем в хранилище
    sex = 'female'
    localStorage.setItem('sex', 'female')
    }
    // тоже самое
    if(localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }
    // FN которая проверяет есть ли значения в хранилище и запоминает данные на активном классе
    function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector)
    // перебираем элементы
    elements.forEach(e => {
        // удаляем класс активности
        e.classList.remove(activeClass)
        //получаем атрибут и сравниваем если он равен полученному из хранилища id то добавляем класс активности
        if(e.getAttribute('id') === localStorage.getItem('sex')) {
        e.classList.add(activeClass)
        }
        if(e.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        e.classList.add(activeClass)
        }
        calcTotal() // вызываем FN расчетов т.к тут происходит расчет и меняются значения которые записаны в хранилище
    })
    }
    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcTotal() {
    // проверка, если НЕ установленно хоть 1 одно значение то вывод будет пуст
    if(!sex || !height || !weight || !age || !ratio) {
        result.textContent = '____'
        return
    }
    // расчет если выбран женский пол
    if(sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
    } else { //иначе расчет для мужского пола 
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
    }
    }
    calcTotal() // вызываем FN 
    // FN для назначения класса активности в разных блоках
    function getStaticInfo(selector, activeClass) {
    // получаем элементы
    const elements = document.querySelectorAll(selector)
    // перебираем все элементы и вешаем обработчик клика
    elements.forEach(el => {
        el.addEventListener('click', (e) => {
        // проверяем что если клик был по атрибуту с data-ratio то клик происходит на элементах с атрибутом
        if(e.target.getAttribute('data-ratio')) {
            ratio = +e.target.getAttribute('data-ratio')
            // записываем данные в хранилище, рацион
            localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'))
        } else {// иначе клик происходит на элементах в переменной sex с id
            sex = e.target.getAttribute('id')
            // записываем данные в хранилище, пол
            localStorage.setItem('sex', e.target.getAttribute('id'))
        }
        // проверяем клики в консоли
        console.log(ratio,sex)
        //перебираем элементы и каждому удаляем класс активности
        elements.forEach(el => {
            el.classList.remove(activeClass)
        })
        // назначаем класс активности на 'кликнутый' элемент
        e.target.classList.add(activeClass)
        calcTotal() // вызываем FN расчетов
        })
    })
    }
    // вызываем FN для блоков с передачей элементов в родителях и назначаемого класса активности
    getStaticInfo('#gender div', 'calculating__choose-item_active')
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active')
    // FN для записи данных с инпутов
    function getDynamicInfo(selector) {
    // назначаем переменную и передаем в нее определенный элемент со стр
    const input = document.querySelector(selector)
    // вешаем на инпут обработчик
    input.addEventListener('input', () => {
        // делаем проверку на то что в инпутах введены только цифры, если нет то меняем бордер
        if(input.value.match(/\D/g)) {
        input.style.border = '1px solid red'
        } else { // иначе убираем его
        input.style.border = 'none'
        }
        // сравниваем инпут с инструкцией и записываем значение которое было передано
        switch(input.getAttribute('id')) {
        case 'height': height = +input.value 
        break // выходим из инструкции после найденного и назначенного значения
        case 'weight': weight = +input.value 
        break
        case 'age': age = +input.value
        break
        }
        calcTotal() // вызываем FN расчетов
    })
    }
    // calcTotal() вызывается каждый раз когда происходит изменение на стр(какого либо параметра для расчетов)
    // вызываем FN для инпутов с разными параметрами
    getDynamicInfo('#height')
    getDynamicInfo('#weight')
    getDynamicInfo('#age')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {
    // использование классов для карточек 
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
        this.src = src
        this.alt = alt
        this.title = title
        this.descr = descr
        this.price = price
        this.classes = classes
        this.parent = document.querySelector(parentSelector)
        this.transfer = 75
        this.changeToRub()
        }
        // функция для конвертации валюты с $ в Руб
        changeToRub() {
        this.price = this.price * this.transfer
        }
        // функция для создания карточки 
        render() {
        const elem = document.createElement('div') // создание контейнера 
        // проверяем что если (т.к classes это массив) длина его 0 то мы добавляем этому элементу строку(класс)
        if(this.classes.length === 0) {
            this.elem = 'menu__item'        // по умолчанию этот элемент содержит строку 'menu__item'
            elem.classList.add(this.elem)
        } else {                        // иначе, проходим по массиву(this.classes) и добавляем этот класс к elem('div')
            this.classes.forEach(className => elem.classList.add(className))
        }
        /**
         * если понадобиться добавить еще классы к div то на строчке this.elem = 'menu__item' нужно через пробел прописать классы которые хотим добавить
         * после в блоке else обратится к this.classes.push() и прописать эти классы в строчку через , ('black', 'third') и т.д
         */
        // помещение контента карточки в верстку
        
        elem.innerHTML = `                        
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> руб/день</div>`
        this.parent.append(elem) // DOM элемент в который мы помещаем наш элемент(карточку)
        }
    }
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResources)('http://localhost:3000/menu')
        .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
        })
    })
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // -------------------------------------------------------------------------------------------
                        // src, alt, title, descr, price, parentSelector, ...classes
    // new MenuCard(
    //     "img/tabs/vegy.jpg", 
    //     "vegy", 
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
    //     15,
    //     '.menu .container',    // то самое место куда мы кладем карточку
    // ).render()

    // new MenuCard(
    //     "img/tabs/elite.jpg", 
    //     "elite", 
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
    //     20,
    //     '.menu .container',
    // ).render()

    // new MenuCard(
    //     "img/tabs/post.jpg", 
    //     "post", 
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
    //     13,
    //     '.menu .container',
    // ).render()
    // -------------------------------------------------------------------------------------------
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");
 // импортируем 2 FN
 

function form(formSelector, modalTimerId) {
    // Forms 
    const forms = document.querySelectorAll(formSelector)

    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failed: 'Что то пошло не так...'
    }
    // -------------------------------------------------------------------------------------------
    // forms.forEach(i => {
    //     postData(i)
    // })
    // -------------------------------------------------------------------------------------------
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    forms.forEach(i => {
        bindPostData(i) 
    })

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //function bindPostData  при расскоментировании(++++++++) сменить название FN при (--------) postData
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
        e.preventDefault()

        let statusMessage = document.createElement('img')
        statusMessage.src = message.loading
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
        `;
        form.insertAdjacentElement('afterend', statusMessage)
        // --------------------ЧЕРЕЗ XML--------------
    // -------------------------------------------------------------------------------------------
        // const request = new XMLHttpRequest()
        // request.open('POST', 'server.php')
        // // когда используется связка XMLHttpRequest и FormData заголовок устанавливать не нужно, он устанавливается автоматически
        // // иначе будет ошибка
        // // request.setRequestHeader('Content-type', 'multipart/form-data')
        // request.setRequestHeader('Content-type', 'application/json')  // если сервер принимает данные в json
        // const formData = new FormData(form)
        // // для json данных
        // const object = {}             
        // formData.forEach(function(value, key) {
        //     object[key] = value
        // })
        // // переводим объект в json формат
        // const json = JSON.stringify(object)
        
        // request.send(json)
        // // request.send(formData)

        // request.addEventListener('load', () => {
        //     if(request.status === 200) {
        //     // console.log(request.response)
        //     // statusMessage.textContent = message.success;
        //     // form.reset()  // после отправки формы, очищаем инпуты
        //     // setTimeout(() => {        
        //     //   statusMessage.remove()    // через 2 секунды удаляем сообщение об удачной отправке
        //     // }, 2000)
        //     console.log(request.response)
        //     showThanks(message.success);
        //     statusMessage.remove()    
        //     form.reset()  // после отправки формы, очищаем инпуты
        //     } else {
        //     showThanks(message.failed);
        //     }
        // })
    // -------------------------------------------------------------------------------------------

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        const formData = new FormData(form)
        const json = JSON.stringify(Object.fromEntries(formData.entries()))
        ;(0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
        .then((data) => {
            console.log(data)
            showThanks(message.success);
            statusMessage.remove()    
        })
        .catch(() => {
            showThanks(message.failed);
        })
        .finally(() => {
          form.reset()  // после отправки формы, очищаем инпуты
        })
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        })
    }

    function showThanks(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')
        
        prevModalDialog.classList.remove('show')
        prevModalDialog.classList.add('hide')
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId)

        const thanksModal = document.createElement('div')
        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
        <div class ="modal__content">
        <div class ="modal__close" data-close>×</div>
        <div class ="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal)
        setTimeout(() => {
        thanksModal.remove()
        prevModalDialog.classList.add('show')
        prevModalDialog.classList.remove('hide')
        ;(0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal')
        },4000)
    }
    // чтобы не было ошибки, надо запускать сервер(передаем в fetch адрес сервера) и json-server db.json(подключаем к базе данных)
    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        // .then(res => console.log(res))

        //для того чтобы все работало нужно: скачать проект с github, скинуть все на сервер, в терминале прописать (npm i),
        //расскоментировать блоки с (+++++++) и закоментировать блоки с (----------), 
        //в терминале прописать команду json-server (db.json) прописать свою базу
        //вместо (http://localhost:3000/menu, http://localhost:3000/requests) 
        //прописать свой url
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
    console.log(modalTimerId)
    if(modalTimerId) { // при условии что этот id был передан или вообще существует, то только тогда это FN будет запускаться
        clearInterval(modalTimerId) //если пользователь открыл триггер модалки то заново модалка по таймауту не откроется
    }
}   

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove("show");
    modal.classList.add("hide");
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    ////  Modal
    const modalTriger = document.querySelectorAll(triggerSelector);
    // const modalClose = document.querySelector("[data-close]");
    const modal = document.querySelector(modalSelector);
    //если делать через toggle то modal.classList.toggle('show')
    // в верстке добавить класс show => modal

    // работать такое будет только с таким навешиванием обработчика, т.е надо использовать функцию
    modalTriger.forEach((btns) => {
        btns.addEventListener("click", () => openModal(modalSelector, modalTimerId));
    });

    // здесь клик вешается на окно, но сам контент с текстом и формой это не окно, и если кликать по контенту то ничего закрываться не будет
    modal.addEventListener("click", (e) => {
        // вешаем обработчик на окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
        // проверка на то что клик был совершен именно в окне
        closeModal(modalSelector); // закрываем окно
        }
    });

    document.addEventListener("keydown", (e) => {
        // при нажатии на esc закрывать модальное окно
        if (e.code == "Escape" && modal.classList.contains("show")) {
        // проверяем на то что был нажат esc и окно открыто
        closeModal(modalSelector); // вызываем функцию закрытия
        }
    });

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
        openModal(modalSelector, modalTimerId)
        window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
    // SLIDER 

    // создание класса для картинок слайдера
    class slideImg {
        constructor(src, alt, parent, ...classes) {
        this.src = src  // img
        this.alt = alt  // alt
        this.classes = classes  // классы это массив и он пустой
        this.parent = document.querySelector(parent)
        }
        // создаем метод класса
        renderSlide() {
        // добавляем новый элемент div
        const element = document.createElement('div')
        // проверяем классы и если их 0 то создаем новый и добавляем к элементу
        if(this.classes.length === 0) {
            this.element = 'offer__slide'
            element.classList.add(this.element)
        } else { // иначе проходим перебором и если уже есть класс мы еще добавляем тот который хотим 
            this.classes.forEach(className => element.classList.add(className))
        }
        // формируем верстку которую после апендим в родителя
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        `
        this.parent.append(element)
        }
    }
    // проходим циклом для создания экземпляров
    for(let i = 4; i < 12; i++) {
        new slideImg(
        "img/slider/pepper.jpg",
        "pepper",                            
        '.offer__slider .offer__slider-wrapper .offer__slider-inner'   // родитель в которого мы добавляем новый экземпляр
        ).renderSlide()
    }

    const slides = document.querySelectorAll('.offer__slide')
    const slider = document.querySelector('.offer__slider')
    const prev = document.querySelector('.offer__slider-prev')
    const next = document.querySelector('.offer__slider-next')
    const total = document.querySelector('#total')
    const current = document.querySelector('#current')
    const wrapper = document.querySelector('.offer__slider-wrapper')
    const field = document.querySelector('.offer__slider-inner')
    const width = window.getComputedStyle(wrapper).width      // получаем ширину обертки
    // определяем начальный индекс слайдера
    let slideIndex = 1
    let offset = 0    // смещение слайдов
    // проверяем что если длина слайдов меньше 10 то мы к total добавляем 0
    if(slides.length < 10) {
        total.textContent = `0${slides.length}`
    } else {// иначе показываем просто общ значение
        total.textContent = slides.length
    }
    // FN в которой проверяем что если индекс слайда меньше 10 то добавляем '0' к индексу слайда. иначе показываем номер тек слайда
    function currentIndx() {
        current.textContent = slideIndex < 10 ? `0${slideIndex}` : slideIndex
        // if(slideIndex < 10) {
        // current.textContent = `0${slideIndex}`
        // } else {
        //   current.textContent = slideIndex
        // }
    }
    currentIndx()

    function delDot(str) {
        return str.replace(/\D/g, '')
    }
    
    // устанавливаем ширину слайдов
    field.style.width = 100 * slides.length + '%';
    field.style.display = 'flex';
    field.style.transition = '0.5s all';
    // скрываем все что за оберткой
    wrapper.style.overflow = 'hidden'
    //устанавливаем каждому слайду одинаковую ширину
    slides.forEach(slide => {
        slide.style.width = width
    })
    // назначаем слайдеру позицию relative
    slider.style.position = 'relative';
    //создаем список для пагинации
    const indicators = document.createElement('ul')
    const dots = [] // создаем пустой массив
    //добавляем класс списку
    indicators.classList.add('carousel-indicators')
    // добавляем в блок слайдера новый блок(список)
    slider.append(indicators)
    // проходим циклом, и пока i будет меньше массива слайдов(всех слайдов) i будет увеличиваться на 1
    for (let i = 0; i < slides.length; i++) {
        // создаем точки 
        const dot = document.createElement('li')
        //устанавливаем точкам атрибут и нумерацию начиная с 1(т.е 1 слайд это 1 точка, и т.д)
        dot.setAttribute('data-slide-to', i + 1)
        //добавляем точкам класс
        dot.classList.add('dot')
        // проверяем, если первая итерация то 1ой точке мы даем opacity 1
        if(i == 0) {
        dot.style.opacity = 1
        }
        // добавляем точки в список
        indicators.append(dot)
        dots.push(dot)    // добавляем в массив точки
    }
    // FN в которой перебираем массив точек и назначаем всем opacity .5. 
    function dotsStyle() {
        dots.forEach(dot => dot.style.opacity = '.5')
        //dots с индексом равным индексу слайда назначаем opacity 1
        dots[slideIndex - 1].style.opacity = 1
    }


    next.addEventListener('click', () => {
        //трансформируем строку width в number, уменьшаем на 2 символа(вырезаем px),
        // и * на количество элементов массива slides, вычтенного из 1.
        if(offset == delDot(width) * (slides.length - 1)) {
        offset = 0  //ставим смещение на начало слайдов
        } else { // если не послд слайд то при клике на стрелочку добавляется ширина еще одного слайда и происходит смещение
        offset += +delDot(width)
        }
        // смещение по оси Х на ...px
        field.style.transform = `translateX(-${offset}px)`
        //если индекс слайда равен массиву слайдов(последнему слайду) то мы переходим на 1 слайд
        if(slideIndex == slides.length) {
        slideIndex = 1
        } else {// если нет то мы увеличиваем индекс слайда на 1
        slideIndex++
        }

        dotsStyle()
        currentIndx()
    })
    prev.addEventListener('click', () => {
        // тоже самое но если слайд является 1 то мы смещаемся на последний слайд
        if(offset === 0) {
        offset = delDot(width) * (slides.length - 1)
        } else { // тоже самое но смещение в другую сторону
        offset -= delDot(width)
        }

        field.style.transform = `translateX(-${offset}px)`
        // если индекс равен 1 слайду при клике на пред кнопку мы переходим на последний слайд
        if(slideIndex == 1) {
        slideIndex = slides.length
        } else {// иначе мы уменьшаем значение
        slideIndex--
        }

        dotsStyle()
        currentIndx()
    })
    //перебираем массив точек
    dots.forEach(dot => {
        // назначаем каждой обработчик клика
        dot.addEventListener('click', (e) => {
        // получаем значение атрибута на который был клик и присваиваем переменной
        const slideTo = e.target.getAttribute('data-slide-to')
        // присваиваем слайд индексу значение на котором был клик
        slideIndex = slideTo
        // вычисляем смещение поля со слайдами 
        offset = delDot(width) * (slideTo - 1)
        // перемещаем поля со слайдами в зависимости от значения offset
        field.style.transform = `translateX(-${offset}px)`
        //вызов fn для обновления текущего слайда
        currentIndx()
        //вызов fn для обновления стиля точек для текущего слайда
        dotsStyle()
        })
    })
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
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
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
    // timer
    const deadline = "2023-04-25";

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
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResources": () => (/* binding */ getResources),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
// FN настраивает наш запрос на сервер, получает ответ
const postData = async (url, data) => { // асинхронный код async и await работают только в паре
    const res = await fetch(url, {        // JS будет ждать выполнения результата из за await 
        method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: data
    })
  // трансформирует ответ в json. Объект мб большим и мы не знаем сколько понадобиться времени поэтому ставим await
return await res.json() 
}

const getResources = async (url) => {
  const res = await fetch(url);
      
  if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
  }

  return await res.json()
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");








document.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000)

  ;(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])()
  ;(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId)
  ;(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])()
  ;(0,_modules_calc__WEBPACK_IMPORTED_MODULE_3__["default"])()
  ;(0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])()
  ;(0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])('form', modalTimerId)
  ;(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])()
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map