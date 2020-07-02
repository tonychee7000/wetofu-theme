const cacheName = "wetofu.top"
const fileList = [
    "/webfonts/",
    "/webfonts/fa-solid-900.ttf",
    "/webfonts/fa-regular-400.svg",
    "/webfonts/fa-regular-400.woff2",
    "/webfonts/fa-solid-900.eot",
    "/webfonts/fa-brands-400.svg",
    "/webfonts/fa-regular-400.woff",
    "/webfonts/fa-brands-400.eot",
    "/webfonts/fa-solid-900.svg",
    "/webfonts/fa-solid-900.woff",
    "/webfonts/fa-regular-400.ttf",
    "/webfonts/fa-solid-900.woff2",
    "/webfonts/fa-brands-400.woff2",
    "/webfonts/fa-brands-400.woff",
    "/webfonts/fa-brands-400.ttf",
    "/webfonts/fa-regular-400.eot",
    "/css/",
    "/css/main.min.css",
    "/js/",
    "/js/main.min.js"
]
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            return cache.addAll(fileList);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (response) {
        // caches.match() always resolves
        // but in case of success response will have value
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request, {
                mode: 'no-cors'
            }).then(function (response) {
                let responseClone = response.clone();

                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch(function () {
                return caches.match('/sw-test/gallery/myLittleVader.jpg');
            });
        }
    }));
});