# Budget Tracker Backend

This is the backend API for the Budget Tracker feature of the Farmers Assistant App.

## Features

### Add Expenses
- Add new expenses with title, amount, description, category, and date
- Upload receipt images/PDFs
- Automatic timestamp creation

### Track Expenses
- View all expenses
- Filter expenses by date (Today, Weekly, Monthly)
- Filter expenses by category
- Get expense totals and summaries
- Update and delete expenses

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the backend directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=your_database_name
   DB_PORT=3306
   PORT=5000
   ```

3. **Database Setup**
   - Create a MySQL database
   - Run the schema file: `database/schema.sql`
   - This will create the `budgetTracker` table with sample data

4. **Create Uploads Directory**
   ```bash
   mkdir uploads
   ```

5. **Start the Server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## API Endpoints

### Add Expenses
- **POST** `/api/budget/add-expense`
  - Body: `{ title, amount, description, category, date }`
  - File: `receipt` (optional)

### Track Expenses

#### Get All Expenses
- **GET** `/api/budget/all-expenses`

#### Get Today's Expenses
- **GET** `/api/budget/today`

#### Get Weekly Expenses
- **GET** `/api/budget/weekly`

#### Get Monthly Expenses
- **GET** `/api/budget/monthly`

#### Get Expenses by Date
- **GET** `/api/budget/by-date/:date`
  - Example: `/api/budget/by-date/2024-08-18`

#### Get Expenses by Date Range
- **GET** `/api/budget/by-week/:startDate/:endDate`
  - Example: `/api/budget/by-week/2024-08-12/2024-08-18`

#### Get Expenses by Month
- **GET** `/api/budget/by-month/:year/:month`
  - Example: `/api/budget/by-month/2024/8`

#### Get Expenses by Category
- **GET** `/api/budget/by-category/:category`
  - Example: `/api/budget/by-category/Manure`

### Update & Delete

#### Update Expense
- **PUT** `/api/budget/update/:id`
  - Body: `{ title, amount, description, category, date }`

#### Delete Expense
- **DELETE** `/api/budget/delete/:id`

### Analytics

#### Get Total Amount
- **GET** `/api/budget/total`

#### Get Total by Category
- **GET** `/api/budget/total-by-category`

## Database Schema

```sql
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
);
```

## Sample Data

The schema includes sample data matching the UI:
- Manure: ₹1100
- Fertilizers: ₹2800
- Seeds: ₹1000
- Machines: ₹5024

## File Upload

- Supported formats: JPEG, JPG, PNG, PDF
- Maximum file size: 5MB
- Files are stored in the `uploads/` directory
- Access files via `/uploads/filename`

## Error Handling

All endpoints return appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Server Error

## Testing

You can test the API using tools like Postman or curl:

```bash
# Get today's expenses
curl http://localhost:5000/api/budget/today

# Add a new expense
curl -X POST http://localhost:5000/api/budget/add-expense \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Expense","amount":100,"description":"Test","category":"Test","date":"2024-08-18"}'
``` 