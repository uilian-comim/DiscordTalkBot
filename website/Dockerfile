# Use a imagem oficial do Node.js como base
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# # Compila o projeto Next.js
# RUN npm run build

# Comando para iniciar o servidor Next.js
CMD [ "npm", "run", "dev" ]