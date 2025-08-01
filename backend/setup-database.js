const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306
});

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database...\n');

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

    // Read and execute schema
    console.log('\n2. Creating table and sample data...');
    const schemaPath = path.join(__dirname, 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split schema into individual statements
    const statements = schema.split(';').filter(stmt => stmt.trim());
    
    for (let statement of statements) {
      if (statement.trim()) {
        await new Promise((resolve, reject) => {
          connection.query(statement, (err, result) => {
            if (err) {
              console.error('❌ Error executing statement:', err.message);
              reject(err);
              return;
            }
            console.log('✅ Statement executed successfully');
            resolve();
          });
        });
      }
    }

    // Verify table exists and has data
    console.log('\n3. Verifying table and data...');
    const [rows] = await new Promise((resolve, reject) => {
      connection.query('SELECT COUNT(*) as count FROM budgetTracker', (err, results) => {
        if (err) {
          console.error('❌ Error checking table:', err.message);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    console.log(`✅ Table created successfully with ${rows[0].count} records`);

    // Show sample data
    console.log('\n4. Sample data in table:');
    const [data] = await new Promise((resolve, reject) => {
      connection.query('SELECT * FROM budgetTracker LIMIT 5', (err, results) => {
        if (err) {
          console.error('❌ Error fetching data:', err.message);
          reject(err);
          return;
        }
        resolve(results);
      });
    });

    data.forEach(row => {
      console.log(`   - ${row.title}: ₹${row.amount} (${row.category})`);
    });

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('   1. Start the server: npm start');
    console.log('   2. Test the API: node test-api.js');
    console.log('   3. Check MySQL Workbench to see the data');

  } catch (error) {
    console.error('\n❌ Database setup failed:', error.message);
    console.log('\n🔍 Troubleshooting tips:');
    console.log('   1. Check your .env file has correct database credentials');
    console.log('   2. Make sure MySQL server is running');
    console.log('   3. Verify the database exists');
    console.log('   4. Check if user has proper permissions');
  } finally {
    connection.end();
  }
}

// Run setup if this file is executed directly
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase; 