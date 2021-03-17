import { Request as Req, Response as Res } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'
import * as yup from 'yup'


class SurveysController{

    async show(req: Req, res: Res){

        const surveysRepository = getCustomRepository(SurveysRepository)
        const content = await surveysRepository.find()

        return res.json(content)

    }

    async create(req: Req, res: Res){

        const { title, description } = req.body

        const schema = yup.object().shape({
            title: yup.string().required(),
            description: yup.string().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }

        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = surveysRepository.create({ title, description })
        await surveysRepository.save(survey)

        return res.status(201).json(survey)

    }

    async delete(req: Req, res: Res){

        const { title } = req.body

        const schema = yup.object().shape({
            title: yup.string().required()
        })

        try{
            await schema.validate(req.body, { abortEarly: true })
        } catch(err) {
            return res.status(400).json({ error: err })
        }

        const surveysRepository = getCustomRepository(SurveysRepository)

        const surveyDeleted = surveysRepository.delete({ title })

        return res.json(surveyDeleted)

    }

}

export { SurveysController }
