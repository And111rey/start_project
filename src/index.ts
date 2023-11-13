// const express = require('express')
import express, { Request, Response } from "express";
import bodyParser from "body-parser";

export const app = express();

const port = process.env.PORT || 5000;

type productsType = Array<{ id: Number; title: string }>;
type addressesType = Array<{ id: Number; value: string }>;

let products: productsType = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
let addresses: addressesType = [
  { id: 1, value: "Myru avenu, 109" },
  { id: 2, value: "Kamenetska, 98" },
];

const parserMiddleware = bodyParser()
app.use(parserMiddleware)

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World OKSANUTKA");
});
app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    let searchString = req.query.title.toString();
    res
      .send(products.filter((p) => p.title.indexOf(searchString) > -1))
      .sendStatus(200);
  }
  res.send(`you should select from this list ${products}`);
});

app.get("/products/:id", (req: Request, res: Response) => {
  let product = products.find((p) => p.id === +req.params.id);
  if (product) {
    res.send(product).send(200);
  } else {
    res.sendStatus(404);
    res.send("Bad request");
  }
});

app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === +req.params.id) {
      products.splice(i, 1);
      res.sendStatus(204);
      return;
    }
  }
  res.sendStatus(404);
  res.send("Bad request");
});

app.post("/products", (req: Request, res: Response) => {
  const newProduct = { id: +new Date(), title:  req.body.title};
  console.log(newProduct)
  if(newProduct) {
    products.push(newProduct);
    res.status(201).send(products);
  } else {
    res.status(404).send("Bad request")
  }
 
});
app.put("/products/:id", (req: Request, res: Response) => {

   if (req.params.id) {
     for (let i = 0; i < products.length; i++) {

      if (+req.params.id === products[i].id) {
        products[i].title = req.body.title
        const result = {products, changed: products[i]}
        res.status(200).send(result);
        return;
      }
     }
   } else {
     res.status(404);
   }
  

 
});
app.delete("__test__/addresses", (req, res) =>{
  addresses = []
  console.log("DELETED>>>>...........1212412412412")
  res.sendStatus(204)
})

app.get("/addresses", (req: Request, res: Response) => {
  res.send(addresses).status(200);
});

app.get("/addresses/:id", (req: Request, res: Response) => {
  let address = addresses.find((p) => p.id === +req.params.id);
  if (address) {
    res.send(address).send(200);
  } else {
    res.sendStatus(404);
    res.send("Bad request");
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
