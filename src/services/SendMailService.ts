import nodemailer, { Transporter } from 'nodemailer'
import handlebars from 'handlebars'
import fs from 'fs'
import * as yup from 'yup'


interface Params{
    to: string,
    subject: string,
    variables: object,
    path: string
}


class SendMailService{

    private client: Transporter

    constructor(){
        
        nodemailer.createTestAccount().then(account => {

            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }

            })

            this.client = transporter

        })
        
    }

    async execute(params: Params){

        const templateFileContent = fs.readFileSync(params.path).toString('utf-8')

        const mailTemplateParse = handlebars.compile(templateFileContent)
        const html = mailTemplateParse(params.variables)

        const message = await this.client.sendMail({
            params.to,
            params.subject,
            html,
            from: 'NPS <noreplay@nps.com.br>'
        })

        console.log('Message sent: %s', message.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))

    }

}


export default new SendMailService()