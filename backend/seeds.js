const Product = require("./models/product.model"),
        faker = require('faker');;

const seedProduct = async () => {
    Product.create({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        seller: faker.name.findName(),
        images: [ faker.image.image(), faker.image.image(), faker.image.image() ],
        company: faker.company.companyName()
    });
}

const seedProducts = async () => {
    const arr = [];
    for(let i = 0;i < 10;i++) {
        arr.push( seedProduct() );
    }
    await Promise.all(arr);
    return;
}

module.exports = seedProducts;