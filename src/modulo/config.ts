/***************************************************
 * Objetivo: Responsavel pelas constantes globais
 * Data: 14/08/2023
 * Versão: 14/08/2023
 **************************************************/

const REQUIRE_SECRETE = "3oFEe4PtHxJeXsa7hY8WBFtCt1AJ4GwgqF6WARF1NG0mUnc89W"

/***************************************  CONSTANTES DE ERROS ******************************************************************************************************/
const ERROR_INVALID_CONTENT_TYPE = { status: 415, message: 'O tipo de mídia (Content-Type) da solicitação não é compatível com o servidor. Esperado: application/json'}
const ERRO_INVALID_USER = {status: 401, message: "Email ou Senha inválidos."}
const ERRO_INVALID_LOGIN_USER = {status: 403, message: "O login não pôde ser concluído. Sua conta está temporariamente desativada ou cancelada."}
const ERRO_INVALID_TYPE_USER = {status: 400, message: "Atenção, informe o tipo de usuario e tente novamente."}
const ERRO_INTERNAL_SERVER = {status: 500, message: 'Erro interno no servidor, tente novamente mais tarde.'}  
const ERRO_NAME_PHOTO_PASSWORD = {status: 500, message: "Atenção o nome, senha e foto são campos obrigatorios. OBS: A senha deve ter no mínimo 6 caracteres .Verifique e tente novamente."}
const ERRO_REQUIRED_DATA_CLIENTE = {status: 422, message: 'Atenção, verifique a documentação para enviar a requisição com o formato e tipos corretos.'}
const ERRO_REQUIRED_DATA_DIARISTA = {status: 422, message: 'Atenção, verifique a documentação para enviar a requisição com o formato e tipos corretos.'}
const ERRO_REQUIRED_DATA_HOUSE_CLIENTE = {status: 422, message: 'Atenção, preencha os dados referentes a casa e tente novamnete. No mínimo 1 comodo.'}
const ERRO_REGISTER_USER = {status: 422, message: "A inserção falhou verifique os dados e tente novamente."}
const ERRO_REGISTER_EMAIL = {status: 422, message: "Atenção email no formato inválido. Ele deve ter esse formato: exemplo@gmail.com"}
const ERRO_REQUIRE_CPF = {status: 422, message: "Atenção o cpf informado está incorreto."}
const ERRO_REQUIRE_BIRTH_DATE = {status: 422, message: "Atenção a data informada está no formato incorreto. Envie nesse formato: YYYY-MM-DD"}
const ERRO_NUMBER_PHONE = {status: 422, message: "Atenção o número de telefone esta errado. verique e tente novamente. exemplo: (11) 1111-11111"}
const ERRO_ADDRESS = {status: 422, message: "Atenção, verifique os dados referentes ao endereço e tente novamente"}
const ERRO_DELETE_USER = {status: 500, message: "Erro ao tentar deletar os dados do usuario, verifique e tente novamente."}
const ERRO_UPDATE_USER = {status:500, message: "Erro ao tentar atualizar dados, verifique a documentação e tente novamente."}
const ERRO_UPDATE_PHONE_USER = {status:500, message: "Erro ao tentar atualizar os dados referentes ao número de telefone."}
const ERRO_UPDATE_DATA_SIMPLE_DIARIST = {status: 500, message: "Erro, Não foi possivel atualizar os dados referentes a Nome, Biografia, Genero, Senha, Foto ou Preço."} 
const ERRO_UPDATE_ADDRESS_CLIENT = {status: 500, message: "Erro, Não foi possivel atualizar o endereço"} 
const ERRO_REQUIRED_TOKEN = {status: 401, message: "Token não fornecido."}
const ERRO_INVALID_TOKEN = {status: 401, message: "Token inválido."}

/***************************************   CONSTANTES DE SUCESSO  ************************************************************************************************/
const CREATED_REGISTER = {status: 201, message: "Registro criado com sucesso."}
const UPDATE_USER = {status: 201, message: "Registro atualizado com sucesso"}
const DELETE_USER= {status: 200, message: "Registro deletado com sucesso."}
const VERIFY_JWT= {status: 200, message: "Token verificado com sucesso."}


export {
    REQUIRE_SECRETE,
    ERROR_INVALID_CONTENT_TYPE,
    ERRO_INVALID_USER,
    ERRO_INVALID_LOGIN_USER,
    ERRO_INVALID_TYPE_USER,
    ERRO_INTERNAL_SERVER,
    ERRO_NAME_PHOTO_PASSWORD,
    ERRO_REQUIRED_DATA_CLIENTE,
    ERRO_REQUIRED_DATA_DIARISTA,
    ERRO_REGISTER_USER,
    CREATED_REGISTER,
    UPDATE_USER,
    ERRO_REGISTER_EMAIL,
    ERRO_REQUIRE_BIRTH_DATE,
    ERRO_REQUIRE_CPF,
    ERRO_NUMBER_PHONE,
    ERRO_ADDRESS,
    ERRO_DELETE_USER,
    ERRO_UPDATE_USER,
    ERRO_UPDATE_DATA_SIMPLE_DIARIST,
    ERRO_UPDATE_PHONE_USER,
    DELETE_USER,
    ERRO_REQUIRED_DATA_HOUSE_CLIENTE,
    ERRO_REQUIRED_TOKEN,
    ERRO_INVALID_TOKEN,
    ERRO_UPDATE_ADDRESS_CLIENT,
    VERIFY_JWT
}