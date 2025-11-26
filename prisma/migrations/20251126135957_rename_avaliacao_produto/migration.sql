/*
  Warnings:

  - You are about to drop the `Avaliacao_produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Avaliacao_produto" DROP CONSTRAINT "Avaliacao_produto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Avaliacao_produto" DROP CONSTRAINT "Avaliacao_produto_usuarioId_fkey";

-- DropTable
DROP TABLE "public"."Avaliacao_produto";

-- CreateTable
CREATE TABLE "Avaliacoes_produto" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacoes_produto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacoes_produto_usuarioId_produtoId_key" ON "Avaliacoes_produto"("usuarioId", "produtoId");

-- AddForeignKey
ALTER TABLE "Avaliacoes_produto" ADD CONSTRAINT "Avaliacoes_produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_produto" ADD CONSTRAINT "Avaliacoes_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
