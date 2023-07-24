

const { Client } = require('pg');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// PostgreSQL client setup
const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Product model
export class Product {
  static async create(productData) {
    try {
      const {
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
      } = productData;

      const query = 'INSERT INTO products (category, location, photos, title, description, price, bulk_price, phone_number, name, delivery, payments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *';
      const values = [
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
      ];

      const result = await client.query(query, values);
      const newProduct = result.rows[0];
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('An error occurred while creating the product.');
    }
  }
}

//module.exports = Product;
