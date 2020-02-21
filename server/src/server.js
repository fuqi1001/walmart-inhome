import express from 'express';
import bodyParser from 'body-parser';
import db from './db/database';

const app = express();
const port = process.env.PORT || 8090;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({
    ok: 1,
    message: 'Hello from server'
  })
});

app.listen(port, () => console.log(`Server Started, Listening on port ${port}`));

module.exports = app; 