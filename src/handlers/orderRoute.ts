import express, {Request, Response} from "express";
import {OrderStore} from "../models/ordersModel";
import {authJWT} from "./userRoute";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await store.index();
        await res.json(products);
    } catch (err) {
        throw new Error(`Cannot get order index ${err}`);
    }
}

const single = async (req: Request, res: Response) => {
    try {
        const productId: number = parseInt(<string>req.query.id);
        const product = await store.single(productId);
        await res.json(product);
    } catch (err) {
        throw new Error(`Cannot get order single ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const userid: number = parseInt(<string>req.query.id);

        const resp = await store.create(userid);
        await res.json(resp);
    } catch (err) {
        throw new Error(`Cannot get order create ${err}`);
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const orderId: number = parseInt(<string>req.query.id);
        const productId: number = parseInt(<string>req.body.productId);
        const quantity: number = parseInt(<string>req.body.quantity);

        const resp = await store.addProduct(orderId, productId, quantity);
        await res.json(resp);
    } catch (err) {
        throw new Error(`Cannot get order addProduct ${err}`);
    }
}

const orderIndexRoutes = (app: express.Application) => {
    app.get('/orders/show', authJWT, single)
    app.post('/orders', authJWT, create)
    app.put('/orders', authJWT, addProduct)
    app.get('/orders', index)
}

export default orderIndexRoutes;