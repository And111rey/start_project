// const express = require('express')
import express, { Request, Response } from "express";
const app = express();
const port = process.env.PORT || 5000;

type productsType = Array<{ id: Number; value: string }>;

const products = [{ title: "tomato" }, { title: "orange" }];
const addresses: productsType = [
  { id: 1, value: "Myru avenu, 109" },
  { id: 2, value: "Kamenetska, 98" },
];

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World OKSANUTKA");
});
app.get("/products", (req: Request, res: Response) => {

  if(req.query.title){
    let searchString = req.query.title.toString()
    res.send(products.filter(p => p.title.indexOf(searchString) > -1 )).sendStatus(200)
  }
  res.send(`you should select from this list ${products}`);
});

app.get("/product/:productTitle", (req: Request, res: Response) => {
  let product = products.find((p) => p.title === req.params.productTitle);
  if (product) {
    res.send(product).send(200);
  } else {
    res.sendStatus(404);
    res.send("Bad request");
  }
});

app.get("/addresses", (req: Request, res: Response) => {
  res.send(addresses);
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
