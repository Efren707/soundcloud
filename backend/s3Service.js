import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

export const s3UploadProfilePicture = async (file, fileKey) => {
    const s3client = new S3Client();
    
    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `profilePicture/${fileKey}`,
        Body: file.buffer
    }

    return s3client.send(new PutObjectCommand(param))    
}

export const s3UploadSong = async (files, songKey, pictureKey) => {
    const s3client = new S3Client();

    const mp3File = files.mp3URL[0];
    const pictureFile = files.imageURL[0];

    const mp3Param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `songMP3/${songKey}`,
        Body: mp3File.buffer
    }

    const pictureParam = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `songPicture/${pictureKey}`,
        Body: pictureFile.buffer
    }

    const mp3Result = s3client.send(new PutObjectCommand(mp3Param));
    const pictureResult = s3client.send(new PutObjectCommand(pictureParam));

    return mp3Result && pictureResult;
}

