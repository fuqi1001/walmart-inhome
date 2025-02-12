import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('/api/hello', (req, res) => {
  res.send({
    ok: 1,
    message: 'Hello from server'
  })
});

app.listen(port, () => console.log(`Server Started, Listening on port ${port}`));

module.exports = app; 