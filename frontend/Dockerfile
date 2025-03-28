# Fase 1: Construcción de la aplicación
FROM node:20-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar todas las dependencias necesarias para construir la aplicación
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Fase 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos generados por la fase de construcción al directorio de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 (puerto predeterminado de Nginx)
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]