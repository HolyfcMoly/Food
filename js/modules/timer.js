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

export default timer