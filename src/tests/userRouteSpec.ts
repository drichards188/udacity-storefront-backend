import supertest from "supertest";
import {app} from "../server";
import {getToken} from "./orderRouteSpec";

const request = supertest(app);

describe('test user route',  () => {
    let token:string;
    beforeAll(async () => {
        token = await getToken();
    })

    it('should return all products', async () => {
        const resp = await request
            .get('/users')
            .set('Authorization', token)
            expect(resp.status).toBe(200);
    });

    it('should return a specific user', async () => {
        const resp = await request
            .get('/users/show?id=1')
            .set('Authorization', token)
            expect(resp.status).toBe(200);
    });

    it('should create the passed user', async () => {
        const user = {
            firstname: 'tucker',
            lastname: 'richards',
            password: '1234'
        }

        const resp = await request
            .post('/users')
            .set('Authorization', token)
            .send(user)
            expect(resp.status).toBe(200);
    });
});