// models/scoreModel.js
const { Pool } = require('pg');

// Пул подключений к БД (настройки берутся из переменных окружения .env)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Получить топ-10 рекордов
async function getTopScores() {
  const result = await pool.query(
    'SELECT nickname, score, to_char(date, \'DD.MM.YYYY HH24:MI\') as date FROM scores ORDER BY score DESC LIMIT 10'
  );
  return result.rows;
}

// Сохранить новый рекорд
async function saveScore(nickname, score) {
  const result = await pool.query(
    'INSERT INTO scores (nickname, score, date) VALUES ($1, $2, NOW()) RETURNING *',
    [nickname, score]
  );
  return result.rows[0];
}

module.exports = { getTopScores, saveScore };