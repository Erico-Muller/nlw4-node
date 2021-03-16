import { Request as Req, Response as Res } from 'express'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import { getCustomRepository, Not, IsNull } from 'typeorm'


class NPSController{

    async execute(req: Req, res: Res){

        const { survey_id } = req.params

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveysUsers = await surveysUsersRepository.find({ survey_id, value: Not(IsNull()) })

        const detr = surveysUsers.filter(survey => survey.value >= 0 && survey.value <= 6).length
        const prom = surveysUsers.filter(survey => survey.value == 9 || survey.value == 10).length
        const pass = surveysUsers.filter(survey => survey.value == 7 || survey.value == 8).length
        const total = surveysUsers.length

        const calc = Number(((prom - detr) / total * 100).toFixed(2))

        return res.json({
            NPS: calc,
            detractors: detr,
            promotors: prom,
            passives: pass,
            total
        })

    }

}


export { NPSController }