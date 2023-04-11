import { closeModal, openModal } from "./modal" // импортируем 2 FN
import { postData } from "../services/services" 

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
        postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId)

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
        closeModal('.modal')
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

export default form