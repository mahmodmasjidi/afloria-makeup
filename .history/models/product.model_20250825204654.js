import AdminJS from 'adminjs';
import AdminJSMongoose from '@adminjs/mongoose';
import Product from './models/Product.model.js';

const adminOptions = {
  resources: [{
    resource: Product,
    options: {
      properties: {
        name: { isVisible: { list: true, filter: true, show: true, edit: true } },
        desc: { isVisible: { list: true, filter: true, show: true, edit: true } },
        price: { isVisible: { list: true, filter: true, show: true, edit: true } },
        img: { isVisible: { list: true, filter: true, show: true, edit: true } },
      }
    }
  }]
};

const admin = new AdminJS(adminOptions);
