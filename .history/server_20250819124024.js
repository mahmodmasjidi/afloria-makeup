import express from 'express';
import mongoose from 'mongoose';
import AdminJS from 'adminjs';
import AdminJSMongoose from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';

AdminJS.registerAdapter(AdminJSMongoose);

import dotenv from 'dotenv';
import Product from './models/product.model.js';

dotenv.config();
AdminJS.registerAdapter(AdminJSMongoose);

const app = express();

// MongoDB bağlantısı
const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // AdminJS ayarları
    const adminJs = new AdminJS({
      resources: [
        {
          resource: Product,
          options: {
            properties: {
              desc: { type: 'richtext' }, // açıklamayı zengin metin olarak göster
            },
          },
        },
      ],
      rootPath: '/admin',
    });

    const router = AdminJSExpress.buildRouter(adminJs);
    app.use(adminJs.options.rootPath, router);

    app.listen(3000, () => {
      console.log('AdminJS paneli http://localhost:3000/admin adresinde çalışıyor');
    });

  } catch (error) {
    console.error(error);
  }
};

run();
