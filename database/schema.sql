-- Create todo table
CREATE TABLE todo (
  id SERIAL PRIMARY KEY,
  newitem VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_todo_created_at ON todo(created_at DESC);
