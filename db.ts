import { Sequelize } from "sequelize"

// Define the Sequelize instance  that represents the database connection
const db = new Sequelize('house-listings-sm','', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false
})

export default db
