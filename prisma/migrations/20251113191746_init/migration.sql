-- DropForeignKey
ALTER TABLE "public"."Produtos" DROP CONSTRAINT "Produtos_categoriaId_fkey";

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
