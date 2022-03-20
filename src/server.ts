import database from './config/database'
import app from './index'

class Server {
    constructor() {
        this.database()
    }

    database(): void {
        database.init().then(() => {

        })
    }

    start(): void {
        app.listen(app.get('port'), () => {
            console.log(`BACK is running on ${app.get('port')} in mode ${process.env.NODE_ENV}`)
        })
    }

}

const server = new Server()

server.start()