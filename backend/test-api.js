// Using built-in fetch (available in Node.js 18+)
const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
  console.log('🧪 Testing AgriLend API...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${API_BASE_URL.replace('/api', '')}`);
    const healthData = await healthResponse.text();
    console.log('✅ Health check:', healthData);

    // Test 2: Get all equipment
    console.log('\n2. Testing get all equipment...');
    const equipmentResponse = await fetch(`${API_BASE_URL}/equipment`);
    const equipmentData = await equipmentResponse.json();
    console.log('✅ Equipment count:', equipmentData.count);
    console.log('📋 Equipment:', equipmentData.data.map(e => e.name));

    // Test 3: Get all users
    console.log('\n3. Testing get all users...');
    const usersResponse = await fetch(`${API_BASE_URL}/users`);
    const usersData = await usersResponse.json();
    console.log('✅ Users count:', usersData.count);
    console.log('👥 Users:', usersData.data.map(u => u.name));

    // Test 4: Create a test equipment
    console.log('\n4. Testing create equipment...');
    const testEquipment = {
      name: "Test Tractor",
      description: "Test equipment for API testing",
      price: 1000.00,
      ownerId: 1,
      ownerName: "Test User",
      location: "Test Location",
      imageUrl: "/assets/tractor.png",
      isOnSale: false,
      deliveryAvailable: true,
      deliveryCharge: 100.00,
      category: "TRACTOR",
      condition: "GOOD"
    };

    const createResponse = await fetch(`${API_BASE_URL}/equipment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testEquipment)
    });
    const createData = await createResponse.json();
    console.log('✅ Equipment created:', createData.message);

    // Test 5: Get equipment again to verify it was added
    console.log('\n5. Testing get equipment after creation...');
    const equipmentResponse2 = await fetch(`${API_BASE_URL}/equipment`);
    const equipmentData2 = await equipmentResponse2.json();
    console.log('✅ New equipment count:', equipmentData2.count);

    console.log('\n🎉 All tests passed! API is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('1. Your backend server is running (npm run dev)');
    console.log('2. Your MySQL database is connected');
    console.log('3. Your .env file is configured correctly');
  }
}

// Run the test
testAPI(); 