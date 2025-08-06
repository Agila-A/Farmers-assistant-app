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

-- Create indexes for better performance
CREATE INDEX idx_date ON budgetTracker(date);
CREATE INDEX idx_category ON budgetTracker(category);
CREATE INDEX idx_created_at ON budgetTracker(created_at);

-- Insert sample data for testing
INSERT INTO budgetTracker (title, amount, description, category, date) VALUES
('Manure Purchase', 1100.00, 'Organic manure for crops', 'Manure', '2024-08-18'),
('Fertilizers', 2800.00, 'Chemical fertilizers for better yield', 'Fertilizers', '2024-08-18'),
('Seeds', 1000.00, 'High-quality seeds for planting', 'Seeds', '2024-08-18'),
('Tractor Service', 5024.00, 'Tractor rental for field preparation', 'Machines', '2024-08-17'); 
