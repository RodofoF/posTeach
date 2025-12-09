FROM node:20-slim
 
# Instala o FFmpeg, procps (para comandos como 'ps') e o cliente Docker.
# O 'docker.io' fornece o comando 'docker' que precisamos para executar 'docker exec'.
RUN apt-get update && apt-get install -y && \
    # Limpa o cache do apt para reduzir o tamanho final da imagem
    rm -rf /var/lib/apt/lists/*
 
WORKDIR /app
 
COPY package*.json ./
RUN npm install
 
COPY . .
 
EXPOSE 3000
CMD ["npm", "start"]