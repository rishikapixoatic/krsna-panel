import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'YOUR_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
  region: 'YOUR_AWS_REGION'
});

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const userService = {
  getUsers: async () => {
    try {
      const params = {
        UserPoolId: 'YOUR_USER_POOL_ID',
        AttributesToGet: [
          'username', 'email',
        ]
      };
      const data = await cognitoIdentityServiceProvider.listUsers(params).promise();
      const users = data.Users.map(user => ({
        username: user.Username,
        email: user.Attributes.find(attr => attr.Name === 'email').Value,
      }));
      return { success: true, users };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getWeddings: async () => {
    try {
      const params = {
        TableName: 'Weddings',
      };

      const data = await dynamoDB.scan(params).promise();
      const weddings = data.Items.map(item => ({
        id: item.id,
        groomName: item.groomName,
        brideName: item.brideName,
        location: item.location,
        userId: item.userId,
      }));

      return { success: true, weddings };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteUser: async (username) => {
    try {
      const params = {
        UserPoolId: 'YOUR_USER_POOL_ID',
        Username: username
      };
      await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};

export default userService;
