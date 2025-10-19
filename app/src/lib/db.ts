import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const createWorkspace = async (userid: string,url:string,contanerId:string,id:string) => {
  const respons = await prisma.workspace.create({
    data: {
     id: id,
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
