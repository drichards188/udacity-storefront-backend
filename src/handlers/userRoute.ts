import express, {NextFunction, Request, Response} from "express";
import {UserStore} from "../models/userModel";
import bcrypt from 'bcrypt';
import jsonwebtoken from "jsonwebtoken";

const store = new UserStore();

const index = async (req: Request, res: Response) => {
    try {
        const users = await store.index();
        await res.json(users);
    } catch (err) {
        throw new Error(`Cannot get user index ${err}`);
    }
}

const single = async (req: Request, res: Response) => {
    try {

        const userId: number = parseInt(<string>req.query.id);
        const product = await store.single(userId);
        await res.json(product);

    } catch (err) {
        throw new Error(`Cannot get user single ${err}`);
    }
}

const create = async (req: Request, res: Response) => {
    try {
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
    } catch (err) {
        throw new Error(`Cannot get user create ${err}`);
    }
}

export const authJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        const tokenHeader = req.headers['authorization'];
        const token = tokenHeader!.split(' ');

        if (token[1]) {
            const secretKey = process.env.JWT_KEY!;
            const verifyResult = jsonwebtoken.verify(token[1], secretKey);
            if (verifyResult) {
                next()
            } else {
                return false
            }
        } else {
            res.json({msg: 'auth fail'});
        }
    } catch (err) {
        throw new Error(`Error in authJWT ${err}`);
    }
}

const userIndexRoutes = (app: express.Application) => {
    app.post('/users', create);
    app.get('/users/show', authJWT, single);
    app.get('/users', authJWT, index);
}

export default userIndexRoutes;