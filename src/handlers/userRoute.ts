import express, {Request, Response} from "express";
import {UserStore} from "../models/userModel";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const users = await store.index();
        await res.json(users);
    } else {
        res.send('login failed');
    }
}

const single = async (req: Request, res: Response) => {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader!.split(' ');
    const authCheck = authJWT(token[1]!);
    if (authCheck) {
        const userId: number = parseInt(<string>req.query.id);
        const product = await store.single(userId);
        await res.json(product);
    } else {
        res.json({msg: 'auth fail'});
    }
}

const create = async (req: Request, res: Response) => {
    const secretKey = process.env.JWT_KEY!;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        if (firstName && lastName && password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            if (hashedPassword! === 'fail') {
                res.json({msg: 'hash fail'});
            } else {
                const resp = store.create(firstName, lastName, hashedPassword!);
                const token = jsonwebtoken.sign({firstname: firstName, lastname: lastName}, secretKey);
                res.json({msg: 'success', token: token});
            }

    } else {
            res.json({msg: 'please send all fields'})
        }
}

export const authJWT = (token: string) => {
    const secretKey = process.env.JWT_KEY!;
    const verifyResult = jsonwebtoken.verify(token, secretKey);
    if (verifyResult) {
        return true;
    } else {
        return false
    }
}

const userIndexRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users/show', single);
    app.get('/users', index);
}

export default userIndexRoutes;