import 'reflect-metadata'
import express, { NextFunction, Request as Req, Response as Res } from 'express'
import 'express-async-errors'
import { routes } from './routes'
import createConnection from './database'
import { AppError } from './errors/AppError'

createConnection()

const server = express()

server.use(express.json())
server.use(routes)

server.use((err: Error, req: Req, res: Res, _next: NextFunction) => {
       
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({ message: err.message })
        }

        return res.status(500).json({
            status: 'Error',
            message: `Internal server error ${err.message}`
        })

})

export { server }