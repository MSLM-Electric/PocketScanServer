// server.js
require('dotenv').config();  // Загружаем переменные из .env (пароль БД и т.д.)

const express = require('express');
const app = express();

// ----- 1. Middleware (прослойки) -----
app.use(express.json());  // чтобы сервер понимал JSON в теле запроса

// CORS — разрешаем запросы с любых адресов (для разработки)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ----- 2. Подключаем роутер для /api/license -----
const licensesRouter = require('./routes/licenses');
app.use('/api/licenses', licensesRouter);

// ----- 3. Простой тестовый маршрут (проверка, что сервер жив) -----
app.get('/', (req, res) => {
  res.send('Сервер таблицы лицензий работает!');
});

// ----- 4. Запуск сервера -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(`📊 Базы данных доступны по адресу: http://localhost:${PORT}/api/licenses`);
});