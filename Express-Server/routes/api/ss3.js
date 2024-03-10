const aws = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const {promisify} = require("util");
const randomBytes = promisify(crypto.randomBytes);

dotenv.config();

const region = "us-east-2";
const bucketName = "inventory-image-upload-s3-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

 async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = {
  generateUploadURL
}

// const AWS = require("aws-sdk");
// const dotenv = require("dotenv");
// const crypto = require("crypto");
// const promisify = require("util");
// const fs = require("fs");

// const randomBytes = promisify(crypto.randomBytes);

// // dotenv.load();
// dotenv.config();

// // Set the region and access keys
// AWS.config.update({
//   region: "us-east-2",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// // Create a new instance of the S3 class
// const s3 = new AWS.S3();

// // Set the parameters for the file you want to upload
// // const params = {
// //   Bucket: "inventory-image-upload-s3-bucket",
// //   Key: "myFile.txt",
// //   Body: fs.createReadStream("path/to/myFile.txt"),
// // };

// // Upload the file to S3
// s3.generateUploadURL(params, (err, data) => {
//   if (err) {
//     console.log("Error uploading file:", err);
//   } else {
//     console.log("File uploaded successfully. File location:", data.Location);
//   }
// });
