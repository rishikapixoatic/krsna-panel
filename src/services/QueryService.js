import AWS from 'aws-sdk';

const BASE_URL = 'https://api.krishnaphotography.net/v1';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_AWS_REGION'
});

const dynamodb = new AWS.DynamoDB();

const ses = new AWS.SES();

const queryService = {
  getQueries: async () => {
    try {
      const params = {
        TableName: 'YOUR_DYNAMODB_TABLE_NAME'
      };
      const data = await dynamodb.scan(params).promise();
      const queries = data.Items.map(item => AWS.DynamoDB.Converter.unmarshall(item));
      return { success: true, queries };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteQuery: async (queryId) => {
    try {
      const params = {
        TableName: 'YOUR_DYNAMODB_TABLE_NAME',
        Key: {
          'queryId': { S: queryId }
        }
      };
      await dynamodb.deleteItem(params).promise();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  sendQuery: async (subject, message) => {
    try {
      const params = {
        Destination: {
          ToAddresses: ['recipient@example.com']
        },
        Message: {
          Body: {
            Text: {
              Data: message
            }
          },
          Subject: {
            Data: subject
          }
        },
        Source: 'sender@example.com'
      };

      await ses.sendEmail(params).promise();

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export const sendQuery = queryService.sendQuery;

export const getQueries = queryService.getQueries;

export const getUserQueries  = async (accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/getContactUsMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return error
  }
};

export const postUserQueriesReply  = async (res, accessToken) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/replyContactUsMessage`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(res),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return error
  }
};
export default queryService;
