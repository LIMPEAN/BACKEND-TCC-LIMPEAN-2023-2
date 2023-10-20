import { UpdateService } from "../interface/updateService"

const validateTypesJson = (data: UpdateService) => {
    let status = true

    if(typeof data.idService !== "number" || typeof data.newValue !== "string"){
        status = false
    }

    return status
}

const validateValueMonetary = (value: string) => {
   
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
  
    if (regexValor.test(value)) {
     
      const valorNumerico = parseFloat(value.replace(/,/g, '').replace(/\./, ''));
  
      if (valorNumerico > -1) {
        return true
      }
    }
  
    return false; // Valor monetário inválido
}

export{ 
    validateTypesJson,
    validateValueMonetary
}