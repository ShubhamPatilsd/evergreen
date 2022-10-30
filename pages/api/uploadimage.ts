import S3 from "aws-sdk/clients/s3";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const s3 = new S3({
    signatureVersion: "v4",
    region: "us-west",
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

  const { file, fileType } = req.query;
  console.log(file, fileType);
  const fileParams = {
    Bucket: process.env.BUCKET_NAME,
    Key: file,
    Expires: 600,
    ContentType: fileType,
    ACL: "public-read",
  };

  const url = await s3.getSignedUrlPromise("putObject", fileParams);

  // const post = await s3.createPresignedPost({
  //   Bucket: process.env.BUCKET_NAME,
  //   Fields: {
  //     key: req.query.file,
  //     "Content-Type": req.query.fileType,
  //   },
  //   Expires: 60, // seconds
  //   Conditions: [
  //     ["content-length-range", 0, 1048576], // up to 1 MB
  //   ],
  // });
  // console.log(post);
  console.log(url);
  res.status(200).json({ url });
}
