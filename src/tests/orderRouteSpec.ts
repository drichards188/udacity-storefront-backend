import supertest from "supertest";
import {app} from "../server";

const request = supertest(app);

const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZGF2aWQiLCJpYXQiOjE2Njk3NDMxMjd9.XISGVLkut860DV-5-pNjwXkPjIIksaiC8ZuJWmd3fkc';
describe('test order route', () => {
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