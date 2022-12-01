import Hapi from '@hapi/hapi'
import * as nodemailer from 'nodemailer'; 

// Module augmentation to add shared application state
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33809#issuecomment-472103564
declare module '@hapi/hapi' {
  interface ServerApplicationState {
    sendEmailToken(email: string, token: string): Promise<void>
  }
}

const emailPlugin = {
  name: 'app/email',
  register: async function(server: Hapi.Server) {
    if(process.env.NODE_ENV === 'production')
      server.app.sendEmailToken = sendEmailToken
    else if (process.env.MAILTRAP_API_USER&&process.env.MAILTRAP_API_PASS) 
      server.app.sendEmailToken = sendMailTrapEmailToken
    else {
      console.log(
          `The email env var must be set, otherwise the API won't be able to send emails.`,
          `Using debug mode which logs the email tokens instead.`,
        )
        server.app.sendEmailToken = debugSendEmailToken
    }
  },
}

export default emailPlugin

async function sendMailTrapEmailToken(email: string, token: string) {

    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_API_USER,
          pass: process.env.MAILTRAP_API_PASS
        }
      });

    var mailOptions = { 
    from : 'juansmacias@gmail.com', 
    to : email, 
    subject : 'Codigo de Primo navideño', 
    text: `Codigo para ingresar al app de primo navideño: ${token}`
    }; 

    await transport.sendMail( mailOptions, (error, info) => { 
        if (error) { 
            return console.log(`error: ${error}`)
        } 
    }); 
  
}

async function sendEmailToken(email: string, token: string) {

  var transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_EMAIL_PASS,
      },
    });

  var mailOptions = { 
  from : 'juansmacias@gmail.com', 
  to : email, 
  subject : 'Codigo de Primo navideño', 
  text: `Codigo para ingresar al app d primo navideño: ${token}`
  }; 

  await transport.sendMail( mailOptions, (error, info) => { 
      if (error) { 
          return console.log(`error: ${error}`)
      } 
  }); 

}

async function debugSendEmailToken(email: string, token: string) {
  console.log(`email token for ${email}: ${token} `)
}