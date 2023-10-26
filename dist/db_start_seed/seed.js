"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const insertGender = async function () {
    const typesGender = ["masculino", "feminino", "outro"];
    for (const type of typesGender) {
        const gender = await prisma.tbl_genero.findFirst({
            where: { nome: type }
        });
        if (!gender) {
            await prisma.tbl_genero.create({
                data: {
                    nome: type
                }
            });
        }
    }
};
const insertTypesResidence = async function () {
    const typesResidence = ["Casa", "Apartamento", "Sobrado", "Condomínio", "Chácara", "Kitnet"];
    for (const type of typesResidence) {
        const residence = await prisma.tbl_tipo_residencia.findFirst({
            where: { nome: type }
        });
        if (!residence) {
            await prisma.tbl_tipo_residencia.create({
                data: {
                    nome: type
                }
            });
        }
    }
};
const insertStateBrazil = async function () {
    const states = [
        { sigla: 'AC', nome: 'Acre' },
        { sigla: 'AL', nome: 'Alagoas' },
        { sigla: 'AM', nome: 'Amazonas' },
        { sigla: 'AP', nome: 'Amapá' },
        { sigla: 'BA', nome: 'Bahia' },
        { sigla: 'CE', nome: 'Ceará' },
        { sigla: 'DF', nome: 'Distrito Federal' },
        { sigla: 'ES', nome: 'Espírito Santo' },
        { sigla: 'GO', nome: 'Goiás' },
        { sigla: 'MA', nome: 'Maranhão' },
        { sigla: 'MG', nome: 'Minas Gerais' },
        { sigla: 'MS', nome: 'Mato Grosso do Sul' },
        { sigla: 'MT', nome: 'Mato Grosso' },
        { sigla: 'PA', nome: 'Pará' },
        { sigla: 'PB', nome: 'Paraíba' },
        { sigla: 'PE', nome: 'Pernambuco' },
        { sigla: 'PI', nome: 'Piauí' },
        { sigla: 'PR', nome: 'Paraná' },
        { sigla: 'RJ', nome: 'Rio de Janeiro' },
        { sigla: 'RN', nome: 'Rio Grande do Norte' },
        { sigla: 'RO', nome: 'Rondônia' },
        { sigla: 'RR', nome: 'Roraima' },
        { sigla: 'RS', nome: 'Rio Grande do Sul' },
        { sigla: 'SC', nome: 'Santa Catarina' },
        { sigla: 'SE', nome: 'Sergipe' },
        { sigla: 'SP', nome: 'São Paulo' },
        { sigla: 'TO', nome: 'Tocantins' }
    ];
    for (const state of states) {
        const nameState = await prisma.tbl_estado.findFirst({
            where: {
                OR: [
                    { nome: state.nome },
                    { sigla: state.sigla }
                ]
            }
        });
        if (!nameState) {
            await prisma.tbl_estado.create({
                data: {
                    nome: state.nome,
                    sigla: state.sigla
                }
            });
        }
    }
};
const insertTypeStatusRegister = async function () {
    const status = await prisma.tbl_status_conta.findFirst({
        where: {
            status: "true"
        }
    });
    if (!status) {
        await prisma.tbl_status_conta.createMany({
            data: [
                {
                    status: "true"
                },
                {
                    status: "false"
                }
            ]
        });
    }
};
const insertRoom = async function () {
    const typesRoom = ["Quarto", "Sala", "Cozinha", "Banheiro", "Escritório", "Lavanderia", "Garagem", "Quintal", "Area de lazer"];
    for (const room of typesRoom) {
        const nameRoom = await prisma.tbl_comodo.findFirst({
            where: { nome: room }
        });
        if (!nameRoom) {
            await prisma.tbl_comodo.create({
                data: {
                    nome: room
                }
            });
        }
    }
};
const insertTypeCleaning = async function () {
    const typesCleaning = ["Comercial", "Padrão", "Pré obra", "Pós obra", "Pré mudança"];
    for (const typeClean of typesCleaning) {
        const nameCleaning = await prisma.tbl_tipo_limpeza.findFirst({
            where: { nome: typeClean }
        });
        if (!nameCleaning) {
            await prisma.tbl_tipo_limpeza.create({
                data: {
                    nome: typeClean
                }
            });
        }
    }
};
const insertTypeQuestion = async function () {
    const typeQuestions = ["Haverão crianças no momento da faxina? ", "Haverão animais no momento da faxina?"];
    for (const typeQuestion of typeQuestions) {
        const question = await prisma.tbl_perguntas.findFirst({
            where: { pergunta: typeQuestion }
        });
        if (!question) {
            await prisma.tbl_perguntas.create({
                data: {
                    pergunta: typeQuestion
                }
            });
        }
    }
};
const insertStatusService = async function () {
    const typeStatus = ["Em aberto", "Agendado", "Em andamento", "Finalizado", "Cancelado"];
    for (const status of typeStatus) {
        const statusService = await prisma.tbl_status.findFirst({
            where: { nome: status }
        });
        if (!statusService) {
            await prisma.tbl_status.create({
                data: {
                    nome: status
                }
            });
        }
    }
};
const insertTypePayment = async function () {
    const typePayment = ["Pix", "Débito", "Crédito", "Boleto"];
    for (const it of typePayment) {
        const statusPayment = await prisma.tbl_tipo_transacao.findFirst({
            where: { nome: it }
        });
        if (!statusPayment) {
            await prisma.tbl_tipo_transacao.create({
                data: {
                    nome: it
                }
            });
        }
    }
};
insertGender()
    .then(() => {
    console.log("Inserção de gêneros concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir gêneros:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypesResidence()
    .then(() => {
    console.log("Inserção dos tipos de residência concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir tipos de residência:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertStateBrazil()
    .then(() => {
    console.log("Inserção dos estados brasileiros concluído com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir os estados:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypeStatusRegister()
    .then(() => {
    console.log("Inserção dos tipos de status da conta foi inserido com sucesso");
})
    .catch((error) => {
    console.error("Erro ao inserir os status da conta:", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertRoom()
    .then(() => {
    console.log("Inserção dos tipos de comodo foram inseridos com sucesso");
})
    .catch((error) => {
    console.log("Erro ao inserir os tipos de comodos", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypeCleaning()
    .then(() => {
    console.log("Inserção dos tipos de limpeza foram inseridos com sucesso");
})
    .catch((error) => {
    console.log("Erro ao inserir os tipos de limpaza", error);
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypeQuestion()
    .then(() => {
    console.log("Inserção de perguntas foram inseridadas com sucesso.");
})
    .catch((error) => {
    console.log("Erro ao inserir os tipos de perguntas");
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertStatusService()
    .then(() => {
    console.log("Inserção dos tipos de status do serviço concluido com sucesso.");
})
    .catch((error) => {
    console.log("Erro ao inserir os tipos de status do serviço.");
})
    .finally(async () => {
    await prisma.$disconnect();
});
insertTypePayment()
    .then(() => {
    console.log("Inserção dos tipos de pagamento concluido com sucesso.");
})
    .catch((error) => {
    console.log("Erro ao inserir os tipos de pagamento");
})
    .finally(async () => {
    await prisma.$disconnect();
});
