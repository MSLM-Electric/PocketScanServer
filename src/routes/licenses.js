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
  console.log('🚀 1: POST-запрос получен');

  // Проверка, что тело запроса вообще пришло
  console.log('📦 2: req.body =', req.body);

  const { full_name, birth_date, doc_number, category } = req.body;
  console.log('🔍 3: Деструктуризация выполнена, поля:', { full_name, birth_date, doc_number, category });

  if (!full_name || !birth_date || !doc_number || !category) {
    console.log('❌ 4: Неверные данные, отправляем 400');
    return res.status(400).json({ error: 'Неверные данные' });
  }

  console.log('✅ 5: Проверка пройдена, вызываем saveLicense...');
  try {
    const saved = await licenseModel.saveLicense(full_name, birth_date, doc_number, category);
    console.log('✅ 6: saveLicense завершён, результат:', saved);
    res.status(201).json(saved);
    console.log('📤 7: Ответ отправлен');
  } catch (err) {
    console.error('❌ 8: Ошибка в saveLicense:', err);
    res.status(500).json({ error: err.message });
    console.log('📤 9: Ошибка отправлена');
  }
});

module.exports = router;