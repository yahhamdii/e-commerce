const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {}
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    products(parent, args, { prisma }, info) {
        return prisma.query.products(null, info)
    },
    product(parent, args,  { prisma }, info) {
        return prisma.query.product({
            where: {
                id: args.where.id
            }
        }, info)
    },
    orders(parent, args, { prisma }, info) {
        return prisma.query.orders(null, info)
    },
    cartes(parent, args, { prisma }, info) {
        return prisma.query.cartes({
            where: {
                commande: args.where.commande
            }
        }, info)
    },
}

export { Query as default }