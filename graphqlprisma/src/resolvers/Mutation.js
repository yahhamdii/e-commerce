import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const Mutation = {
    async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer.')
        }

        const password = await bcrypt.hash(args.data.password, 10)
        const user = await prisma.mutation.createUser({
            data: {
                ...args.data,
                password
            }
        })

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
            throw new Error('Unable to login')
        }

        const isMatch = await bcrypt.compare(args.data.password, user.password)

        if (!isMatch) {
            throw new Error('Unable to login')
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
                id: args.where.id
            },
            data: args.data
        }, info)
    },
    async createProduct(parent, args, { prisma }, info) {
        const product = await prisma.mutation.createProduct({
            data: {
                ...args.data
            }
        })

        return product
    },
    async createPhotoProduct(parent, args, { prisma }, info) {
        const imageproduct = await prisma.mutation.createPhotoProduct({
            data: {
                ...args.data
            }
        })

        return imageproduct
    },
    async createTarif(parent, args, { prisma }, info) {
        const tarifproduct = await prisma.mutation.createTarif({
            data: {
                ...args.data
            }
        })

        return tarifproduct
    },
    async createStock(parent, args, { prisma }, info) {
        const stockproduct = await prisma.mutation.createStock({
            data: {
                ...args.data
            }
        })

        return stockproduct
    },
    async createStatus(parent, args, { prisma }, info) {
        const status = await prisma.mutation.createStatus({
            data: {
                ...args.data
            }
        })

        return status
    },
    async createOrder(parent, args, { prisma }, info) {
        const order = await prisma.mutation.createOrder({
            data: {
                ...args.data
            }
        })

        return order
        
    },
    async createCarte(parent, args, { prisma }, info) {
        const carte = await prisma.mutation.createCarte({
            data: {
                ...args.data
            }
        })

        return carte
        
    },
    async updateCarte(parent, args, { prisma }, info) {
        const carte = await prisma.mutation.updateCarte({
            where: {
                id: args.where.id
            },
            data: args.data
        }, info)

        return carte;
        
    },
    async deleteCarte(parent, args, { prisma }, info) {
        return prisma.mutation.deleteCarte({
            where: {
                id: args.where.id
            }
        }, info)
    },
}

export { Mutation as default }