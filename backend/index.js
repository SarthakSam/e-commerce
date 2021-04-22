const express = require('express'),
      app     = express();

const PORT = 3001;

app.get('/', (req, res) => {
    res.send("E commerce");
})

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    }
    else {
        console.log("Server started on port",PORT);
    }
})