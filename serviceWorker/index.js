if (navigator.serviceWorker) {
    navigator.serviceWorker.register("./serviceWorker", { scope: "./" })
        .then(res => {
            console.log(res);
        })
        .catch(e => {
            console.log(e);
        })

} else {
    alert("当前游览器不支持serviceWorker")
}