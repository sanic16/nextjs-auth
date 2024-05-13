import prisma from "./prisma"

type WriterUser = {
  email: string    
  username: string
  name: string
  password: string
}


// ################################## USER OPERATIONS ##################################
const getUsers = async() => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            name: true
        }
    })

    return users
} 

const getUser = async(id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return user
}


const getUserByEmail = async(email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        },
        select: {
            id: true,
            email: true,
            username: true,
            name: true,
            password: true
        }
    })
    return user
}

const createUser = async(user: WriterUser) => {
    const createUser = await prisma.user.create({
        data: user,
        select: {
            id: true,
            email: true,
            username: true,
            name: true
        }
    })

    return createUser
}

export {
    getUsers,
    getUser,
    getUserByEmail,
    createUser
}