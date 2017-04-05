import * as express from 'express'
import { Request, Response, Server } from 'express'
var json = require('body-parser').json
var join = require('path').join
var config = require('config')
var mongoose = require('mongoose')

import { PlaylistRoutes } from './routes/playlist/playlist.routes'
import { ConvertRoutes } from './routes/youtube/convert.routes'
import { SearchRoutes } from './routes/youtube/search.routes'

declare var process:any

class AppServer{
    public app:Server

    constructor(){
        this.app = express()
        this.config()
        this.services()
    }
    
    config(){
        let path:string = process.cwd()
        this.app.use(json());
        this.app.use(json({ type: 'application/vnd.api+json' }))
        this.app.use( express.static( join( path ) ) )
        this.app.use( express.static( join( path, '/public' ) ) )
        this.app.use( express.static( join( path, '/dist' ) ) )
        this.app.use( express.static( join( path, '/node_modules' ) ) )
        
        var dbConfig = config.get("dbConfig");
        mongoose.connect( `mongodb://${dbConfig['host']}:${dbConfig['port']}/${dbConfig['dbName']}` )
    }
    
    services(){
        new PlaylistRoutes(this.app);
        new ConvertRoutes(this.app);
        new SearchRoutes(this.app);
        this.app.get('/', function(req:Request, res:Response){
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