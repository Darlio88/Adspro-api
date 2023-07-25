require('dotenv').config();
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';

import { Logger } from '../logger';
import productRoutes from './routes/productRoutes';
import path from 'path';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'path/to/your/upload/directory'); // Replace with the actual upload directory path
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the multer middleware
const upload = multer({ storage: storage });

app.post('/products', upload.array('photos', 5), (req: Request, res: Response) => {
  try {
    // Ensure that uploadedFiles is an array
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    // Access the uploaded files using req.files
    const uploadedFiles: Express.Multer.File[] = req.files as Express.Multer.File[];

    // Check if there are any uploaded files
    if (uploadedFiles.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded.' });
    }

    // Map the file paths to an array of strings
    const photos: string[] = uploadedFiles.map((file: Express.Multer.File) => file.path);


    // Respond with success message or other data
    res.status(200).json({ message: 'Product created successfully!', photos });
  } catch (error) {
    // Handle any errors that occurred during product creation
    res.status(500).json({ error: 'Error creating product: ' + error.message });
  }
});

app.post('/product', productRoutes);
app.get('/logs', (req: Request, res: Response) => {
  Logger.debug('Health-checking');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  Logger.debug(`${req}`);
  next();
});

export { app };
