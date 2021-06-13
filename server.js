const express = require('express');
const {connectToDB} = require('./repositories/db');
const {productsRouter} = require('./routes/productRouter');
//const {graphqlHTTP} = require('express-graphql');
//const {graphQLObject} = require('./services/graphQL');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=> {
    res.json({message: `Welcome page`})
})

app.use('/products', productsRouter);

//app.use('/graphql', graphqlHTTP(graphQLObject));

const startServer = async() => {
    const connected = await connectToDB();
    if(connected == 'DB Connection established'){
        app.listen(8080, ()=> {
            console.log(`${connected} => App listening on port 8080`);
        })
    } else {
        console.log(`There has been an error connecting to the DB => ${connected}`)
    }
}

startServer();

module.exports = app;
