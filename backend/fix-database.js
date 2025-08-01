const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

async function fixDatabase() {
  try {
    console.log('🔧 Fixing database table structure...\n');

    // Test connection
    console.log('1. Testing database connection...');
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('❌ Database connection failed:', err.message);
          reject(err);
          return;
        }
        console.log('✅ Database connected successfully!');
        resolve();
      });
    });

    // Drop existing table if it exists
    console.log('\n2. Dropping existing table...');
    await new Promise((resolve, reject) => {
      connection.query('DROP TABLE IF EXISTS budgetTracker', (err, result) => {
        if (err) {
          console.error('❌ Error dropping table:', err.message);
          reject(err);
          return;
        }
        console.log('✅ Table dropped successfully');
        resolve();
      });
    });

    // Create new table with correct structure
    console.log('\n3. Creating new table with correct structure...');
    const createTableSQL = `
      CREATE TABLE budgetTracker (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        description TEXT,
        receipt_url VARCHAR(500),
        category VARCHAR(100) DEFAULT 'General',
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await new Promise((resolve, reject) => {
      connection.query(createTableSQL, (err, result) => {
        if (err) {
          console.error('❌ Error creating table:', err.message);
          reject(err);
          return;
        }
        console.log('✅ Table created successfully');
        resolve();
      });
    });

    // Create indexes
    console.log('\n4. Creating indexes...');
    const indexQueries = [
      'CREATE INDEX idx_date ON budgetTracker(date)',
      'CREATE INDEX idx_category ON budgetTracker(category)',
      'CREATE INDEX idx_created_at ON budgetTracker(created_at)'
    ];

    for (let query of indexQueries) {
      await new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
          if (err) {
            console.error('❌ Error creating index:', err.message);
            reject(err);
            return;
          }
          console.log('✅ Index created successfully');
          resolve();
        });
      });
    }

    // Insert sample data
    console.log('\n5. Inserting sample data...');
    const sampleData = [
      ['Manure Purchase', 1100.00, 'Organic manure for crops', 'Manure', '2024-08-18'],
      ['Fertilizers', 2800.00, 'Chemical fertilizers for better yield', 'Fertilizers', '2024-08-18'],
      ['Seeds', 1000.00, 'High-quality seeds for planting', 'Seeds', '2024-08-18'],
      ['Tractor Service', 5024.00, 'Tractor rental for field preparation', 'Machines', '2024-08-17']
    ];

    for (let data of sampleData) {
      await new Promise((resolve, reject) => {
        const sql = 'INSERT INTO budgetTracker (title, amount, description, category, date) VALUES (?, ?, ?, ?, ?)';
        connection.query(sql, data, (err, result) => {
          if (err) {
            console.error('❌ Error inserting data:', err.message);
            reject(err);
            return;
          }
          console.log(`✅ Sample data inserted: ${data[0]}`);
          resolve();
        });
      });
    }

    // Verify table structure
    console.log('\n6. Verifying table structure...');
    const [columns] = await new Promise((resolve, reject) => {
      connection.query('DESCRIBE budgetTracker', (err, results) => {
        if (err) {
          console.error('❌ Error describing table:', err.message);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    console.log('✅ Table structure:');
    columns.forEach(col => {
      console.log(`   - ${col.Field}: ${col.Type} ${col.Null === 'NO' ? 'NOT NULL' : ''}`);
    });

    // Verify data
    console.log('\n7. Verifying data...');
    const [data] = await new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) as count FROM budgetTracker', (err, results) => {
        if (err) {
          console.error('❌ Error counting data:', err.message);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    console.log(`✅ Table has ${data[0].count} records`);

    console.log('\n🎉 Database fixed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Test the API: npm run test-save');
    console.log('   2. Try adding expenses from your frontend');
    console.log('   3. Check MySQL Workbench to see the data');

  } catch (error) {
    console.error('\n❌ Database fix failed:', error.message);
  } finally {
    connection.end();
  }
}

// Run fix if this file is executed directly
if (require.main === module) {
  fixDatabase();
}

module.exports = fixDatabase; 