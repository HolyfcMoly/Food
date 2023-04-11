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
export default tabs