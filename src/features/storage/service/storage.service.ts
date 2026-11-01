import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/shared/lib/s3";
import { PresignUploadInput } from "../validator/storage.schema";

export const StorageService = {
  async createPresignedUpload(data: PresignUploadInput) {
    const safeFileName = data.fileName.replace(/[^a-zA-Z0-9._-]/g, "-");
    const key = `${data.entity}/${crypto.randomUUID()}-${safeFileName}`;
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: key,
      ContentType: data.fileType,
      ContentLength: data.fileSize,
    });

    const uploadUrl = await getSignedUrl(s3 as never, command, {
      expiresIn: 60,
    });

    const baseUrl = (
      process.env.AWS_PUBLIC_URL ||
      `${process.env.AWS_ENDPOINT_URL_S3}/${process.env.S3_BUCKET}`
    ).replace(/\/+$/, "");

    return {
      uploadUrl,
      publicUrl: `${baseUrl}/${key}`,
      key,
    };
  },
};
