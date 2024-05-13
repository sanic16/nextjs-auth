import { Lucia } from "lucia";
import { adapter } from "./prisma";
import { cookies } from "next/headers";
import { cache } from "react";

interface DatabaseUserAttributes {
    name: string;
    username: string;
    email: string;
}

declare module "lucia" {
    interface Register {
        Lucia: typeof Lucia;
        UserId: number;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

const lucia = new Lucia(adapter,
    {
        sessionCookie: {
            expires: false,
            attributes: {
                secure: process.env.NODE_ENV === 'production',
            }
        },
        getUserAttributes: (attributes) => {
            return {
                name: attributes.name,
                username: attributes.username,
                email: attributes.email
            }
        }
    }
)

const createAuthSession = async(userId: number) => {
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

const verifyAuth = async() => {
    const sessionCookie = cookies().get(lucia.sessionCookieName)

    if(!sessionCookie){
        return {
            user: null,
            session: null
        }
    }

    const sessionId = sessionCookie.value

    if(!sessionId){
        return {
            user: null,
            session: null
        }
    }

    const result = await lucia.validateSession(sessionId)

    try {
        if(result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id)
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
        if(!result.session){
            const sessionCookie = lucia.createBlankSessionCookie()
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes
            )
        }
    } catch {}

    return result
}

const destroyAuthSession = async() => {
    const { session } = await verifyAuth()
    if(!session){
        return {
            error: 'No session found'
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )
}

export {
    lucia,
    createAuthSession,
    verifyAuth,
    destroyAuthSession,
}