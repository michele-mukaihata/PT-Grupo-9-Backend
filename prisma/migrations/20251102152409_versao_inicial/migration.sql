-- CreateTable
CREATE TABLE "Categorias" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "categoriaPaiId" INTEGER,

    CONSTRAINT "Categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuarios" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "foto_perfil_url" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produtos" (
    "id" SERIAL NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "categoriaId" INTEGER NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "preco" DOUBLE PRECISION NOT NULL,
    "estoque" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacao_produto" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacao_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Avaliacoes_loja" (
    "id" SERIAL NOT NULL,
    "lojaId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Avaliacoes_loja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentarios_avaliacao" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "avaliacaoLojaId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comentarios_avaliacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imagens_produto" (
    "id" SERIAL NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "url_imagem" VARCHAR(255) NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "Imagens_produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lojas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "logo_url" VARCHAR(255) NOT NULL,
    "banner_url" VARCHAR(255) NOT NULL,
    "sticker_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lojas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_username_key" ON "Usuarios"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Avaliacao_produto_usuarioId_produtoId_key" ON "Avaliacao_produto"("usuarioId", "produtoId");

-- AddForeignKey
ALTER TABLE "Categorias" ADD CONSTRAINT "Categorias_categoriaPaiId_fkey" FOREIGN KEY ("categoriaPaiId") REFERENCES "Categorias"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Lojas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Produtos" ADD CONSTRAINT "Produtos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categorias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao_produto" ADD CONSTRAINT "Avaliacao_produto_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacao_produto" ADD CONSTRAINT "Avaliacao_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_lojaId_fkey" FOREIGN KEY ("lojaId") REFERENCES "Lojas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Avaliacoes_loja" ADD CONSTRAINT "Avaliacoes_loja_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_avaliacao" ADD CONSTRAINT "Comentarios_avaliacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comentarios_avaliacao" ADD CONSTRAINT "Comentarios_avaliacao_avaliacaoLojaId_fkey" FOREIGN KEY ("avaliacaoLojaId") REFERENCES "Avaliacoes_loja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Imagens_produto" ADD CONSTRAINT "Imagens_produto_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produtos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lojas" ADD CONSTRAINT "Lojas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
