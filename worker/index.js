'use strict'

// self.addEventListener('push', function (event) {
//   const data = JSON.parse(event.data.text())
//   event.waitUntil(
//     registration.showNotification(data.title, {
//       body: data.message,
//       icon: '/icon/icon-192.png'
//     })
//   )
// })

self.addEventListener('push', function (event) {
  const data = event.data.json();
  let title = data.title
  let message = data.message

  const notify = self.registration.showNotification(title, {
    body: message,
    icon: '/icon/noti.png',
    badge:  "/icon/badge.png"
    
  })
  event.waitUntil(notify)
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
      if (clientList.length > 0) {
        let client = clientList[0]
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i]
          }
        }
        return client.focus()
      }
      return clients.openWindow('/')
    })
  )
})

// self.addEventListener('pushsubscriptionchange', function(event) {
//   event.waitUntil(
//       Promise.all([
//           Promise.resolve(event.oldSubscription ? deleteSubscription(event.oldSubscription) : true),
//           Promise.resolve(event.newSubscription ? event.newSubscription : subscribePush(registration))
//               .then(function(sub) { return saveSubscription(sub) })
//       ])
//   )
// })
