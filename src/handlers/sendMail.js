import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log('Record processing', record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: 'lucas.barros@sistemasgap.com.br',
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
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


