'use server'
import { redirect } from "next/navigation"
import { createUser, getUserByEmail } from "@/utils/db_auth"
import { createAuthSession, destroyAuthSession } from "@/utils/auth"

type ValidationErrors = {
    email?: string
    username?: string
    name?: string
    password?: string
}

const signupAction = async(prevState: {errors: ValidationErrors}, formData: FormData) => {
    const name = formData.get('name') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    console.log(name, username, email, password)
    
    const errors: ValidationErrors = {}

    if(!name || name.trim().length === 0){
        errors.name = 'El campo nombre es requerido'
    }
    if(!username || username.trim().length === 0){
        errors.username = 'El campo nombre de usuario es requerido'
    }
    if(!email || email.trim().length === 0){
        errors.email = 'El campo correo electrónico es requerido'
    }
    if(!password || password.trim().length === 0){
        errors.password = 'El campo contraseña es requerido'
    }
    if(!email.includes('@')){
        errors.email = 'El correo electrónico debe ser válido'
    }

    if(Object.keys(errors).length > 0){
        return {errors}
    }

    const existingUser = await getUserByEmail(email)
    if(existingUser){
        errors.email = 'El correo electrónico ya está registrado'
        return {errors}
    } 
    let user
    try {
        user = await createUser({
            name,
            username,
            email,
            password
        })

    } catch (error: unknown) {
        if(error instanceof Error){
            errors.email = 'No se pudo registrar el usuario'
            console.error(error.message)
            return {errors}
        }
    }

    console.log(errors)
    if(user){
        redirect('/news')
    }else{
        errors.email = 'No se pudo registrar el usuario'
        return {errors}   
    }
}

const login = async(prevState: {message: string}, formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const user = await getUserByEmail(email)

    if(!user){
        return {
            message: 'Usuario no encontrado'
        }
    }

    if(user.password !== password){
        return {
            message: 'Contraseña incorrecta'
        }
    }

    try {
        await createAuthSession(user.id)
    } catch (error: unknown) {
        console.error(error)
        if(error instanceof Error){
            return {
                message: 'No se pudo iniciar sesión'
            }
        }
    }

    if(user){
        redirect('/news')
    }else{
        return {
            message: 'No se pudo iniciar sesión'
        }
    }
}

const logout = async() => {
    console.log('logout')
    try {
        await destroyAuthSession()
    } catch (error: unknown) {
        console.error(error)
        
    }
    redirect('/auth?mode=login')
} 

export { signupAction, login, logout }