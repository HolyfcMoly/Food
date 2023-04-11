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

export {postData}