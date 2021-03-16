import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import sendMailService from '../services/SendMailService'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysRepository } from '../repositories/SurveysRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { resolve } from 'path'


class SendMailController{

    async execute(req: Req, res: Res){

        const { email, survey_id } = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)


        const userExists = await usersRepository.findOne({ email })
        const surveyExists = await surveysRepository.findOne({ id: survey_id })
        
        if(!userExists)
            return res.status(404).json({error: 'user does not exists!'})
    
        if(!surveyExists)
            return res.status(404).json({error: 'survey does not exists!'})

    
        const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs')

        const surveyUserExists = await surveysUsersRepository.findOne({
            where: { user_id: userExists.id, value: null },  //where: [{ user_id: userExists.id }, { value: null }] *OR*
            relations: ['user', 'survey']
        })

        const variables = {
            name: userExists.name,
            title: surveyExists.title,
            description: surveyExists.description,
            id: '',
            link: process.env.URL_MAIL
        }

        if(surveyUserExists){
            variables.id = surveyUserExists.id

            await sendMailService.execute(email, surveyExists.title, variables, npsPath)
            return res.json(surveyUserExists)
        }

        
        const surveyUser = surveysUsersRepository.create({
            user_id: userExists.id,
            survey_id
        })
        
        await surveysUsersRepository.save(surveyUser)
        
        variables.id = surveyUser.id
        await sendMailService.execute(email, surveyExists.title, variables, npsPath)

        return res.status(201).json(surveyUser)

    }

}


export { SendMailController }