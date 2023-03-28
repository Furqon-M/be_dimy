const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomerce'
});

// Menampilkan seluruh data customer
app.get('/customer', (req, res) => {
  connection.query('SELECT * FROM customer', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Menampilkan data customer berdasarkan id
app.get('/customer/:id', (req, res) => {
  const customerId = req.params.id;
  connection.query('SELECT * FROM customer WHERE id = ?', [customerId], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Menambah data customer
app.post('/customer', (req, res) => {
  const { name, email } = req.body;
  connection.query('INSERT INTO customer (name, email) VALUES (?, ?)', [name, email], (error, results) => {
    if (error) throw error;
    res.send(`New customer has been added with id ${results.insertId}`);
  });
});

// Mengubah data customer berdasarkan id
app.put('/customer/:id', (req, res) => {
  const customerId = req.params.id;
  const { name, email } = req.body;
  connection.query('UPDATE customer SET name = ?, email = ? WHERE id = ?', [name, email, customerId], (error, results) => {
    if (error) throw error;
    res.send(`Customer with id ${customerId} has been updated`);
  });
});

// Menghapus data customer berdasarkan id
app.delete('/customer/:id', (req, res) => {
  const customerId = req.params.id;
  connection.query('DELETE FROM customer WHERE id = ?', [customerId], (error, results) => {
    if (error) throw error;
    res.send(`Customer with id ${customerId} has been deleted`);
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
