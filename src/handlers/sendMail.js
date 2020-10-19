import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendMail(event, context) {
  const params = {
    Source: 'lucas.barros@sistemasgap.com.br',
    Destination: {
      ToAddresses: ['lucas.barros@sistemasgap.com.br'],
    },
    Message: {
      Body: {
        Text: {
          Data: 'Hello from Amazon Tests :D',
        },
      },
      Subject: {
        Data: 'Test Mail',
      }
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    return result;
  } catch(error) {
    console.log('Error', error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Im sending something' }),
  };
}

export const handler = sendMail;


