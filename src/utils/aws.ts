import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const bucketName = process.env.BUCKET
const accessKeyId = process.env.KEY_ID
const secretAccessKey = process.env.ACCESS_KEY
const region = process.env.REGION

if(!bucketName || !accessKeyId || !secretAccessKey || !region){
    throw new Error('AWS S3 config is missing')
}

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})

const uploadObject = (fileBuffer: Buffer, fileName: string, mimetype: string) => {
    const uploadParams = {
        Bucket: bucketName,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype 
    }

    return s3.send(new PutObjectCommand(uploadParams))
}

const deleteObject = (fileName: string) => {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName
    }

    return s3.send(new DeleteObjectCommand(deleteParams))
}

export {
    uploadObject,
    deleteObject
}