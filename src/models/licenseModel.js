const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Проверка подключения при старте
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err);
    return;
  }
  console.log('✅ Подключение к PostgreSQL установлено');
  release();
});

async function getAllLicenses() {
  const result = await pool.query('SELECT * FROM driver_licenses ORDER BY created_at DESC');
  return result.rows;
}

async function saveLicense(fullName, birthDate, docNumber, category) {
  const result = await pool.query({text:
    'INSERT INTO driver_licenses (full_name, birth_date, doc_number, category) VALUES ($1, $2, $3, $4) RETURNING *',
    values:[fullName, birthDate, docNumber, category],timeout:5000
});
  return result.rows[0];
}

module.exports = { getAllLicenses, saveLicense };