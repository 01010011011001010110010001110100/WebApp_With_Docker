# Usar la imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de la aplicación
COPY . .

# Exponer el puerto en el que la app escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
