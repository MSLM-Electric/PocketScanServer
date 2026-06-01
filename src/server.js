// Подключаем необходимые библиотеки
const express = require('express');
const { Pool } = require('pg');

const scoresRouter = require('./routes/scores');
app.use('/api/scores', scoresRouter);

// --- 1. Настройка подключения к базе данных ---
// Создаем "пул соединений" - это эффективный способ управления подключениями к БД.
// Важно: замените 'ваш_пароль' на настоящий пароль от вашей БД!
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',     // База данных находится на этом же компьютере
  database: 'leaderboard_db',
  password: 'ваш_пароль',
  port: 5432,            // Порт PostgreSQL по умолчанию
});

// --- 2. Создаем само Express-приложение ---
const app = express();
const port = 3000;       // Порт, на котором наш сервер будет слушать запросы

// Эта "прослойка" (middleware) нужна, чтобы сервер мог понимать JSON,
// который придет к нему из мобильного приложения.
app.use(express.json());

// Разрешаем запросы с любых адресов (для упрощения разработки).
// В реальном проекте нужно указать конкретный адрес вашего приложения.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// --- 3. Пишем обработчики для разных "адресов" (API endpoints) ---

// 3.1. GET-запрос на адрес /api/scores
// Будет возвращать топ-10 рекордов из базы данных.
app.get('/api/scores', async (req, res) => {
  try {
    // Выполняем SQL-запрос к базе данных
    const result = await pool.query(
      'SELECT nickname, score, date FROM scores ORDER BY score DESC LIMIT 10'
    );
    // Отправляем результат обратно клиенту в формате JSON
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при получении рекордов:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// 3.2. POST-запрос на адрес /api/scores
// Будет принимать новый рекорд и сохранять его в базу.
app.post('/api/scores', async (req, res) => {
  // Ожидаем, что в теле запроса придут nickname и score
  const { nickname, score } = req.body;

  // Простая проверка: оба поля обязательны
  if (!nickname || score === undefined) {
    return res.status(400).json({ error: 'Не хватает данных: nickname или score' });
  }

  try {
    // Вставляем новую запись в базу данных
    await pool.query(
      'INSERT INTO scores (nickname, score, date) VALUES ($1, $2, NOW())',
      [nickname, score]
    );
    // Отправляем успешный ответ
    res.status(201).json({ message: 'Рекорд успешно сохранен!' });
  } catch (err) {
    console.error('Ошибка при сохранении рекорда:', err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

// --- 4. Запускаем сервер ---
app.listen(port, () => {
  console.log(`Сервер запущен и слушает порт ${port}`);
  console.log(`Проверить его работу можно по адресу: http://localhost:${port}/api/scores`);
});