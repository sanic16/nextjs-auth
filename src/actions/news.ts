'use server'

import { createNews } from "@/utils/db";
import { v4 as uuid } from 'uuid'
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { uploadObject } from "@/utils/aws";

const createNewsAction = async(prevState: {errors: string[]}, formData: FormData) => {
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const image = formData.get('image') as File
    const date = formData.get('date') as string

    if(!title || !content || !date || image.size === 0){
        return {errors: ['All fields are required']}
    }

    let errors: string[] = []

    if(title.trim().length < 3){
        errors.push('Title must be at least 3 characters')
    }

    if(content.trim().length < 10){
        errors.push('Content must be at least 10 characters')
    }

    if(errors.length > 0){
        return {errors}
    }

    const fileBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(fileBuffer)

    const imageKey = `public/${uuid()}-${image.name}`
    const uploadImage = await uploadObject(buffer, imageKey, image.type)

    if(!uploadImage){
        errors.push('Failed to upload image')
        return {errors}
    }

    const url = `https://python-bucket-gt.s3.amazonaws.com/${imageKey}`

    const newNews = await createNews({
        title,
        content,
        image: url,
        date: new Date(date).toISOString(),
        slug: uuid()
    })

    if(!newNews){
        errors.push('Failed to create news')
        return {errors}
    }else{
        revalidatePath('/news')
        redirect('/news')
    }
}

export {
    createNewsAction
}