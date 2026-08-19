import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'gksfzjxf',
  api_key: process.env.CLOUDINARY_API_KEY || '659211597593824',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'mOEj9H8QBBMNkdif3M8UMiPtrzY',
});

export const generateSignature = (paramsToSign: Record<string, any>) => {
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'mOEj9H8QBBMNkdif3M8UMiPtrzY';
  const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);
  return signature;
};

export default cloudinary;
