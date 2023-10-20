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

function validateHour(hour: string) {
  
  const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (regexHora.test(hour)) {      
    return true
  } else {
    return false
  }
}

const validateDate = (date: string) => {

  let status = true

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/    

  const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/

  if (!date.match(dateRegex) && !date.match(dateRegexBar)) {
      return false
  }
  return status
}

export{ 
    validateTypesJson,
    validateValueMonetary,
    validateDate,
    validateHour
}