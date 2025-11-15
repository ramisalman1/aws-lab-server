# Todo Application - Express.js + PostgreSQL

A simple but complete Todo API built with Express.js and PostgreSQL on AWS RDS.

## Project Structure

```
todo-app/
├── config/
│   └── db.js              # Database connection configuration
├── db/
│   └── queries.js         # Database queries
├── controllers/
│   └── todoController.js  # Route controllers
├── routes/
│   └── todoRoutes.js      # API routes
├── database/
│   └── schema.sql         # Database schema
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── server.js              # Main Express server
└── package.json           # Dependencies
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create database schema:**
   Connect to your RDS PostgreSQL database and run:
   ```sql
   CREATE TABLE todo (
     id SERIAL PRIMARY KEY,
     newitem VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

3. **Configure environment variables:**
   Edit `.env` with your RDS credentials:
   ```
   NODE_ENV=development
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=your-rds-endpoint.rds.amazonaws.com
   DB_PORT=5432
   DB_DATABASE=crud
   ```

4. **Ensure RDS Security Group allows EC2 connection:**
   - Inbound rule: PostgreSQL (TCP 5432) from your EC2 security group

5. **Start the server:**
   ```bash
   npm start        # Production
   npm run dev      # Development with nodemon
   ```

## API Endpoints

### Get all todos
```
GET /api/todos
```
**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "newitem": "Buy groceries" }
  ]
}
```

### Create a todo
```
POST /api/todos
Content-Type: application/json

{
  "newItem": "Buy groceries"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "id": 1, "newitem": "Buy groceries" }
}
```

### Update a todo
```
PUT /api/todos/:id
Content-Type: application/json

{
  "newItem": "Buy groceries and cook"
}
```
**Response:**
```json
{
  "success": true,
  "data": { "id": 1, "newitem": "Buy groceries and cook" }
}
```

### Delete a specific todo
```
DELETE /api/todos/:id
```
**Response:**
```json
{
  "success": true,
  "message": "Todo deleted"
}
```

### Delete all todos
```
DELETE /api/todos
```
**Response:**
```json
{
  "success": true,
  "message": "All todos deleted"
}
```

### Health check
```
GET /health
```
**Response:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

## Troubleshooting

### pg_hba.conf error
- Check RDS security group allows inbound traffic from EC2
- Verify DB credentials in `.env`
- Ensure SSL is configured properly

### Connection timeout
- Test with: `telnet your-rds-endpoint.rds.amazonaws.com 5432`
- Check EC2 and RDS are in same VPC or RDS is publicly accessible

### Table doesn't exist
- Run the schema.sql to create the table
- Verify you're querying the correct database

## Development

To add a new feature:
1. Add database query in `db/queries.js`
2. Add controller logic in `controllers/todoController.js`
3. Add route in `routes/todoRoutes.js`
4. Test with curl or Postman
