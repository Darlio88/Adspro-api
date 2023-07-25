import { Request, Response } from 'express';
import { Product } from '../models/product';
//import multer from 'multer';
import path from 'path';
import multer, { Multer } from 'multer';

import { getConnection } from 'typeorm';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload: Multer = multer({ storage: storage });


export const productController = {
    uploadFiles: (req: Request, res: Response) => {
        upload.array('photos', 5)(req, res, (err: any) => {
            if (err) {
                console.error('Error uploading files:', err);
                return res.status(500).json({ message: 'An error occurred while uploading files.' });
            }

            // Access uploaded files using `req.files`
            const uploadedFiles = (req as any).files as Express.Multer.File[];

            // Log file names
            uploadedFiles.forEach((file) => {
                console.log('Uploaded file:', file.filename);
            });

            res.status(200).json({ message: 'Files uploaded successfully!' });
        });
    },

    createProduct: async (req: Request, res: Response) => {
       
        try {
            const {
                category,
                location,
                title,
                description,
                price,
                bulkPrice,
                phoneNumber,
                name,
                delivery,
                payments,
            } = req.body;

            // Explicitly define the type for req.files
            const uploadedFiles = req.files as Express.Multer.File[];
      
            // For the `photos` field, you can store the file paths in an array
            
const photos: string[] = uploadedFiles.map((file: Express.Multer.File) => file.path);

      
            // Validate photos property
            if (!Array.isArray(photos)) {
              return res.status(400).json({ message: 'Invalid photos. It should be an array.' });
            }
            const newProduct = Product.create({
                category,
                location,
                photos,
                title,
                description,
                price,
                bulkPrice,
                phoneNumber,
                name,
                delivery,
                payments,
              });

              await newProduct.save(); // Save the product to the database

              res.status(201).json(newProduct); // Send the response
            } catch (error) {
              console.error('Error creating product:', error);
              res.status(500).json({ message: 'An error occurred while creating the product.' });
            }
          },

    getAllProducts: async (_req: Request, res: Response) => {
        try {
            // Fetch all products from the database
            const products = await Product.find();

            res.status(200).json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'An error occurred while fetching products.' });
        }
    },

    //   getProductById: async (req: Request, res: Response) => {
    //     try {
    //       const productId = parseInt(req.params.id);

    //       // Fetch a single product by its ID from the database
    //       const product = await Product.findOne(productId);

    //       if (!product) {
    //         return res.status(404).json({ message: 'Product not found.' });
    //       }

    //       res.status(200).json(product);
    //     } catch (error) {
    //       console.error('Error fetching product:', error);
    //       res.status(500).json({ message: 'An error occurred while fetching the product.' });
    //     }
    //   },

    //   updateProductById: async (req: Request, res: Response) => {
    //     try {
    //       const productId = parseInt(req.params.id);

    //       // Fetch the existing product by its ID from the database
    //       const existingProduct = await Product.findOne(productId);

    //       if (!existingProduct) {
    //         return res.status(404).json({ message: 'Product not found.' });
    //       }

    //       const {
    //         category,
    //         location,
    //         photos,
    //         title,
    //         description,
    //         price,
    //         bulkPrice,
    //         phoneNumber,
    //         name,
    //         delivery,
    //         payments,
    //       } = req.body;

    //       // Update the product with the new data
    //       existingProduct.category = category;
    //       existingProduct.location = location;
    //       existingProduct.photos = photos;
    //       existingProduct.title = title;
    //       existingProduct.description = description;
    //       existingProduct.price = price;
    //       existingProduct.bulkPrice = bulkPrice;
    //       existingProduct.phoneNumber = phoneNumber;
    //       existingProduct.name = name;
    //       existingProduct.delivery = delivery;
    //       existingProduct.payments = payments;

    //       // Save the updated product to the database
    //       await existingProduct.save();

    //       res.status(200).json(existingProduct);
    //     } catch (error) {
    //       console.error('Error updating product:', error);
    //       res.status(500).json({ message: 'An error occurred while updating the product.' });
    //     }
    //   },

    //   deleteProductById: async (req: Request, res: Response) => {
    //     try {
    //       const productId = parseInt(req.params.id);

    //       // Delete the product from the database
    //       await getConnection().createQueryBuilder().delete().from(Product).where('id = :id', { id: productId }).execute();

    //       res.status(200).json({ message: 'Product deleted successfully.' });
    //     } catch (error) {
    //       console.error('Error deleting product:', error);
    //       res.status(500).json({ message: 'An error occurred while deleting the product.' });
    //     }
    //   },
};
