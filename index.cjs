const mysql = require('mysql2');

// membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecomerce'
});

// melakukan query ke database
connection.query('SELECT * FROM customer', (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
});

// melakukan query dengan parameter
const customerId = 1;
connection.query('SELECT * FROM customer WHERE id = ?', [customerId], (err, results) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(results);
});

// melakukan insert data
const newCustomer = {
  customer_name: 'John Doe'
};
connection.query('INSERT INTO customer SET ?', newCustomer, (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`New customer has been added with id ${result.insertId}`);
});

// melakukan update data
const updatedCustomer = {
  customer_name: 'Jane Doe'
};
const customerId_ = 1;
connection.query('UPDATE customer SET ? WHERE id = ?', [updatedCustomer, customerId], (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Customer with id ${customerId} has been updated`);
});

// melakukan delete data
const customer_Id = 1;
connection.query('DELETE FROM customer WHERE id = ?', [customerId], (err, result) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Customer with id ${customerId} has been deleted`);
});

// menutup koneksi ke database
connection.end();
