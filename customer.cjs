const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ecomerce'
});

// GET all customers
app.get('/customers', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM customer');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// GET customer by id
app.get('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM customer WHERE id = ?', [customerId]);
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// POST a new customer
app.post('/customers', async (req, res) => {
  const { name, email, phone } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO customer (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    res.status(201).json({ id: result.insertId, message: 'New customer has been added' });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// PUT update customer by id
app.put('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  const { name, email, phone } = req.body;
  try {
    const [result] = await pool.query('UPDATE customer SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, customerId]);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ id: customerId, message: 'Customer has been updated' });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// DELETE customer by id
app.delete('/customers/:id', async (req, res) => {
  const customerId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM customer WHERE id = ?', [customerId]);
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.json({ id: customerId, message: 'Customer has been deleted' });
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
