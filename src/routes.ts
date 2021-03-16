import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveysController'
import { SendMailController } from './controllers/SendMailController'
import { AnswerController } from './controllers/AnswerController'
import { NPSController } from './controllers/NPSController'

const routes = Router()

const userController = new UserController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NPSController()

routes.get('/user', userController.show)
routes.post('/user', userController.create)
routes.delete('/user', userController.delete)

routes.get('/surveys', surveysController.show)
routes.post('/surveys', surveysController.create)
routes.delete('/surveys', surveysController.delete)

routes.post('/sendMail', sendMailController.execute)

routes.get('/answers/:value', answerController.execute)

routes.get('/nps/:survey_id', npsController.execute)


export { routes }
