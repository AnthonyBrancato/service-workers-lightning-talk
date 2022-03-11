// eslint-disable-next-line no-restricted-globals
self.addEventListener('installing', event => {
  console.log('installing…');
  event.waitUntil(
    caches.open('first-time').then(cache => cache.add('/logo.svg'))
  );
})

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', event => {
  console.log('first-time cache now ready to handle fetches!');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  console.log(`intercepting ${event.request.method} to ${event.request.url}`);
  console.log('reacting to the fetch event');

  event.respondWith(
    caches.open('react-to-fetch-event').then(function(cache) {

      console.log('WORKS');
      // return response from the event request if nothing in the cache then get it from the network, send it to the page and add it to the cache at the same time
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          // put the event request in the cache
          // clone() is used to create a copy of the response that can be read separately
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
})