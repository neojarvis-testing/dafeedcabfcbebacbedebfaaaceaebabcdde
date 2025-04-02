const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: '127.0.0.1', // or 'localhost'
  user: 'root',
  password: 'examly',
  database: 'appdb'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database!');

  // Create users table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE
    )
  `;

  connection.query(createTableQuery, (err, result) => {
    if (err) {
      console.error('Error creating table:', err.message);
      return;
    }
    console.log('Users table ready.');

    // Insert 5 users
    const insertUsersQuery = `
      INSERT INTO users (name, email) VALUES
      ('Alice', 'alice@example.com'),
      ('Bob', 'bob@example.com'),
      ('Charlie', 'charlie@example.com'),
      ('David', 'david@example.com'),
      ('Eve', 'eve@example.com')
    `;

    connection.query(insertUsersQuery, (err, result) => {
      if (err) {
        console.error('Error inserting users:', err.message);
        return;
      }
      console.log('5 users inserted.');

      // Fetch and display all users
      connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          return;
        }
        console.log('Users:');
        console.table(results);

        // Close connection
        connection.end();
      });
    });
  });
});
