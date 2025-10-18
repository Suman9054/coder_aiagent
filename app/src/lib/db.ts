import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createWorkspace = async (userid: string,url:string,contanerId:string) => {
  const respons = await prisma.workspace.create({
    data: {
     id: crypto.randomUUID(),
     userId: userid,
     contanerId:contanerId,
     PreviewLink: url
    }
  })
 return respons; 
}

export const getWorkspacesByUserId = async (userid: string) => {
    const respons = await prisma.workspace.findMany({
        where: {
            userId: userid
        }
    })
   return respons; 
  }
