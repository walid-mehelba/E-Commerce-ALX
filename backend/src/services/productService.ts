import productModel from "../models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Dell Latitude 5490 Notebook",
        description:
          "14“ FHD (1920 x 1080) Business Laptop, Intel Core i5-8350 Up to 3.4GHz, 16GB RAM 512GB SSD, Bluetooth, Wi-Fi, CAM, HDMI, DP, VGA Windows 10 Pro (Renewed)",
        image: "https://m.media-amazon.com/images/I/51SUub5+dJL._AC_SX679_.jpg",
        price: 18000,
        stock: 10,
      },
      {
        title: "MSI Modern 15 F13MG|i5-1335U|",
        description:
          'Iris Xe Graphics| 8GB RAM DDR4 3200Mhz| 512GB NVMe Gen4x4| 15.6" IPS FHD 60Hz 45% NTSC Display|Single backlight Keyboard(White)|DOS|Urban Silver|',
        image: "https://m.media-amazon.com/images/I/511jvEF3qIL._AC_SX679_.jpg",
        price: 21000,
        stock: 10,
      },
      {
        title: "Lenovo LOQ 15IRX9 Gaming Laptop",
        description:
          '13th Intel Core i7-13650HX, 16GB DDR5 RAM, 512GB SSD, AI Chip: LA1, NVIDIA GeForce RTX 3050 6GB GDDR6 Graphics, 15.6" FHD (1920x1080) IPS 144Hz',
        image: "https://m.media-amazon.com/images/I/51SMd12nm3L._AC_SX679_.jpg",
        price: 47000,
        stock: 10,
      },
      {
        title: "ASUS Vivobook Go 15 AMD Ryzen™ 5",
        description:
          "7520U Processor 2.8GHz (6MB Cache, up to 4.3GHz, 4 cores, 8 Threads) LPDDR5 8GB 512GB M.2 NVMe™ PCIe® 3.0 SSD Win 11",
        image: "https://m.media-amazon.com/images/I/41weMI3kieL._AC_.jpg",
        price: 19900,
        stock: 10,
      },
      {
        title: "Lenovo IdeaPad 1",
        description:
          'CPU: AMD Ryzen™ 3 7320U, 4GB Soldered LPDDR5-5500, Display: 15.6" HD (1366x768) TN 220nits Anti-glare, 256GB SSD, Windows® 11 Home(82VG00DPED)',
        image: "https://m.media-amazon.com/images/I/51TkyORDVtL._AC_SX679_.jpg",
        price: 16000,
        stock: 10,
      },
      {
        title: "HP Victus Gaming Laptop",
        description:
          "12th Gen Intel 8-Core i5-12450H, 8GB RAM, 512GB SSD, 4GB NVIDIA GeForce RTX 3050, 15.6” FHD (1920 x 1080) 144Hz, Windows 11 Home",
        image: "https://m.media-amazon.com/images/I/51utVqmZmDL._AC_SX679_.jpg",
        price: 30799,
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
