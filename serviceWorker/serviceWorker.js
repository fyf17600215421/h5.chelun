self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("index-list")
        .then(cache => {
            console.log("open cache");
            return cache.addAll([
                "../static/loading.jpg"
            ])
        })

    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {
            if (res) {
                return res;
            } else {
                alert("请求当前数据")
            }
        })
    )
})