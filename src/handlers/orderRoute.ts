import express, {Request, Response} from "express";
import {OrderStore} from "../models/ordersModel";
import {authJWT} from "./userRoute";

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    await res.json(products);
}

const single = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const productId: number = parseInt(<string>req.query.id);
        const product = await store.single(productId);
        await res.json(product);
    } else {
        res.json({msg:'auth fail'});
    }
}

const create = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const userid: number = parseInt(<string>req.query.id);

        const resp = await store.create(userid);
        await res.json(resp);
    } else {
        res.json({msg:'auth fail'});
    }
}

const addProduct = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const productId: number = parseInt(<string>req.body.productid);
        const orderId: number = parseInt(<string>req.query.id);
        const quantity: number = parseInt(<string>req.body.quantity);

        const resp = await store.addProduct(orderId, productId, quantity);
        await res.json(resp);
    } else {
        res.json({msg:'auth fail'});
    }
}

const orderIndexRoutes = (app: express.Application) => {
    app.get('/orders/show', single)
    app.post('/orders', create)
    app.put('/orders', addProduct)
    app.get('/orders', index)
}

export default orderIndexRoutes;