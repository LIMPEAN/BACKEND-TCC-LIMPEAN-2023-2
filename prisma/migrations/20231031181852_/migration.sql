/*
  Warnings:

  - You are about to alter the column `data_hora` on the `tbl_avaliacao_cliente` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_hora` on the `tbl_avaliacao_diarista` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_nascimento` on the `tbl_diarista` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_hora` on the `tbl_servico` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data_hora` on the `tbl_status_servico` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `tbl_avaliacao_cliente` MODIFY `data_hora` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_avaliacao_diarista` MODIFY `data_hora` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_diarista` MODIFY `data_nascimento` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_servico` MODIFY `data_hora` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tbl_status_servico` MODIFY `data_hora` DATETIME NOT NULL;
