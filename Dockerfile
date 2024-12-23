# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos necessários
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install --frozen-lockfile

# Copia o restante dos arquivos
COPY . .

# Build da aplicação Next.js
RUN npm run build

# Etapa 2: Executar a aplicação
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos buildados e dependências
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package.json ./

# Variáveis de ambiente (ajuste conforme necessário)
ENV PORT=3000
ENV NODE_ENV=production

# Porta que o container expõe
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "run", "start"]
