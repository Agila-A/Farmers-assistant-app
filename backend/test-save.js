const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api/budget';

// Test data that matches your frontend form
const testExpense = {
  title: 'Test Expense from API',
  amount: 2500,
  description: 'Testing if the API can save data to database',
  category: 'Test',
  date: new Date().toISOString().split('T')[0] // Today's date
};

async function testSaveExpense() {
  try {
    console.log('🧪 Testing expense save functionality...\n');

    console.log('📝 Test data:');
    console.log(JSON.stringify(testExpense, null, 2));
    console.log('');

    // Test 1: Add new expense
    console.log('1. Adding new expense via API...');
    const response = await axios.post(`${BASE_URL}/add-expense`, testExpense);
    console.log('✅ Response:', response.data);
    console.log('');

    // Test 2: Get all expenses to verify it was saved
    console.log('2. Fetching all expenses to verify save...');
    const allExpenses = await axios.get(`${BASE_URL}/all-expenses`);
    console.log(`✅ Found ${allExpenses.data.length} expenses in database`);
    
    // Find our test expense
    const savedExpense = allExpenses.data.find(exp => exp.title === testExpense.title);
    if (savedExpense) {
      console.log('✅ Test expense found in database:');
      console.log(`   ID: ${savedExpense.id}`);
      console.log(`   Title: ${savedExpense.title}`);
      console.log(`   Amount: ₹${savedExpense.amount}`);
      console.log(`   Category: ${savedExpense.category}`);
      console.log(`   Date: ${savedExpense.date}`);
    } else {
      console.log('❌ Test expense not found in database');
    }

    console.log('\n🎉 Test completed!');
    console.log('\n📋 Next steps:');
    console.log('   1. Check MySQL Workbench to see the new record');
    console.log('   2. Try adding an expense from your frontend');
    console.log('   3. If frontend still doesn\'t work, check the browser console for errors');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n🔍 Server is not running. Start it with: npm start');
    } else if (error.response?.status === 500) {
      console.log('\n🔍 Database error. Check your .env file and database connection.');
    }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testSaveExpense();
}

module.exports = testSaveExpense; 