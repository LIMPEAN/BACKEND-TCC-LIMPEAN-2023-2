import { RegisterTransaction } from "../interface/transaction"

const validateTypesJson = (data: RegisterTransaction) => {

    let statusValidate = true
    if(
        typeof data.serviceId !== "number" || 
        typeof data.value     !== "string" || 
        typeof data.receipt   !== "string" || 
        typeof data.typeTransactionId !== "number"){
            statusValidate = false
        }

        return statusValidate
}

export {
    validateTypesJson
}