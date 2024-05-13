import prisma from "./prisma"

type News = {
    slug: string
    title: string
    image: string
    date: string
    content: string
}

const createNews = async(news: News) => {
    const createNews = await prisma.news.create({
        data: news
    })


    return createNews
} 

const getNews = async() => {
    const news = await prisma.news.findMany({
        orderBy: {
            date: 'desc'
        }
    })

    await new Promise(resolve => setTimeout(resolve, 2000))
    return news
}

const getIndividualNews = async(slug: string) => {
    const news = await prisma.news.findUnique({
        where: {
            slug: slug
        }
    })

    return news
}

const getLatestNews = async(num: number) => {
    const news = await prisma.news.findMany({
        orderBy: {
            date: 'desc'
        },
        take: num
    })

    return news
}

const getAvailableNewsYears = async() => {
    const years = await prisma.$queryRaw`
        SELECT DISTINCT YEAR(date) as year FROM News ORDER BY year DESC
    ` as { year: number}[] 
    const availableYears: number[] = years.map((y: { year: number}) => y.year)  
    return availableYears 
}

const getAvailableNewsMonths = async(year: number) => {
    const months = await prisma.$queryRaw`
        SELECT DISTINCT MONTH(date) as month FROM News WHERE YEAR(date) = ${year} ORDER BY month DESC 
    ` as { month: number}[]
    const availableMonths: number[] = months.map((m: { month: number }) => m.month)
    return availableMonths
}

const getNewsForYear = async(year: number) => {
    const news = await prisma.news.findMany({
        where: {
            date: {
                gte: new Date(year, 0, 1),
                lt: new Date(year + 1, 0, 1)
            }
        }
    })

    await new Promise(resolve => setTimeout(resolve, 3000))

    return news
}

const getNewsForYearAndMonth = async(year: number, month: number) => {
    const news = await prisma.news.findMany({
        where: {
            date: {
                gte: new Date(year, month, 1),
                lt: new Date(year, month + 1, 1)
            }
        }
    })

    await new Promise(resolve => setTimeout(resolve, 3000))

    return news
}

const getNewsImages = async() => {
    const news = await prisma.news.findMany({
        select: {
            image: true
        }
    })

    return news
}

export {
    createNews, 
    getNews,
    getIndividualNews,
    getLatestNews,
    getAvailableNewsYears,
    getAvailableNewsMonths,
    getNewsForYear,
    getNewsForYearAndMonth,
    getNewsImages
}