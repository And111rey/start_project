// const express = require('express')
import express, {Request, Response} from  "express"
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!))))Hello new fixed port || 5000 new message')
  res.send(<h1>Hello Oksanutka</h1>)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})