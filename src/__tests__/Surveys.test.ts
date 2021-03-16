import request from 'supertest'
import { server } from '../app'
import createConnection from '../database'


describe('Surveys', () => {

    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })


    it('Should be able to create a new survey', async () => {

        const res = await request(server).post('/surveys').send({
            title: 'test',
            description: 'test'
        })

        expect(res.status).toBe(201)

    })


    it('Should return all surveys', async () => {
        const res = await request(server).get('/surveys')
        expect(res.status).toBe(200)
    })


    it('Should be able to delete a surveys', async () => {

        const res = await request(server).delete('/surveys').send({
            title: 'test'
        })

        expect(res.status).toBe(200)

    })

})