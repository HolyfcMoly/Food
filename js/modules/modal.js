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

export default modal
export {closeModal}
export {openModal}