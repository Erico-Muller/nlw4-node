import request from 'supertest'
import { server } from '../app'
import createConnection from '../database'


describe('Users', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })


    it('Should be able to create a new user', async () => {

        const res = await request(server).post('/user').send({
            email: 'test@test.com',
            name: 'test'
        })

        expect(res.status).toBe(201)

    })


    it('Should return all users', async () => {
        const res = await request(server).get('/user')
        expect(res.status).toBe(200)
    })


    it('Should not be able to create a new user', async () => {

        const res = await request(server).post('/user').send({
            email: 'test@test.com',
            name: 'test'
        })

        expect(res.status).toBe(400)

    })


    it('Should be able to delete an user', async () => {

        const res = await request(server).delete('/user').send({
            email: 'test@test.com'
        })

        expect(res.status).toBe(200)

    })

})