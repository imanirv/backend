const express = require('express');
const app = express()

const productRoute = require('./routes/products')

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'welcome to shop app'})
})

app.use('/product', productRoute)

app.listen(3000)