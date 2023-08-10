
import { Application } from 'express'
import { CommonRoutesConfig } from '../../configs/routes.config'


import { ProductController } from '../../controllers';

export default class ProductRoutes extends  CommonRoutesConfig{
    constructor(app: Application){
        super(app, 'ProductRoutes');
    } 
    configureRoutes(){
        
//Route for uploading files
        //this.app.route('/upload').post(ProductController.upload.array);
        //Route for creating a new product
        this.app.route('/add').post(ProductController.addProduct);
        //Route for fetching all products
        this.app.route('/').get(ProductController.getProducts);
        //this.app.route('/products/:id').get(productController.getProductById);
       //this.app.route('/products/:id').put(productController.updateProductById);
        //this.app.route('/products/:id').delete(productController.deleteProductById);
        return this.app;

        
    }
}