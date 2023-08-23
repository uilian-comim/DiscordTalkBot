#!/bin/bash

# Espera até que o banco de dados esteja pronto para aceitar conexões
until nc -z -v -w30 database 3306
do
  echo "Aguardando o banco de dados..."
  sleep 5
done

# Gerar o código do Prisma a partir do schema
npx prisma generate

# Executar as migrações do Prisma
npx prisma db push

# Iniciar o servidor do aplicativo
npm start
