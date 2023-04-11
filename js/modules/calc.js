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

export default calculator