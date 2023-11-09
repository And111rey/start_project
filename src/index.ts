// const express = require('express')
import express, {Request, Response} from  "express"
const app = express()
const port = process.env.PORT || 5000

const products = [{title: "tomato" }, {title: "orange"}]
const addresses = [{id: 1,value: "Myru avenu, 109"}, {id:2, value: "Kamenetska, 98"}]

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World OKSANUTKA')
})
app.get('/product', (req: Request, res: Response) => {
  res.send(products)
})

app.get("/product/:productTitle", (req: Request, res: Response) => {
  let product = products.find((p) => p.title === req.params.productTitle);
  if (product) {
    res.send(product).send(200)
  } else {
    res.sendStatus(404)
    res.send("Bad request")

  }
});

app.get('/addresses', (req: Request, res: Response)=>{
  res.send(addresses)
})


app.get("/addresses/:id", (req: Request, res: Response) => {
  let address = products.find((p) => p.id === +req.params.id);
  if (address) {
    res.send(address).send(200)
  } else {
    res.sendStatus(404)
    res.send("Bad request")

  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})