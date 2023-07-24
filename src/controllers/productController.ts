import {Product} from '../models/product'
//const Products = require('../models/product');

export const productController = {
  createProduct: async (req, res) => {
    try {
      const {
        category,
        location,
        photos, // Array of file names (from file upload)
        title,
        description,
        price,
        bulkPrice,
        phoneNumber,
        name,
        delivery,
        payments,
      } = req.body;

      const productData = {
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
      };

      const newProduct = await Product.create(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ message: 'An error occurred while creating the product.' });
    }
  },
};

//module.exports = productController;
