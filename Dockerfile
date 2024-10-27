# Fase 1: Construcción
FROM node:20-alpine AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia todo el código del proyecto al contenedor
COPY . .

# Construye la aplicación de React
RUN npm run build

# Fase 2: Configuración del servidor web NGINX
FROM nginx:alpine

# Copia los archivos estáticos generados en la fase de construcción al directorio de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Agrega un archivo de configuración para que NGINX use el puerto proporcionado por Cloud Run
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto que Cloud Run establecerá
EXPOSE 8080

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]