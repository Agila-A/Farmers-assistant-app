# Database Troubleshooting Guide

## Issue: Cannot see saved data in MySQL Workbench

### Step 1: Check Environment Variables

Create a `.env` file in the backend directory with the following content:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=farmers_assistant
DB_PORT=3306
PORT=5000
```

**Important:** Replace `your_mysql_password` with your actual MySQL password.

### Step 2: Create Database

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Run this SQL command to create the database:

```sql
CREATE DATABASE IF NOT EXISTS farmers_assistant;
USE farmers_assistant;
```

### Step 3: Run Database Setup

```bash
cd backend
node setup-database.js
```

This will:
- Test the database connection
- Create the `budgetTracker` table
- Insert sample data
- Verify everything is working

### Step 4: Start the Server

```bash
npm start
```

### Step 5: Test the API

```bash
node test-api.js
```

## Common Issues and Solutions

### Issue 1: "Access denied for user"
**Solution:** Check your MySQL username and password in the `.env` file

### Issue 2: "Database doesn't exist"
**Solution:** Create the database first using MySQL Workbench

### Issue 3: "Connection refused"
**Solution:** Make sure MySQL server is running

### Issue 4: "Table doesn't exist"
**Solution:** Run the setup script: `node setup-database.js`

## Manual Database Setup

If the setup script doesn't work, you can manually create the table:

1. Open MySQL Workbench
2. Connect to your database
3. Run this SQL:

```sql
CREATE TABLE IF NOT EXISTS budgetTracker (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  receipt_url VARCHAR(500),
  category VARCHAR(100) DEFAULT 'General',
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO budgetTracker (title, amount, description, category, date) VALUES
('Manure Purchase', 1100.00, 'Organic manure for crops', 'Manure', '2024-08-18'),
('Fertilizers', 2800.00, 'Chemical fertilizers for better yield', 'Fertilizers', '2024-08-18'),
('Seeds', 1000.00, 'High-quality seeds for planting', 'Seeds', '2024-08-18'),
('Tractor Service', 5024.00, 'Tractor rental for field preparation', 'Machines', '2024-08-17');
```

## Testing Your Setup

After setup, you should see:
1. ✅ Database connected successfully
2. ✅ Table created with sample data
3. ✅ Server running on port 5000
4. ✅ API endpoints responding correctly

## Check Data in MySQL Workbench

1. Open MySQL Workbench
2. Connect to your database
3. Run: `SELECT * FROM budgetTracker;`
4. You should see the sample data

If you still don't see data, check:
- Database name is correct
- Table name is `budgetTracker` (case sensitive)
- You're connected to the right database 