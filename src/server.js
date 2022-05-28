require('dotenv').config();
const app = require('./api');
const routes = require('./routes');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.use('/login', routes.login);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use((err, _req, res, _next) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  return res.status(500).json({ message: 'Internal server error' });
});

app.listen(port, () => console.log('ouvindo porta', port));
