import express, { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { productController } from '../controllers/productController';

const router = express.Router();
//const router: Router = express.Router();

//Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
//const upload = multer({ dest: 'uploads/' });

// Route to handle file uploads
router.post('/upload', upload.array('photos', 5), productController.uploadFiles);

// Route to create a product
//router.post('/products', productController.createProduct);
router.post('/products', upload.array('photos', 5), productController.createProduct);

// Route to fetch all products
router.get('/products', productController.getAllProducts);

// Route to fetch a single product by ID
//router.get('/products/:id', productController.getProductById);

// Route to update a product by ID
//router.put('/products/:id', productController.updateProductById);

// Route to delete a product by ID
//router.delete('/products/:id', productController.deleteProductById);

export default router;
