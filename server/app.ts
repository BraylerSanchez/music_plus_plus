import * as express from 'express'
import { json } from 'body-parser'
import { join } from 'path'

declare var process:any

class AppServer{
    public app: any

    constructor(){
        this.app = express()
        this.config()
        this.services()
    }
    
    config(){
        this.app.use(json());
        this.app.use(json({ type: 'application/vnd.api+json' }))
        this.app.use( express.static( join( __dirname, '../public' ) ) )
    }
    
    services(){
        this.app.get('/', function(req, res){
           res.sendFile(__dirname + '../pulic/index.html')
        });
    }

    run(){
        return this.app.listen( process.env.PORT || 8080, () =>{
           console.log("Server running in port: " + (process.env.PORT || 8080))
        });
    }

    public static bootstrap(){
        return new AppServer().run()
    }
}

export const app = AppServer.bootstrap()