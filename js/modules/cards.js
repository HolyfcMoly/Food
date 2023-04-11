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
    // const getResources = async (url) => {
    //   const res = await fetch(url);
        
    //   if(!res.ok) {
    //     throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    //   }

    //   return await res.json()
    // }

    // getResources('http://localhost:3000/menu')
    // .then(data => {
    //   data.forEach(({img, altimg, title, descr, price}) => {
    //     new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
    //   })
    // })
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // -------------------------------------------------------------------------------------------
                        // src, alt, title, descr, price, parentSelector, ...classes
    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy", 
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        15,
        '.menu .container',    // то самое место куда мы кладем карточку
    ).render()

    new MenuCard(
        "img/tabs/elite.jpg", 
        "elite", 
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        20,
        '.menu .container',
    ).render()

    new MenuCard(
        "img/tabs/post.jpg", 
        "post", 
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        13,
        '.menu .container',
    ).render()
    // -------------------------------------------------------------------------------------------
}

export default cards