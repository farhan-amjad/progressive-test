const webPush = require('web-push')

webPush.setVapidDetails(
    `mailto:${process.env.WEB_PUSH_EMAIL}`,
    process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    process.env.WEB_PUSH_PRIVATE_KEY
)

const params = {
    title: 'Test title',
    message: 'Test message',
    //  icon: '/icon/noti.png',
    //  badge:"/icon/badge.png",
    tag: 'message-tag'
}
export default (req, res) => {
    if (req.method == 'POST') {
        const { subscription } = req.body
        console.log("subscription:", subscription)
        webPush
            .sendNotification(subscription, JSON.stringify(params))
            .then(response => {
                res.writeHead(response.statusCode, response.headers).end(response.body)
            })
            .catch(err => {
                if ('statusCode' in err) {
                    res.writeHead(err.statusCode, err.headers).end(err.body)
                } else {
                    console.error(err)
                    res.statusCode = 500
                    res.end()
                }
            })
    } else {
        res.statusCode = 405
        res.end()
    }
}
