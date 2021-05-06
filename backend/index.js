const express           = require('express'),
      app               = express(),
      mongoose          = require('mongoose'),
      cors              = require('cors'),
      productsRouter    = require('./apis/products.api'),
      usersRouter       = require('./apis/user.api'),
      categoriesRouter  = require('./apis/categories.api'),
      seedProducts      = require('./seeds');

const PORT = process.env.PORT || 3001;

// const localDb = 'mongodb://localhost:27017/ecommerce';
const productionDb = `mongodb+srv://${ process.env.DBUSER }:${ process.env.DBPASSWORD }@mycluster.dxrov.mongodb.net/ecommerce?retryWrites=true&w=majority`

mongoose.connect(productionDb, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("DB connected")
    // seedProducts();
})
.catch(console.log);

app.use(cors());
app.use(express.json());

app.use('/', usersRouter);
app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);

app.get('/', (req, res) => {
    res.send("Ecommerce");
});

app.get('/seedProducts', (req, res) => {
    seedProducts();
    res.status(200).json({ message: 'Success' });
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Server started on port",PORT);
    }
})