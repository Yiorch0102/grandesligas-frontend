# ETAPA 1: BUILD (Compilación de Angular)
FROM node:18-alpine AS build
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y construimos para producción
COPY . .
RUN npm run build

# ETAPA 2: SERVIDOR (Nginx)
FROM nginx:alpine
# Copiamos los archivos compilados de Angular a la carpeta de Nginx
# OJO: Verifica si tu carpeta dist se llama 'grandesligas-frontend' o solo 'dist'
# Usualmente es /dist/nombre-del-proyecto/browser o similar en Angular 17+
COPY --from=build /app/dist/*/browser /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
