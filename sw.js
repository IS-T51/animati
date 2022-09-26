var GHPATH = '/animati';
var APP_PREFIX = 'animati_';
 
// The version of the cache. 
// Every time you change any file you need to change this version. 
var VERSION = 'v0_0_1';
 
// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,

  `${GHPATH}/assets/bootstrap/css/bootstrap.min.css`,
  `${GHPATH}/assets/bootstrap/js/bootstrap.min.js`,

  `${GHPATH}/assets/css/Footer-Basic.css`,
  `${GHPATH}/assets/css/Navigation-with-Button.css`,
  `${GHPATH}/assets/css/Projects-Clean.css`,
  `${GHPATH}/assets/css/styles.css`,

  `${GHPATH}/assets/fonts/fa-brands-400.eot`,
  `${GHPATH}/assets/fonts/fa-brands-400.svg`,
  `${GHPATH}/assets/fonts/fa-brands-400.ttf`,
  `${GHPATH}/assets/fonts/fa-brands-400.woff`,
  `${GHPATH}/assets/fonts/fa-brands-400.woff2`,
  `${GHPATH}/assets/fonts/fa-regular-400.eot`,
  `${GHPATH}/assets/fonts/fa-regular-400.svg`,
  `${GHPATH}/assets/fonts/fa-regular-400.ttf`,
  `${GHPATH}/assets/fonts/fa-regular-400.woff`,
  `${GHPATH}/assets/fonts/fa-regular-400.woff2`,
  `${GHPATH}/assets/fonts/fa-solid-900.eot`,
  `${GHPATH}/assets/fonts/fa-solid-900.svg`,
  `${GHPATH}/assets/fonts/fa-solid-900.ttf`,
  `${GHPATH}/assets/fonts/fa-solid-900.woff`,
  `${GHPATH}/assets/fonts/fa-solid-900.woff2`,
  `${GHPATH}/assets/fonts/fontawesome-all.min.css`,

  `${GHPATH}/assets/img/building.jpg`,
  `${GHPATH}/assets/img/desk.jpg`,
  `${GHPATH}/assets/img/loft.jpg`,
  `${GHPATH}/assets/img/minibus.jpeg`,

  `${GHPATH}/assets/img/logo.svg`,
  `${GHPATH}/assets/img/logo96.png`,
  `${GHPATH}/assets/img/logo512.png`
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})