# Dockerfile untuk aplikasi Express.js
FROM node:16

# Set working directory
WORKDIR /app

# Salin package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Set port yang digunakan aplikasi
EXPOSE 3000

# Jalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
