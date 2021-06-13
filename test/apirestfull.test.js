const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

describe(`Test API Restfull`, ()=> {

    describe('TEST GET', ()=> {

        it(`Deberia retornar status 200`, async function(){
                let response = await request(app).get('/products');
                expect(response.status).to.eql(200);
        })
    })

    describe('TEST POST', ()=>{

        it(`Deberia incorporar un producto a la DB`, async()=> {
            const productoTest = {
                name: 'PRUEBA TEST',
                category: 'Category Prueba',
                description: 'Probando superTest',
                foto: 'URL',
                price: 200
            }
            let response = await request(app).post('/products').send(productoTest);
            expect(response.status).to.eql(200);

            const productoDevuelto = response.body;
            expect(productoDevuelto).to.include.keys('name','category','description', 'foto', 'price');
            expect(productoDevuelto.name).to.eql(productoTest.name);
            expect(productoDevuelto.category).to.eql(productoTest.category);
            expect(productoDevuelto.description).to.eql(productoTest.description);
            expect(productoDevuelto.foto).to.eql(productoTest.foto);
            expect(productoDevuelto.price).to.eql(productoTest.price);

            let responseDeletion = await request(app).delete(`/products/${productoDevuelto._id}`)
            console.log(`Test successful and testProduct deleted => ${responseDeletion.body.deletedCount}`);
        })
    })

})