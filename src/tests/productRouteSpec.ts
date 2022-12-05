import supertest from "supertest";
import {app} from "../server";
import {getToken} from "./orderRouteSpec";

const request = supertest(app);

describe('test product route',  () => {
    let token:string;
    beforeAll(async () => {
        token = await getToken();
    })

    it('should return all products', async () => {
        const resp = await request
            .get('/products')
            expect(resp.status).toBe(200);
    });

    it('should return a specific product', async () => {
        const resp = await request
            .get('/products/show?id=1')
            expect(resp.status).toBe(200);
    });

    it('should create the passed product', async () => {
        const product = {
            name: 'earbuds',
            price: 34
        }

        const resp = await request
            .post('/products')
            .set('Authorization', token)
            .send(product)
            expect(resp.status).toBe(200);
    });
})