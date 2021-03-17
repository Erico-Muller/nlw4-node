import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { AppError } from '../errors/AppError'


class AnswerController{

    async execute(req: Req, res: Res){

        const { value }  = req.params
        const { u } = req.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({ id: String(u) })

        if(!surveyUser)
            throw new AppError('Survey User does not exists')

        surveyUser.value = Number(value)
        await surveysUsersRepository.save(surveyUser)

        return res.json(surveyUser)

    }

}


export { AnswerController }