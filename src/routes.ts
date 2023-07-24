import { productController } from "./controllers/productController";
import path from "path";

const express = require('express');
const multer = require('multer');
//const productControllers = require('./controllers/productController');

export const router = express.Router();

// Multer configuration for handling file uploads
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

// Route to handle file uploads
router.post('/upload', upload.array('photos', 5), (req, res) => {
  // File upload logic here
  // The uploaded files can be accessed using `req.files`

  //  Log file names
  req.files.forEach((file) => {
    console.log('Uploaded file:', file.filename);
  });

  res.status(200).json({ message: 'Files uploaded successfully!' });
});

// Route to handle creating a product
router.post('/products', productController.createProduct);

//module.exports = router;


