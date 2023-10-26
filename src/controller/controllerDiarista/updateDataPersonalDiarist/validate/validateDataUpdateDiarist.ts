import { validatePhoneWithDDD } from "../../registerDiarista/validate/validateRegister"

interface UpdateDataDiarist {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
    averagePrice: string | null;
    phones: {
        ddd: string | null;
        phone: string | null;
        newDDD: string | null;
        newPhone: string | null;
    }[];
    address: {
        state: number | null;              // Estado
        city: string | null;               // Cidade
        cep: string | null;                // CEP
        publicPlace: string | null;        // Logradouro
        complement: string | null;         // Complemento
        district: string | null;           // Bairro
        houseNumber: string | null;        // Numero da casa
    };
}

interface TokenPayLoad {
    id: string,
    name: string
}

function isURL(url: string) {
    // Expressão regular para verificar URLs
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

const checkDataDiarist =  async function (data: UpdateDataDiarist, token: TokenPayLoad){
    let status = true;    

    if (
        data.name === null && data.biography === null && data.idGender === null &&
        data.phones.every(phone => phone.ddd === null && phone.phone === null && phone.newDDD === null && phone.newPhone === null) &&
        data.password === null && data.photoUser === null && data.averagePrice === null && data.address.state === null && data.address.city === null && data.address.cep === null &&
        data.address.publicPlace === null && data.address.complement === null && data.address.district === null && data.address.houseNumber === null) {
        status = false;        
    }

    if (data.name !== null && (typeof data.name !== "string" || data.name.length < 2)) {
        status = false;
    }

    if (data.idGender !== null && (typeof data.idGender !== "number" || data.idGender > 3 || data.idGender < 1)) {
        status = false;
    }

    if (data.phones.some(phone => typeof phone.phone === "string" || typeof phone.ddd === "string" || typeof phone.newPhone === "string" || typeof phone.newDDD === "string")) {

        if (data.phones.some(phone => !validatePhoneWithDDD(phone.ddd, phone.phone))) {                
            status = false
        }

        if (data.phones.some(phone => !validatePhoneWithDDD(phone.newDDD, phone.newPhone))) {
            status = false
        }

        // for (const phone of data.phones) {
        //     if (!(await verifyPhoneDiarist(token, phone.ddd, phone.phone, phone.newDDD, phone.newPhone))) {
        //         status = false;                
        //         break; // Para a iteração se encontrar um erro
        //     }
        // }        
        
    }

    if (data.password !== null && (typeof data.password !== "string" || data.password.length < 6)) {
        status = false;
    }

    if (data.photoUser !== null && !isURL(data.photoUser)) {
        status = false;
    }  
    
    if(data.address.state !== null && (typeof data.address.state !== "number" || data.address.state < 1 || data.address.state > 27)){
        status = false
    }

    if(data.address.city !== null && (typeof data.address.city !== "string")){
        status = false
    }

    if(data.address.cep !== null && (typeof data.address.cep !== "string" || data.address.cep.length > 10)){
        status = false
    }

    if(data.address.publicPlace !== null && (typeof data.address.publicPlace !== "string")){        
        status = false
    }

    if(data.address.complement !== null && (typeof data.address.complement !== "string")){
        status = false
    }

    if(data.address.district !== null && (typeof data.address.district !== "string")){
        status = false
    }

    if(data.address.houseNumber !== null && (typeof data.address.houseNumber !== "string")){
        status = false
    }
    
    return status
}

export {
    checkDataDiarist
}