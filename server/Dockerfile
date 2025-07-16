# Используем официальный Node образ
FROM node:18

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json и ставим зависимости
COPY package*.json ./
RUN npm install

# Копируем весь проект
COPY . .

# Собираем TypeScript
RUN npm run build

# Запускаем приложение
CMD ["node", "dist/server.js"]
