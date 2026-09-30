import { expect, test } from '@playwright/test';
import { API_PATHS } from '../../constants/url';
import { PRODUCTS, BRANDS, SEARCH_PRODUCTS } from '../../test-data';
import { ERROR_MESSAGE } from '../../constants/reponse-message';

test.describe('Cases with real request', () => {
    test('Get all products list', async ({ request }) => {
        const response = await request.get(API_PATHS.productsList);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.products).toEqual(PRODUCTS);
    });

    test('Post to all products list', async ({ request }) => {
        const response = await request.post(API_PATHS.productsList);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe(ERROR_MESSAGE.methodNotAllowed);
    });

    test('Get all brands list', async ({ request }) => {
        const response = await request.get(API_PATHS.brandsList);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.brands).toEqual(BRANDS);
    });

    test('Put to all brands list', async ({ request }) => {
        const response = await request.put(API_PATHS.brandsList);
        const responseBody = await response.json();
        expect(responseBody.responseCode).toBe(405);
        expect(responseBody.message).toBe(ERROR_MESSAGE.methodNotAllowed);
    });

    
    for (const [productType, expectedProducts] of Object.entries(SEARCH_PRODUCTS)) {
        test(`Post to search products by ${productType}`, async ({ request }) => {        
            const response = await request.post(
                API_PATHS.searchProduct,{
                    form: { search_product: productType }
            });
            const responseBody = await response.json();
            expect(responseBody.responseCode).toBe(200);
            expect(responseBody.products).toEqual(expectedProducts);
        });
    }
});
