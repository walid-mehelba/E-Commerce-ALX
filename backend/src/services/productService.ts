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
      {
        title: "Asus Laptop",
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRbuN48I0ndj6X2JrxdEnRkiqwNX2eS-QyF2R6-iox01yPp9nAk6Tb3u6TflNfK2wmuKnnZZHI53TLjQKA8m9NrjGVHWaoGeJyaDPwj5FK0llQWG2UwgMA3KBwVgNcXeXRhc_Augw&usqp=CAc",
        price: 15000,
        stock: 10,
      },
      {
        title: "HP Laptop",
        image:
          "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSLdLJdY7AAGPEgGSDY-I_3sWfyqTXxYzRC-D0JZ-2XWgT93oLpBKhSwA0KTKEJoIsSoFJuA8KpWL_YBA3YJgAxrBmSW4-cXWLQNzoOveGYbALTHTkP00vWW6hpBl7HX-26_fJ0-DEVOYU&usqp=CAc",
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
