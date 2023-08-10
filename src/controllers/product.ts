// controllers/product.controller.ts
import { Request, Response } from 'express';
import { Product } from '../models/product';
import multer from 'multer';
//import { File } from 'buffer';
//import { File as MulterFile } from 'multer';

type File = Express.Multer.File;
// Set up the multer middleware for image upload
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// Define the controller class for the product endpoints
export class ProductController {
  // Add a new product to the database
  static async addProduct(req: Request, res: Response) {
    try {
      // Use upload.array to handle multiple image files
      upload.array('images', 5)(req, res, async (err) => {
        if (err) {
          // Handle any errors from multer
          return res.status(400).json({ message: err.message });
        }
        // Get the product data from the request body
        const { category, location,title, description, price, bulkPrice, phoneNumber, name, delivery, payments  } = req.body;
        // Get the image paths from the request files
        
        const images = req.files as File[];
        const imagePaths = images.map(file => file.path);

        // Create a new product instance with the data
        const product = new Product();
        product.category = category;
        product.location = location;
        product.images = imagePaths;
        product.title = title;
        product.description = description;
        product.price = price;
        product.bulkPrice = bulkPrice;
        product.phoneNumber = phoneNumber;
        product.name = name;
        product.delivery = delivery;
        product.payments = payments;
        // Save the product to the database
        await product.save();
        // Send a success response with the product data
        return res.status(201).json({ message: 'Product added successfully', product });
      });
    } catch (error) {
      // Handle any errors from the database
      return res.status(500).json({ message: error.message });
    }
  }

  // Get all products from the database
  static async getProducts(req: Request, res: Response) {
    try {
      // Find all products in the database
      const products = await Product.find();
      // Send a success response with the products data
      return res.status(200).json({ message: 'Products retrieved successfully', products });
    } catch (error) {
      // Handle any errors from the database
      return res.status(500).json({ message: error.message });
    }
  }
}








