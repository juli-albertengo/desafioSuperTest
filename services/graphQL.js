const {buildSchema} = require('graphql');
const {Products} = require('../services/productServices');

let productos = new Products([])

const schema = buildSchema(`
    type Query {
        products: [Product],
        product(id: String): Product
    },
    type Mutation {
        addProduct(name: String!, category: String!, description: String!, foto: String!, price: Int!): Product
    },
    type Product {
        id: String
        name: String
        category: String
        description: String
        foto: String
        price: Int
    }
`)

const getProducts = async(args) => {
    try {
        let products = await productos.getAllProducts();
        return products;
    } catch(error) {
        console.log(error);
        return []
    }
}

const getProductById = async(args) => {
    const id = args.id;
    try {
        let product = await productos.getProductById(id);
        if(!product){
            return {}
        }
        return product;
    } catch (error){
        console.log(error)
        return {};
    }
}

const addProduct = async(args) => {
    const product = {
        name: args.name,
        category: args.category,
        description: args.description,
        foto: args.foto,
        price: args.price
    }
    try {
        let addedProduct = await productos.addProduct(product);
        return addedProduct;
    } catch (error) {
        console.log(error);
        return {}
    }
}


const root = {
    products: getProducts,
    product: getProductById,
    addProduct: addProduct
};

const graphQLObject = {
    schema,
    rootValue: root,
    graphiql: true
}

module.exports  = {graphQLObject}