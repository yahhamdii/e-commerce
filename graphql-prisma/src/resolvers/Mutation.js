import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import getUserId from '../utils/getUserId'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 4) {
            throw new Error('password must be 4 char or longer. ')
        }
        const password = await bcrypt.hash(args.data.password, 10)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        }, info)
        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }
    },
    async login(parent, args, { prisma }, info) {
        const user = await prisma.query.user({
            where: {
                email: args.data.email
            }
        })
        if (!user) {
            throw new Error(' Enable to login 1')
        }
        const ismatch = await bcrypt.compare(args.data.password, user.password)
        if (!ismatch) {
            throw new Error('unable to login')
        }
        return {
            user,
            token: jwt.sign({ userId: user.id }, 'thisisasecret')
        }

    },
    async deleteUser(parent, args, { prisma }, info) {
        return prisma.mutation.deleteUser({
            where: {
                id: args.id
            }
        }, info)
    },
    async updateUser(parent, args, { prisma }, info) {
        return prisma.mutation.updateUser({
            where: {
                id: args.id
            },
            data: args.data
        }, info)
    },
    createOrder(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.mutation.createOrder({
            data: {
                status: args.data.status,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        }, info)
    },
}

export { Mutation as default }