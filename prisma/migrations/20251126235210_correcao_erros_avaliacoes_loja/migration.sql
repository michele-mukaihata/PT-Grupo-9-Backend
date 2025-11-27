/*
  Warnings:

  - You are about to drop the column `produtoId` on the `Avaliacoes_loja` table. All the data in the column will be lost.
  - Added the required column `usuarioId` to the `Avaliacoes_loja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Avaliacoes_loja" DROP CONSTRAINT "Avaliacoes_loja_produtoId_fkey";

-- AlterTable
ALTER TABLE "Avaliacoes_loja" DROP COLUMN "produtoId",
ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
