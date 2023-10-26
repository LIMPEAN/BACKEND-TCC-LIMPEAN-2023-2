import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface TokenPayLoad {
    id: string,
    name: string
}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}


// const verifyPhoneDiarist = async function(token: TokenPayLoad, oldDDD: any, oldPhone: any, newDDD: any , newPhone: any){
//     try {
//         const verifyDiarist = await prisma.tbl_diarista.findFirst({
//             where: {
//                 AND: [
//                     { email: token.name.toLowerCase() },
//                     { id: Number(token.id) }
//                 ]
//             }
//         })        

//         if (verifyDiarist) {             
//            const tbl_telefone_diarista = await prisma.tbl_telefone_diarista.findFirst({
//                     where: {
//                         id_diarista: verifyDiarist.id,
//                         ddd: oldDDD,
//                         numero_telefone: oldPhone
//                     }
//                 }) 
                
//                 const tbl_telefone_diarista_new = await prisma.tbl_telefone_diarista.findFirst({
//                     where: {
//                         id_diarista: verifyDiarist.id,
//                         ddd: newDDD,
//                         numero_telefone: newPhone
//                     }
//                 })                
//                 if(tbl_telefone_diarista && tbl_telefone_diarista_new === null){                                                                                
//                     return true
//                 }else{                                        
//                     return false
//                 }
//         } else {            
//             return false
//         }
//     } catch (error) {                        
//         return false
//     } finally {
//         await prisma.$disconnect()
//     }
// }

const updateDataSimpleDiarist = async function (token: TokenPayLoad, data: any) {

    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })

        if (verifyDiarist) {

            //Se data for diferente de null ou undefined eu atualizo senão mantenho as informações
            // const updateData = {
            //     nome: data.name ?? verifyDiarist.nome,
            //     biografia: data.biography ?? verifyDiarist.biografia,
            //     id_genero: data.idGender ?? verifyDiarist.id_genero,
            //     senha: data.password ?? verifyDiarist.senha,
            //     foto_perfil: data.photoUser ?? verifyDiarist.foto_perfil,
            // }                            
                // Atualize os dados do diarista
                await prisma.tbl_diarista.update({
                    where: {
                        id: verifyDiarist.id
                    },
                    data: data
                })
            
            return true
        } else {
            return false
        }
    } catch (error) {        
        return false
    } finally {
        await prisma.$disconnect()
    }
}

const updateDataPhone = async function (token: TokenPayLoad, data: any) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })        
        
        if (verifyDiarist) { 
                        
           const tbl_telefone_diarista = await prisma.tbl_telefone_diarista.update({
                    where: {
                        id_diarista: verifyDiarist.id,
                        numero_telefone: data.oldPhone
                    },
                    data: {
                        numero_telefone: data.numero_telefone,
                        ddd: data.ddd
                    }
                })                                
                    
                if(tbl_telefone_diarista){
                    return true
                }else{
                    return false
                }
        } else {            
            return false
        }
    } catch (error) {                                        
        return false
    } finally {
        await prisma.$disconnect()
    }
}

const updateDataAddressDiarist = async function (token: TokenPayLoad, data: any) {
    try {
        
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            },
            include: {
                FK_Endereco_Diarista: true,
            }
        })
        
        let tbl_endereco
        let statusUpdated = false
        if(verifyDiarist){
            if (!isObjectEmpty(data.tbl_endereco)) {
                tbl_endereco = await prisma.tbl_endereco.update({
                    where: {
                        id: verifyDiarist.FK_Endereco_Diarista.id,
                    },
                    data: data.tbl_endereco,
                });
                if (tbl_endereco) {
                    statusUpdated = true;
                }
            }

            if (!isObjectEmpty(data.tbl_cidade)) {
                
                tbl_endereco = await prisma.tbl_endereco.findFirst({
                    where: {
                        id: verifyDiarist.FK_Endereco_Diarista.id,
                    }
                })

                if (tbl_endereco) {
                    await prisma.tbl_cidade.update({
                        where: {
                            id: tbl_endereco.id,
                        },
                        data: data.tbl_cidade,
                    });

                    statusUpdated = true;
                }
            
            }

            return statusUpdated
            
        }else{
            return false
        }
    } catch (error) {
        return false
    } finally{
        await prisma.$disconnect()
    }
}


export {
    updateDataSimpleDiarist,
    updateDataPhone,
    updateDataAddressDiarist
}