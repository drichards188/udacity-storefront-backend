import supertest from "supertest";
import {app} from "../server";

const request = supertest(app);

export const getToken = async () => {
    let myToken = '';
    try {
        const resp = await request.get('/')

        myToken = resp.body.jwt;
    } catch (err) {
        throw new Error(`Cannot get home token ${err}`);
    }
    return myToken;
}

describe('test order route', () => {
    let token:string;
    beforeAll(async () => {
        token = await getToken();
    })

    it('should return active user order', async () => {
        const resp = await request
            .get('/orders/show?id=1')
            .set('Authorization', token)
        expect(resp.status).toBe(200);
    });

    it('should return 1 for creating order', async () => {
        const resp = await request
            .post('/orders?id=1')
            .set('Authorization', token)
        expect(resp.status).toBe(200);
    });

    it('should return 1 for creating order', async () => {
        const data = {
            productId: 1,
            quantity: 5
        }

        const resp = await request
            .put('/orders?id=1')
            .set('Authorization', token)
            .send(data)
        expect(resp.status).toBe(200);
    });
})