const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors());



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_login',
    password: '1234',
    port: 5432,
});


app.get('/admin', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM admin');   

        client.release();
        res.json(result.rows);
    } catch (err)   
 {
        console.error(err);
        res.status(500).send('Error retrieving data');
    }
});


app.listen(port, () => {
    console.log('Server listening on port 3001');
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const client = await pool.connect();
        await client.query('INSERT INTO admin ( username, password) VALUES ($1, $2)', [ username, password]);
        client.release();
        res.json({ message: 'successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
});


app.post('/logs', async (req, res) => {
    const { username, password } = req.body;
    const ip = getUserIP(req);  
    const timestamp = new Date();  
    try {
      const query = 'INSERT INTO login_log (username, password, ip_address, login_time) VALUES ($1, $2, $3, $4)';
      await pool.query(query, [username, password, ip, timestamp]);
      res.status(200).json({ message: 'บันทึก' });
    } catch (err) {
      console.error('Error saving login history:', err);
      res.status(500).json({ message: 'ผิดพลาด' });
    }
  });
  


  function getUserIP(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  }