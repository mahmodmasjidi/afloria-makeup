// models/product.model.js
import Product from "./Product.js"; // mongoose modelini buradan import et

const adminOptions = {
  resources: [
    {
      resource: Product,
      options: {
        properties: {
          name: { isVisible: { list: true, filter: true, show: true, edit: true } },
          description: { isVisible: { list: true, filter: true, show: true, edit: true } }, // desc yerine description
          price: { isVisible: { list: true, filter: true, show: true, edit: true } },
          img: { isVisible: { list: true, filter: true, show: true, edit: true } },
          imgs: { isVisible: { list: false, filter: false, show: true, edit: true } },
          category: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            availableValues: [
              { value: "Makeup", label: "Makeup" },
              { value: "Cosmetic", label: "Cosmetic" }
            ]
          }
        }
      }
    }
  ]
};

export default adminOptions;
