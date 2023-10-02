class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    const productIndex = this.products.findIndex(
      (product) => product.code === code
    );

    if (productIndex === -1) {
      const product = {
        id: this.products.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
      this.products.push(product);
      console.log(`Product with code ${code} added successfully`);
    } else {
      console.log(`Error: Product with code ${code} already exists`);
    }
  };

  getProducts = () => {
    console.log(this.products);
    return this.products;
  };

  getProductById = (productId) => {
    const productIdFound = this.products.findIndex(
      (prod) => prod.id === productId
    );
    if (productIdFound === -1) {
      console.log(`Error: Product with ID ${productId} was not found`);
    } else {
      console.log(`Info on product with Product ID ${productId}:`);
      console.log(this.products[productIdFound]);
    }
  };
}

// // testing // //

let products = new ProductManager();

products.getProducts(); // Empty array

products.addProduct("test"); // Missing fields
products.addProduct(
  "test product",
  "this is a test product",
  200,
  "No image",
  "abc123"
); // Missing fields
products.addProduct("this is a test product", 200, "No image", "abc123", 25); // Missing fields
products.addProduct(200, "No image", "abc123", 25); // Missing fields
products.addProduct(
  "test product",
  "this is a test product",
  200,
  "No image",
  "abc123",
  25
); // Product 1
products.addProduct(
  "test product",
  "this is a test product",
  200,
  "No image",
  "abc123",
  25
); // Repeated
products.addProduct(
  "test product2",
  "this is a test product2",
  500,
  "No image",
  "bbc123",
  50
); // Product 2
products.addProduct(
  "test product3",
  "this is a test product3",
  700,
  "No image",
  "cba123",
  80
); // Product 3

products.getProducts();

products.addProduct(
  "test product",
  "this is a test product",
  200,
  "No image",
  "bbc123",
  25
); // Repeated

products.getProducts();

products.getProductById(8); // Non existant
products.getProductById(1);
products.getProductById(3);
products.getProductById(17); // Non existant
