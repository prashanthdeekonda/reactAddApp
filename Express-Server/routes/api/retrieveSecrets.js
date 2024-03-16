// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html

const AWS = require("aws-sdk");

module.exports = () => {
  //configure AWS SDK
  const region = "us-east-2";

  const SecretId = "prod/myapp/secrets";

  AWS.config.update({
    region: region,
    endpoint: "http://ec2-54-197-133-245.compute-1.amazonaws.com:3000/",
  });

  const client = new AWS.SecretsManager({
    region,
    endpoint: "http://54.197.133.245:5000/",
	accessKeyId: "AKIATQRG6BLG6JS3CJA4",
	secretAccessKey: "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"
  });

  return new Promise((resolve, reject) => {
    //retrieving secrets from secrets manager
    client.getSecretValue({ SecretId }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        //parsing the fetched data into JSON
        const secretsJSON = JSON.parse(data.SecretString);

        // creating a string to store write to .env file
        // .env file shall look like this :
        // SECRET_1 = sample_secret_1
        // SECRET_2 = sample_secret_2
        let secretsString = "";
        Object.keys(secretsJSON).forEach((key) => {
          secretsString += `${key}=${secretsJSON[key]}\n`;
        });
        resolve(secretsString);
      }
    });
  });
};

// import {
//   SecretsManagerClient,
//   GetSecretValueCommand,
// } from "@aws-sdk/client-secrets-manager";

// const secret_name = "prod/app/secrets";

// const client = new SecretsManagerClient({
//   region: "us-east-2",
// });

// let response;

// try {
//   response = await client.send(
//     new GetSecretValueCommand({
//       SecretId: secret_name,
//       VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
//     })
//   );
// } catch (error) {
//   // For a list of exceptions thrown, see
//   // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
//   throw error;
// }

// const secret = response.SecretString;

// // Your code goes here
