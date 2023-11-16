1. install project https://www.prisma.io/docs/getting-started/quickstart
    
    npm init -y
    npm i prisma
    npm install typescript ts-node @types/node --save-dev 

2. สร้าง txconfig.json

    npx tsc --init

    -Then, install the Prisma CLI as a development dependency in the project:

    npm install prisma --save-dev

    -Finally, set up Prisma with the init command of the Prisma CLI:

    npx prisma init --datasource-provider sqlite

3. setting prisma

    // This is your Prisma schema file,
    // learn more about it in the docs: https://pris.ly/d/prisma-schema

    generator client {
        provider = "prisma-client-js"
    }

    datasource db {
        provider = "sqlite"
        url      = env("DATABASE_URL")
    }

    model User {
        id    Int     @id @default(autoincrement())
        email String  @unique
        name  String?
        posts Post[]
    }

    // author relation กับ User ด้วย fields: authorId โดยอ้างอิงจาก id ของ User
    model Post {
        id        Int     @id @default(autoincrement())
        title     String
        content   String?
        published Boolean @default(false)
        author    User    @relation(fields: [authorId], references: [id])
        authorId  Int
    }

4. Run a migration to create your database tables with Prisma Migrate

    npx prisma migrate dev --name init

5. สร้าง file prisma-tutorial -> script.ts

    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.create({
            data: {
            name: 'Woramet',
            email: 'ps.woramet@gmail.com',
            },
        })
        console.log(user)
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

6. run file script.ts
    
    npx ts-node script.ts

7. db จะถูกสร้างใน prisma -> dev.db

8. create user

    // create user
    const user = await prisma.user.create({
        data: {
        name: 'Woramet',
        email: 'ps.woramet@gmail.com',
        },
    })
    console.log(user)

9. create user and posts

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

10. get all user

    // get all user
    const users = await prisma.user.findMany()
    console.log(users);

11. get post with user

    // get post with user
    const usersWithPosts = await prisma.user.findMany({
        include: {
            posts: true
        }
    })
    console.dir(usersWithPosts, {depth: null});

12. update user

    // update user
    const updateUser = await prisma.user.update({
        where: {
            email: "game@gmail.com"
        },
        data: {
            name: "game updated"
        }
    })
    console.log(updateUser);

13. delete user

    // delete user
    const deleteUser = await prisma.user.delete({
        where: {
                id : 3
            }
    })
    console.log(deleteUser);