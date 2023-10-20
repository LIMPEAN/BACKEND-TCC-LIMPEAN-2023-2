-- CreateTable
CREATE TABLE `tbl_estado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `sigla` VARCHAR(2) NOT NULL,

    UNIQUE INDEX `tbl_estado_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,
    `id_estado` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cidade_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_endereco` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logradouro` VARCHAR(45) NOT NULL,
    `bairro` VARCHAR(45) NOT NULL,
    `cep` VARCHAR(10) NOT NULL,
    `numero_residencia` VARCHAR(10) NOT NULL,
    `complemento` VARCHAR(100) NULL,
    `id_cidade` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_endereco_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_residencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_tipo_residencia_nome_key`(`nome`),
    UNIQUE INDEX `tbl_tipo_residencia_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_residencia_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_tipo_residencia` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_residencia_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `tbl_genero_nome_key`(`nome`),
    UNIQUE INDEX `tbl_genero_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    `biografia` TEXT NULL,
    `foto_perfil` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(64) NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_cliente_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_cliente_email_key`(`email`),
    UNIQUE INDEX `tbl_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_cliente_numero_telefone_key`(`numero_telefone`),
    UNIQUE INDEX `tbl_telefone_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(20) NOT NULL,
    `data_nascimento` DATETIME NOT NULL,
    `biografia` TEXT NULL,
    `foto_perfil` TEXT NULL,
    `email` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(64) NOT NULL,
    `media_valor` VARCHAR(45) NULL,
    `id_endereco` INTEGER NOT NULL,
    `id_genero` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_diarista_cpf_key`(`cpf`),
    UNIQUE INDEX `tbl_diarista_email_key`(`email`),
    UNIQUE INDEX `tbl_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_telefone_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_telefone` VARCHAR(15) NOT NULL,
    `ddd` VARCHAR(2) NOT NULL,
    `id_diarista` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_telefone_diarista_numero_telefone_key`(`numero_telefone`),
    UNIQUE INDEX `tbl_telefone_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(5) NOT NULL,

    UNIQUE INDEX `tbl_status_conta_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_status` DATE NOT NULL,
    `id_diarista` INTEGER NOT NULL,
    `id_status_conta` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_status_conta_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_conta_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_status` DATE NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_status_conta` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_status_conta_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `convite` BOOLEAN NOT NULL,
    `data_hora` DATETIME NOT NULL,
    `tarefas_adicionais` TEXT NULL,
    `observacao` TEXT NULL,
    `id_residencia_cliente` INTEGER NOT NULL,
    `id_tipo_limpeza` INTEGER NOT NULL,
    `id_token_servico` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_servico_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_token_servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_codigo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeracao` TEXT NOT NULL,
    `id_servico` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_codigo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_diarista_servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_servico` INTEGER NOT NULL,
    `id_diarista` INTEGER NULL,

    UNIQUE INDEX `tbl_diarista_servico_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_transacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(45) NOT NULL,
    `comprovante` TEXT NOT NULL,
    `id_servico` INTEGER NOT NULL,
    `id_tipo_trasacao` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_transacao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_transacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_tipo_transacao_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_servico_comodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `id_servico` INTEGER NOT NULL,
    `id_comodo` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_servico_comodo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_comodo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_comodo_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_servico_com_valor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` VARCHAR(45) NULL,
    `id_servico` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_servico_com_valor_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status_servico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_hora` DATETIME NOT NULL,
    `id_servico` INTEGER NOT NULL,
    `id_status` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_status_servico_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_status_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_formulario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `check` BOOLEAN NOT NULL,
    `id_servico` INTEGER NOT NULL,
    `id_perguntas` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_formulario_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_perguntas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pergunta` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `tbl_perguntas_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_tipo_limpeza` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `tbl_tipo_limpeza_nome_key`(`nome`),
    UNIQUE INDEX `tbl_tipo_limpeza_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_avaliacao_diarista` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` VARCHAR(300) NULL,
    `quantidade_estrelas` INTEGER NOT NULL,
    `data_hora` DATETIME NOT NULL,
    `id_diarista` INTEGER NOT NULL,
    `id_client` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_avaliacao_diarista_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tbl_avaliacao_cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` VARCHAR(300) NULL,
    `quantidade_estrelas` INTEGER NOT NULL,
    `data_hora` DATETIME NOT NULL,
    `id_cliente` INTEGER NOT NULL,
    `id_diarista` INTEGER NOT NULL,

    UNIQUE INDEX `tbl_avaliacao_cliente_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tbl_cidade` ADD CONSTRAINT `tbl_cidade_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `tbl_estado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_endereco` ADD CONSTRAINT `tbl_endereco_id_cidade_fkey` FOREIGN KEY (`id_cidade`) REFERENCES `tbl_cidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_residencia_cliente` ADD CONSTRAINT `tbl_residencia_cliente_id_tipo_residencia_fkey` FOREIGN KEY (`id_tipo_residencia`) REFERENCES `tbl_tipo_residencia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_cliente` ADD CONSTRAINT `tbl_cliente_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_cliente` ADD CONSTRAINT `tbl_telefone_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_endereco_fkey` FOREIGN KEY (`id_endereco`) REFERENCES `tbl_endereco`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista` ADD CONSTRAINT `tbl_diarista_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `tbl_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_telefone_diarista` ADD CONSTRAINT `tbl_telefone_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_diarista` ADD CONSTRAINT `tbl_status_conta_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_diarista` ADD CONSTRAINT `tbl_status_conta_diarista_id_status_conta_fkey` FOREIGN KEY (`id_status_conta`) REFERENCES `tbl_status_conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_cliente` ADD CONSTRAINT `tbl_status_conta_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_conta_cliente` ADD CONSTRAINT `tbl_status_conta_cliente_id_status_conta_fkey` FOREIGN KEY (`id_status_conta`) REFERENCES `tbl_status_conta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico` ADD CONSTRAINT `tbl_servico_id_residencia_cliente_fkey` FOREIGN KEY (`id_residencia_cliente`) REFERENCES `tbl_residencia_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico` ADD CONSTRAINT `tbl_servico_id_tipo_limpeza_fkey` FOREIGN KEY (`id_tipo_limpeza`) REFERENCES `tbl_tipo_limpeza`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico` ADD CONSTRAINT `tbl_servico_id_token_servico_fkey` FOREIGN KEY (`id_token_servico`) REFERENCES `tbl_token_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_codigo` ADD CONSTRAINT `tbl_codigo_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista_servico` ADD CONSTRAINT `tbl_diarista_servico_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_diarista_servico` ADD CONSTRAINT `tbl_diarista_servico_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_transacao` ADD CONSTRAINT `tbl_transacao_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_transacao` ADD CONSTRAINT `tbl_transacao_id_tipo_trasacao_fkey` FOREIGN KEY (`id_tipo_trasacao`) REFERENCES `tbl_tipo_transacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico_comodo` ADD CONSTRAINT `tbl_servico_comodo_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico_comodo` ADD CONSTRAINT `tbl_servico_comodo_id_comodo_fkey` FOREIGN KEY (`id_comodo`) REFERENCES `tbl_comodo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_servico_com_valor` ADD CONSTRAINT `tbl_servico_com_valor_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_servico` ADD CONSTRAINT `tbl_status_servico_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_status_servico` ADD CONSTRAINT `tbl_status_servico_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `tbl_status`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_formulario` ADD CONSTRAINT `tbl_formulario_id_servico_fkey` FOREIGN KEY (`id_servico`) REFERENCES `tbl_servico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_formulario` ADD CONSTRAINT `tbl_formulario_id_perguntas_fkey` FOREIGN KEY (`id_perguntas`) REFERENCES `tbl_perguntas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao_diarista` ADD CONSTRAINT `tbl_avaliacao_diarista_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao_diarista` ADD CONSTRAINT `tbl_avaliacao_diarista_id_client_fkey` FOREIGN KEY (`id_client`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao_cliente` ADD CONSTRAINT `tbl_avaliacao_cliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `tbl_cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tbl_avaliacao_cliente` ADD CONSTRAINT `tbl_avaliacao_cliente_id_diarista_fkey` FOREIGN KEY (`id_diarista`) REFERENCES `tbl_diarista`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
