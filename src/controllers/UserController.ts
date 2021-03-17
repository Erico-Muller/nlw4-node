import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { AppError } from '../errors/AppError'
import * as yup from 'yup'


class UserController{

    async show(req: Req, res: Res){

        const userRepository = getCustomRepository(UsersRepository)
        
        const content = await userRepository.find()

        return res.json(content)

    }

    async create(req: Req, res: Res){

        const { name, email } = req.body

        const schema = yup.object().shape({
            name: yup.string().required(/*'nome obrigatorio'*/),
            email: yup.string().email().required(/*'email obrigatorio'*/)
        })

        try{
            await schema.validate(req.body, { abortEarly: false })
        } catch(err) {
            return res.status(400).json({ error: err })
        }
        
        const userRepository = getCustomRepository(UsersRepository)

        const userExists = await userRepository.findOne({ email })
        
        if(userExists)
            throw new AppError('user already exists!')

        const user = userRepository.create({ name, email })
        await userRepository.save(user)

        return res.status(201).json(user)
    
    }

    async delete(req: Req, res: Res){

        const { email } = req.body

        const userRepository = getCustomRepository(UsersRepository)

        const schema = yup.object().shape({
            email: yup.string().email().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: false })
        } catch(err) {
            return res.status(400).json({ error: err })
        }
        
        const userDeleted = userRepository.delete({ email })
        
        return res.json(userDeleted)

    }

}

export { UserController }
