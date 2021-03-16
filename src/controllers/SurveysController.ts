import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'


class SurveysController{

    async show(req: Req, res: Res){

        const surveysRepository = getCustomRepository(SurveysRepository)
        const content = await surveysRepository.find()

        return res.json(content)

    }

    async create(req: Req, res: Res){

        const { title, description } = req.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = surveysRepository.create({ title, description })
        await surveysRepository.save(survey)

        return res.status(201).json(survey)

    }

    async delete(req: Req, res: Res){

        const { title } = req.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        const surveyDeleted = surveysRepository.delete({ title })

        return res.json(surveyDeleted)

    }

}

export { SurveysController }
