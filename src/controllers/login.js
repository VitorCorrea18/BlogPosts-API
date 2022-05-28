const services = require('../services');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await services.login(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(err.status).json({ message: err.message });
  }
};

module.exports = login;
