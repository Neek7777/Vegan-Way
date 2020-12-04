const { Router } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = Router();

//     /api/auth/registr
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email: email });
    if (candidate) {
      return res
        .status(400)
        .json({ message: 'Такой пользователь уже существует' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

//     /api/auth/login
router.post('/login', async (req, res) => {
  try {
  } catch (e) {}
});

module.exports = router;
// sdfsldkjf;sdjflkjsdl