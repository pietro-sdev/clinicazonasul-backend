import { cloudinary } from '../lib/cloudinary'
import { UserRepository } from '../repository/user-repository'
import type { UploadApiResponse } from 'cloudinary'

export const UserPhotoService = {
  async changePhoto(userId: string, file: Buffer) {
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) =>
      cloudinary.uploader.upload_stream(
        {
          folder: 'vet-system',
          resource_type: 'image',
          public_id: userId,            
          overwrite: true,
          transformation: [{ width: 300, height: 300, crop: 'thumb', gravity: 'face' }],
        },
        (err, res) => {
          if (err || !res) return reject(err ?? new Error('Upload failed'))
          resolve(res)
        },
      ).end(file),
    )

    return UserRepository.updateProfilePhoto(userId, uploadResult.secure_url)
  },
}
