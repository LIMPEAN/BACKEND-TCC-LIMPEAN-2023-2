import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbUpdateServiceDiarist = async function(idDiarist: number, idService: number, idStatus: number){
            
    try {

        let statusServiceClient


        const verifyDiaristAndService = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_diarista: idDiarist,
                id_servico: idService
            }
        })

        if(verifyDiaristAndService){

            const statusService = await prisma.tbl_status_servico.findMany({
                where: {
                    id_servico: idService
                }, select: {
                    id_status: true
                }
            })                        
            
            if(!statusService.some((it) => it.id_status === idStatus || it.id_status === 5)){
                await prisma.tbl_status_servico.create({
                    data: {
                        id_servico: idService,
                        id_status: idStatus,
                        data_hora: new Date()
                    }
                })
                                
                statusServiceClient = true
            }else{
                statusServiceClient = false
            }

            return statusServiceClient
        }else{
            if(idStatus !== 5 && idStatus !== 4 && idStatus !== 3){
                await prisma.tbl_diarista_servico.updateMany({
                    where: {
                        id_servico: idService
                    }, data: {
                        id_diarista: idDiarist
                    }
                })
    
                await prisma.tbl_status_servico.create({
                    data: {
                        id_servico: idService,
                        id_status: idStatus,
                        data_hora: new Date()
                    }
                })
                
                statusServiceClient = true
            }else{
                
                statusServiceClient = false
            }

            return statusServiceClient
        }
    } catch (error) {        
        return false
    }
}


export {
    dbUpdateServiceDiarist
}