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

    const slides = document.querySelectorAll(slide)
    const slider = document.querySelector(container)
    const prev = document.querySelector(prevArrow)
    const next = document.querySelector(nextArrow)
    const total = document.querySelector(totalCount)
    const current = document.querySelector(currentCount)
    const wrapper = document.querySelector(slideWrapper)
    const field = document.querySelector(slideField)
    const width = Math.floor(parseFloat(window.getComputedStyle(wrapper).width))      // получаем ширину обертки с плавающей точкой и округляем до целого
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
    }
    currentIndx()
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
        if(offset == width * (slides.length - 1)) {
        offset = 0  //ставим смещение на начало слайдов
        } else { // если не послд слайд то при клике на стрелочку добавляется ширина еще одного слайда и происходит смещение
        offset += width
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
        offset = width * (slides.length - 1)
        } else { // тоже самое но смещение в другую сторону
        offset -= width
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
        offset = width * (slideTo - 1)
        // перемещаем поля со слайдами в зависимости от значения offset
        field.style.transform = `translateX(-${offset}px)`
        //вызов fn для обновления текущего слайда
        currentIndx()
        //вызов fn для обновления стиля точек для текущего слайда
        dotsStyle()
        })
    })
}

export default slider