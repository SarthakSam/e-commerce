const express           = require('express'),
      app               = express(),
      mongoose          = require('mongoose'),
      cors              = require('cors'),
      productsRouter    = require('./apis/products.api'),
      usersRouter       = require('./apis/user.api');

const PORT = process.env.PORT || 3001;

const localDb = 'mongodb://localhost:27017/ecommerce';

mongoose.connect(localDb, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("DB connected")
    // seedVideos();
})
.catch(console.log);

app.use(cors());
app.use(express.json());

app.use('/', usersRouter);
app.use('/products', productsRouter);

app.get('/', (req, res) => {
    res.send("Ecommerce");
});

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Server started on port",PORT);
    }
})