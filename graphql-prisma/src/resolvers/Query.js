const Query = {
    users(parent, args, { prisma }, info) {
         return prisma.query.users(null, info)
    },
    categories(parent, args, { prisma }, info) {
        return prisma.query.categories(null, info)
   },
   products(parent, args, { prisma }, info) {
    return prisma.query.products(null, info)
},
}

export { Query as default }