-- DropForeignKey
ALTER TABLE "public"."Avaliacao_produto" DROP CONSTRAINT "Avaliacao_produto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Avaliacao_produto" DROP CONSTRAINT "Avaliacao_produto_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Avaliacoes_loja" DROP CONSTRAINT "Avaliacoes_loja_lojaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Avaliacoes_loja" DROP CONSTRAINT "Avaliacoes_loja_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comentarios_avaliacao" DROP CONSTRAINT "Comentarios_avaliacao_avaliacaoLojaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Comentarios_avaliacao" DROP CONSTRAINT "Comentarios_avaliacao_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Imagens_produto" DROP CONSTRAINT "Imagens_produto_produtoId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lojas" DROP CONSTRAINT "Lojas_usuarioId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Produtos" DROP CONSTRAINT "Produtos_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Produtos" DROP CONSTRAINT "Produtos_lojaId_fkey";

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Lojas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao_produto" ADD CONSTRAINT "Avaliacao_produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao_produto" ADD CONSTRAINT "Avaliacao_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Lojas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_avaliacao" ADD CONSTRAINT "Comentarios_avaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_avaliacao" ADD CONSTRAINT "Comentarios_avaliacao_avaliacaoLojaId_fkey" FOREIGN KEY ("avaliacaoLojaId") REFERENCES "Avaliacoes_loja"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagens_produto" ADD CONSTRAINT "Imagens_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lojas" ADD CONSTRAINT "Lojas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;
