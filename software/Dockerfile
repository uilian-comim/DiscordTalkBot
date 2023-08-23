# Usar a imagem do Node.js como base
FROM node:18

#Instala o pacote netcat para verificar se o banco de dados está pronto
RUN apt-get update && \
    apt-get install -y netcat-traditional

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copie o script de inicialização para o diretório de trabalho
COPY entrypoint.sh /app/entrypoint.sh

# Dê permissão de execução ao script de inicialização
RUN chmod +x /app/entrypoint.sh

# Copiar todo o conteúdo do diretório atual para o diretório de trabalho no contêiner
COPY . .

ENV DATABASE_URL=mysql://root:12345@dtbdb:3306/discord_talk_bot

# Compilar o TypeScript para JavaScript
RUN npm run build

# Expor a porta 3333 para a API e a porta 5555 para o socket
EXPOSE 3333
EXPOSE 5555

# Usar um script de inicialização em vez do npm start
CMD ["bash", "/app/entrypoint.sh"]
