import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // create user
    const user = await prisma.user.create({
        data: {
        name: 'Woramet',
        email: 'ps.woramet@gmail.com',
        },
    })
    console.log(user)

    // get all user
    const users = await prisma.user.findMany()
    console.log(users);
    
    // create users and post
    const userPost = await prisma.user.create({
        data:{
            name: "game",
            email: "game@gmail.com",
            posts: {
                create:{
                    title: "hello prisma"
                }
            }
        }
    })
    console.log(userPost);

    // get post with user
    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    console.dir(usersWithPosts, {depth: null});
    
    //update user
    const updateUser = await prisma.user.update({
        where: {
            email: "game@gmail.com"
        },
        data: {
            name: "game updated"
        }
    })
    console.log(updateUser);
    
    //delete user
    const deleteUser = await prisma.user.delete({
        where: {
            id : 3
        }
    })
    console.log(deleteUser);

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })