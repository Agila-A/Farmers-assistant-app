const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/budget';

// Test data
const testExpense = {
  title: 'Test Expense',
  amount: 1500,
  description: 'Test expense for API testing',
  category: 'Test',
  date: '2024-08-18'
};

async function testAPI() {
  try {
    console.log('🧪 Testing Budget Tracker API...\n');

    // Test 1: Get all expenses
    console.log('1. Testing GET /all-expenses');
    const allExpenses = await axios.get(`${BASE_URL}/all-expenses`);
    console.log('✅ All expenses:', allExpenses.data.length, 'records found\n');

    // Test 2: Get today's expenses
    console.log('2. Testing GET /today');
    const todayExpenses = await axios.get(`${BASE_URL}/today`);
    console.log('✅ Today\'s expenses:', todayExpenses.data.length, 'records found\n');

    // Test 3: Get weekly expenses
    console.log('3. Testing GET /weekly');
    const weeklyExpenses = await axios.get(`${BASE_URL}/weekly`);
    console.log('✅ Weekly expenses:', weeklyExpenses.data.length, 'records found\n');

    // Test 4: Get monthly expenses
    console.log('4. Testing GET /monthly');
    const monthlyExpenses = await axios.get(`${BASE_URL}/monthly`);
    console.log('✅ Monthly expenses:', monthlyExpenses.data.length, 'records found\n');

    // Test 5: Get total amount
    console.log('5. Testing GET /total');
    const totalAmount = await axios.get(`${BASE_URL}/total`);
    console.log('✅ Total amount:', totalAmount.data.total, '\n');

    // Test 6: Get total by category
    console.log('6. Testing GET /total-by-category');
    const totalByCategory = await axios.get(`${BASE_URL}/total-by-category`);
    console.log('✅ Total by category:', totalByCategory.data, '\n');

    // Test 7: Add new expense
    console.log('7. Testing POST /add-expense');
    const newExpense = await axios.post(`${BASE_URL}/add-expense`, testExpense);
    console.log('✅ New expense added:', newExpense.data, '\n');

    // Test 8: Get expenses by category
    console.log('8. Testing GET /by-category/Test');
    const categoryExpenses = await axios.get(`${BASE_URL}/by-category/Test`);
    console.log('✅ Category expenses:', categoryExpenses.data.length, 'records found\n');

    console.log('🎉 All tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = testAPI; 