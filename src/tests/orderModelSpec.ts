import {OrderStore} from "../models/ordersModel";

const store = new OrderStore();

describe('Order model', () => {
    it('single method should return a product', async () => {
        const result = await store.single(1);
        console.log('this is the result ' + JSON.stringify(result));
        expect(result).toBeDefined();
    });

    it('create method should return 200', async () => {
        const result = await store.create(1);
        expect(result).toBe(200);
    });

    it('addProduct method should return 200', async () => {
        const result = await store.addProduct(1, 1, 5);
        expect(result).toBe(200);
    });
});