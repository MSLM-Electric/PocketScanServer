// routes/scores.js
const express = require('express');
const router = express.Router();
const licenseModel = require('../models/licenseModel');

// GET /api/scores — получить топ-10
router.get('/', async (req, res) => {
  try {
    const scores = await licenseModel.getAllLicenses();
    res.json(scores);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка получения базы данных' });
  }
});

// POST /api/scores — сохранить новый рекорд
router.post('/', async (req, res) => {
  const { nickname, score } = req.body;
  if (!nickname || score === undefined || typeof score !== 'number') {
    return res.status(400).json({ error: 'Неверные данные' });
  }
  try {
    const newScore = await licenseModel.saveLicense(nickname, score);
    res.status(201).json(newScore);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сохранения базы данных' });
  }
});

module.exports = router;