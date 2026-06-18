// models/licenseModel.js
const { Pool } = require('pg');

// Пул подключений к БД (настройки берутся из переменных окружения .env)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Получить все сохраненные удостоверения (или последние N)
async function getAllLicenses() {
    const result = await pool.query('SELECT * FROM driver_licenses ORDER BY created_at DESC');
    return result.rows;
}

// Сохранить новое водительское удостоверение
async function saveLicense(fullName, birthDate, docNumber, category) {
    const result = await pool.query(
        'INSERT INTO driver_licenses (full_name, birth_date, doc_number, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [fullName, birthDate, docNumber, category]
    );
    return result.rows[0];
}

module.exports = { getAllLicenses, saveLicense };