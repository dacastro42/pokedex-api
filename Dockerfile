# Usar una imagen de Node.js como base
FROM node:20.16.0-alpine AS base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del package.json y package-lock.json
COPY package*.json ./

RUN apk add --no-cache libc6-compat

# Instalar las dependencias
RUN npm install

# Copiar el resto del código al contenedor
COPY . .

# Exponer el puerto en el que corre Nest.js
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "run", "start:dev"]
