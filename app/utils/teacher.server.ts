import { prisma as db } from './prisma.server'

export const getAllLessonsByTeacherId = async (teacherId: string) => {
    return await db.lesson.findMany({
        where: {
            teacherId
        }
    })
  }

  export const createLessonByTeacher = async (teacherId: string, name: string, time: string, location: string) => {
    console.log(teacherId, name, time, location)
    return await db.lesson.create({
        data: {
            name,
            time,
            location,
            teacher: {
                connect: {
                    id: teacherId
                }
            }
        },
    })
  }