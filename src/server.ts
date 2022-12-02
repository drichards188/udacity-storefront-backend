import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import productIndexRoutes from "./handlers/productRoute";
import userIndexRoutes from "./handlers/userRoute";
import orderIndexRoutes from "./handlers/orderRoute";
import jsonwebtoken from "jsonwebtoken";

export const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json());

app.get('/', function (req: Request, res: Response) {
    const jwt = jsonwebtoken.sign({user: 'user'}, process.env.JWT_KEY!);
    res.json({msg: 'hi, attached token will let you in', jwt: jwt})
});

productIndexRoutes(app);
userIndexRoutes(app);
orderIndexRoutes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
