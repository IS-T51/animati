var GHPATH = '';
var APP_PREFIX = 'animati_';

// The version of the cache. 
// Every time you change any file you need to change this version. 
var VERSION = 'v0_2_0';

// The files to make available for offline use. make sure to add 
// others to this list
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/index.html`,

  `${GHPATH}/assets/bootstrap/css/bootstrap.min.css`,
  `${GHPATH}/assets/bootstrap/js/bootstrap.min.js`,

  `${GHPATH}/assets/css/markdown-editor.min.css`,
  `${GHPATH}/assets/css/style.css`,

  `${GHPATH}/assets/js/jquery-3.6.1.min.js`,
  `${GHPATH}/assets/js/purify.min.js`,
  `${GHPATH}/assets/js/markdown-it.min.js`,
  `${GHPATH}/assets/js/markdown-editor.min.js`,
  `${GHPATH}/assets/js/script.js`,

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
  `${GHPATH}/assets/img/logo512.png`,

  `${GHPATH}/attività/`,
  `${GHPATH}/attività/index.html`,
  `${GHPATH}/attività/script.js`,
  `${GHPATH}/attività/style.css`,

  `${GHPATH}/attività/crea/`,
  `${GHPATH}/attività/crea/index.html`,
  `${GHPATH}/attività/crea/script.js`,
  `${GHPATH}/attività/crea/style.css`,

  `${GHPATH}/attività/modifica/`,
  `${GHPATH}/attività/modifica/index.html`,
  `${GHPATH}/attività/modifica/script.js`,
  `${GHPATH}/attività/modifica/style.css`,

  /*`${GHPATH}/google/`,
  `${GHPATH}/google/index.html`,
  `${GHPATH}/google/script.js`,
  `${GHPATH}/google/style.css`,*/

  `${GHPATH}/catalogo/`,
  `${GHPATH}/catalogo/index.html`,
  `${GHPATH}/catalogo/script.js`,
  `${GHPATH}/catalogo/style.css`,

  `${GHPATH}/lista/`,
  `${GHPATH}/lista/index.html`,
  `${GHPATH}/lista/script.js`,
  `${GHPATH}/lista/style.css`,

  `${GHPATH}/lista/esporta/`,
  `${GHPATH}/lista/esporta/index.html`,
  `${GHPATH}/lista/esporta/script.js`,
  `${GHPATH}/lista/esporta/style.css`,

  `${GHPATH}/liste/`,
  `${GHPATH}/liste/index.html`,
  `${GHPATH}/liste/script.js`,
  `${GHPATH}/liste/style.css`,

  /*`${GHPATH}/login/`,
  `${GHPATH}/login/index.html`,
  `${GHPATH}/login/script.js`,
  `${GHPATH}/login/style.css`,*/

  `${GHPATH}/logout/`,
  `${GHPATH}/logout/index.html`,
  `${GHPATH}/logout/script.js`,
  `${GHPATH}/logout/style.css`,

  `${GHPATH}/profilo/`,
  `${GHPATH}/profilo/index.html`,
  `${GHPATH}/profilo/script.js`,
  `${GHPATH}/profilo/style.css`,

  `${GHPATH}/tools/`,
  `${GHPATH}/tools/index.html`,
  `${GHPATH}/tools/script.js`,
  `${GHPATH}/tools/style.css`,

  `${GHPATH}/tools/cronometro/`,
  `${GHPATH}/tools/cronometro/index.html`,
  `${GHPATH}/tools/cronometro/script.js`,
  `${GHPATH}/tools/cronometro/style.css`,

  `${GHPATH}/tools/dado/`,
  `${GHPATH}/tools/dado/index.html`,
  `${GHPATH}/tools/dado/script.js`,
  `${GHPATH}/tools/dado/style.css`,

  `${GHPATH}/tools/fischietto/`,
  `${GHPATH}/tools/fischietto/index.html`,
  `${GHPATH}/tools/fischietto/script.js`,
  `${GHPATH}/tools/fischietto/style.css`,

  `${GHPATH}/tools/segnapunti/`,
  `${GHPATH}/tools/segnapunti/index.html`,
  `${GHPATH}/tools/segnapunti/script.js`,
  `${GHPATH}/tools/segnapunti/style.css`,

  `${GHPATH}/tools/squadre/`,
  `${GHPATH}/tools/squadre/index.html`,
  `${GHPATH}/tools/squadre/script.js`,
  `${GHPATH}/tools/squadre/style.css`,

  `${GHPATH}/tools/timer/`,
  `${GHPATH}/tools/timer/index.html`,
  `${GHPATH}/tools/timer/script.js`,
  `${GHPATH}/tools/timer/style.css`,

  `${GHPATH}/utenti/`,
  `${GHPATH}/utenti/index.html`,
  `${GHPATH}/utenti/script.js`,
  `${GHPATH}/utenti/style.css`
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
      return Promise.all(URLS.map(function (urlToPrefetch) {
        return cache.add(urlToPrefetch)
        .then(function (response) {
          if (response) {
            console.log('Cached response for : ' + urlToPrefetch);
          }
        }).catch(function (error) {
          console.log('Failed to cache : ' + urlToPrefetch);
          console.log(error);
        })
      }))
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
          console.log('Deleting cache : ' + keyList[i]);
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})