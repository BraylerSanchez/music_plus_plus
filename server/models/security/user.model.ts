import * as mongoose from 'mongoose';
var defer = require('q').defer
import { UserSchema } from '../../schemas/security/user.schema';

export class UserModel{
    public userModelMG: any;
    
    constructor( ){
        this.userModelMG = mongoose.model('user', UserSchema)
    }
    
    save( _user:any){
        var def = defer();
        var user = new this.userModelMG( _user );
        user.save( (error:any, doc:any) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( doc );
            }
        });
        return def.promise;
    }
    
    get( user_name:string ){
        var def = defer();
        this.userModelMG.find( {user_name: user_name}, (error:any, docs:any) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }

    login( _user:any){
        var def = defer();
        this.get(_user['user_name']).then( (users:any) =>{
            if( users.length > 0){
                def.resolve( users[0] )
            }else{
                this.save(_user).then( (user:any) =>{
                    def.resolve(user)
                }).catch( (error:any) =>{
                    def.reject(error)
                })
            }
        } ).catch( (error:any) =>{
            def.reject( error );
        })
        return def.promise;
    }
}