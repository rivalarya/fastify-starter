import { FastifyRequest, FastifyReply } from 'fastify'
import { User, IUser } from '../../models/User'
import { IRegisterBody, ILoginBody } from './routesSchema'
import IStandarResponse from '../standarResponse'
import InvariantError from '../../exceptions/InvariantError'
import AuthenticationError from '../../exceptions/AuthenticationError'
import { Types } from 'mongoose'

export async function register(
  request: FastifyRequest<{ Body: IRegisterBody }>,
  reply: FastifyReply
) {
  const { email, password, name } = request.body

  // Check if user already exists
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new InvariantError('Email already registered')
  }

  // Create new user
  const user = new User({
    email,
    password,
    name
  })
  await user.save()

  const token = await reply.jwtSign({
    id: user._id.toString(),
    email: user.email
  })

  const response: IStandarResponse = {
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  }

  reply.code(201).send(response)
}

export async function login(
  request: FastifyRequest<{ Body: ILoginBody }>,
  reply: FastifyReply
) {
  const { email, password } = request.body

  // Find user
  const user = await User.findOne({ email })
  if (!user) {
    throw new AuthenticationError('Invalid email or password')
  }

  // Verify password
  const isValid = await user.comparePassword(password)
  if (!isValid) {
    throw new AuthenticationError('Invalid email or password')
  }
  const token = await reply.jwtSign({
    id: user._id.toString(),
    email: user.email
  })

  const response: IStandarResponse = {
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  }

  reply.send(response)
}

export async function me(
  request: FastifyRequest<{
    Headers: { authorization: string }
  }>,
  reply: FastifyReply
) {
  const user = await User.findById(request.user.id).select('-password')

  if (!user) {
    throw new AuthenticationError('User not found')
  }

  const response: IStandarResponse = {
    message: 'User profile retrieved successfully',
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    }
  }

  reply.send(response)
}
