import {ProductStore} from "../models/productModel";
import express, {Request, Response} from "express";
import {authJWT} from "./userRoute";

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        await res.json(products);
    } catch (err) {
        throw new Error(`Cannot get product index ${err}`);
    }
}

const single = async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(<string>req.query.id);
        const product = await store.single(productId);
        await res.json(product);
    } catch (err) {
        throw new Error(`Cannot get product single ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        if (name && price) {
            const resp = await store.create(name, price);
            res.json({msg: 'success'});
        }

    } catch (err) {
        throw new Error(`Cannot get product create ${err}`);
    }
}

const productIndexRoutes = (app: express.Application) => {
    app.post('/products', create)
    app.get('/products/show', single)
    app.get('/products', authJWT, index)
}

export default productIndexRoutes;