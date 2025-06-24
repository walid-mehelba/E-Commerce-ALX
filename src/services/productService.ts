import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Laptop",
        image:
          "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRbAtVBn8Vuanhcz8Bw_Gk50wqUsGN4ydfohQEDTdAP0xjKI07hYZUH5LJfC4OeRu49v5SKtU8EVF0aRxI3CKqaB8YfM2iRdPFAhGi07WSFZb4zVPKG4w4UKVTmUGVVh3AZC7LDNDSBMg&usqp=CAc",
        price: 15000,
        stock: 10,
      },
    ];

    const existingProducts = await getAllProducts();

    if (existingProducts.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.error("Cannot seed database", err);
  }
};
