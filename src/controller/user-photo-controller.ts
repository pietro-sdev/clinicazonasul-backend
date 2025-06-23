import { FastifyRequest, FastifyReply } from 'fastify'
import type { MultipartFile } from '@fastify/multipart'
import jwt from 'jsonwebtoken'
import { UserPhotoService } from '../service/user-photo-service.js'

export const UserPhotoController = {
  async upload(req: FastifyRequest, reply: FastifyReply) {
    const token = req.cookies.token
    if (!token) return reply.code(401).send({ message: 'Unauthorized' })

    let payload: { id: string }
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    } catch {
      return reply.code(401).send({ message: 'Invalid token' })
    }

    const mpFile = (await req.file()) as MultipartFile | undefined
    if (!mpFile) return reply.code(400).send({ message: 'Arquivo obrigatório' })

    const buffer = await mpFile.toBuffer()

    try {
      const user = await UserPhotoService.changePhoto(payload.id, buffer)
      return reply.send({ profilePhoto: user.profilePhoto })
    } catch (err: any) {
      req.log.error(err)
      return reply.code(500).send({ message: 'Erro interno ao trocar foto' })
    }
  },
}
