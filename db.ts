import { Sequelize } from "sequelize"


const db = new Sequelize('house-listings-sm','', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false
})

export default db
