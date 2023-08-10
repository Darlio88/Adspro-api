import multer from 'multer'
import { Application } from 'express'
import { CommonRoutesConfig } from '../../configs/routes.config'

import { UserController } from '../../controllers'

export default class UserRoutes extends  CommonRoutesConfig{
    constructor(app: Application){
        super(app, 'UserRoutes');
    } 
    configureRoutes(){
        this.app.route('/users').get(UserController.getUsers);
        this.app.route('/user/:id').get(UserController.getUser);
        this.app.route('/users/register').get(UserController.registerUsers);
        this.app.route('/users/login').get(UserController.loginUsers);
        return this.app;
        
    }
}