const express = require('express');
const router = express.Router();
const licenseModel = require('../models/licenseModel');

// GET – получить все записи
router.get('/', async (req, res) => {
  try {
    const data = await licenseModel.getAllLicenses();
    res.json(data);
  } catch (err) {
    console.error('Ошибка GET:', err);
    res.status(500).json({ error: err.message });
  }
});

// POST – сохранить запись
router.post('/', async (req, res) => {
  console.log('req.body:', req.body);
  const { full_name, birth_date, doc_number, category } = req.body;

  // Проверка на наличие всех полей
  if (!full_name || !birth_date || !doc_number || !category) {
    return res.status(400).json({ error: 'Неверные данные' });
  }

  try {
    const saved = await licenseModel.saveLicense(full_name, birth_date, doc_number, category);
    console.log('Сохранено:', saved);
    res.status(201).json(saved);  // <--- ОТПРАВЛЯЕМ ОТВЕТ
  } catch (err) {
    console.error('Ошибка сохранения:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;