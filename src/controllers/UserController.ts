import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'


class UserController{

    async show(req: Req, res: Res){

        const userRepository = getCustomRepository(UsersRepository)
        
        const content = await userRepository.find()

        return res.json(content)

    }

    async create(req: Req, res: Res){

        const { name, email } = req.body
    
        const userRepository = getCustomRepository(UsersRepository)

        const userExists = await userRepository.findOne({ email })
        
        if(userExists)
            return res.status(400).json({error: 'user already exists!'})

        const user = userRepository.create({ name, email })
        await userRepository.save(user)

        return res.status(201).json(user)
    
    }

    async delete(req: Req, res: Res){

        const { email } = req.body

        const userRepository = getCustomRepository(UsersRepository)

        const userDeleted = userRepository.delete({ email })
        
        return res.json(userDeleted)

    }

}

export { UserController }
