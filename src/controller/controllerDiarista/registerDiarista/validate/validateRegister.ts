
interface Diarista {
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    averagePrice: string,
    address: {
        state: number,              
        city: string,               
        cep: string,                
        publicPlace: string,        
        complement: string | null,  
        district: string,           
        houseNumber: string         
    }
}

function validateTypesJson(json: any): boolean {
    try {
        const diarista: Diarista = json;                

        // Validar se todas as propriedades estão presentes no JSON
        if (
            typeof diarista.email !== 'string' ||
            typeof diarista.password !== 'string' ||
            typeof diarista.nameUser !== 'string' ||
            typeof diarista.photoUser !== 'string' ||
            typeof diarista.phone !== 'string' ||
            typeof diarista.ddd !== 'string' ||
            typeof diarista.birthDate !== 'string' ||
            typeof diarista.idGender !== 'number' ||
            typeof diarista.cpf !== 'string' ||
            (typeof diarista.biography !== 'string' &&
            diarista.biography !== null) ||
            typeof diarista.averagePrice !== 'string' &&
            diarista.averagePrice !== null ||
            typeof diarista.address !== 'object' ||
            typeof diarista.address.state !== 'number' ||
            typeof diarista.address.city !== 'string' ||
            typeof diarista.address.cep !== 'string' ||
            (typeof diarista.address.publicPlace !== 'string' &&
            diarista.address.publicPlace !== null) ||
            typeof diarista.address.district !== 'string' ||
            (typeof diarista.address.complement !== 'string' &&
            diarista.address.complement !== null) ||
            typeof diarista.address.houseNumber !== 'string'
        ) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}


function validatePhoneWithDDD(ddd: string | any , phone: string | any) {

    if(typeof ddd !== "string" || typeof phone !== "string"){
        return false
    }
        
    let numberPhone = `${ddd} ${phone}`    

    //retira todos os caracteres menos os numeros
    let telefone = numberPhone.replace(/\D/g, '')

    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false;

    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;

    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        if (telefone == new Array(11).join() || telefone == new Array(12).join()) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;


    if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1) return false;

    //se passar por todas as validações acima, então está tudo certo
    return true;
}

function validateEmail(email:string) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateDateBirth(dataNascimento: string){

    let status = true

    //Data no formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/    

    //Data no formato YYYY/MM/DD
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/

    if (!dataNascimento.match(dateRegex) && !dataNascimento.match(dateRegexBar)) {
        status = false
    }
    return status
}

function validateCPF(cpf: string) {
    
    // Remove caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos do CPF são iguais (números repetidos)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação dos dígitos verificadores do CPF
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }

    return true;
}

interface Address{
    state: number,               // Estado
    city: string,                // Cidade
    cep: string,                 // CEP
    publicPlace: string,         // Logradouro
    district: string,            // Bairro
    complement: string | null,   // Complemento
    houseNumber: string          // Numero da casa
}

function validadeAddress(address: Address){        

    let statusAddress = true

    if(
           typeof address.state !== "number"|| address.state <= 0 || address.state > 27 ||
           !address.city         || address.city === ""              ||
           !address.cep          || address.cep === ""               || 
           !address.district     || address.district === ""          ||
           typeof address.houseNumber !== "string"                   ||
           typeof address.publicPlace !== "string"                   || 
           address.publicPlace === ""                                ||
           (address.complement !== null && typeof address.complement !== "string")
    ){
        statusAddress = false
    }

    return statusAddress
}

const validateValueMonetary = (data: Diarista) => {
    // Expressão regular para validar um valor monetário no formato "x,xxx.xx" ou "xx.xx"
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
  
    // Teste se o valor corresponde à expressão regular
    if (regexValor.test(data.averagePrice)) {
      // Remove vírgulas e pontos para verificar o valor real
      const valorNumerico = parseFloat(data.averagePrice.replace(/,/g, '').replace(/\./, ''));
  
      // Verifique se o valor numérico é maior que zero
      if (valorNumerico > -1) {
        return true; // Valor monetário válido
      }
    }
  
    return false; // Valor monetário inválido
}

export {
    validateEmail,
    validateCPF,
    validateDateBirth,
    validatePhoneWithDDD,
    validadeAddress,
    validateTypesJson,
    validateValueMonetary
}