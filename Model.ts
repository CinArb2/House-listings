import { DataTypes, Model } from "sequelize"
import { HouseListing } from "./types/house-listing"
import db from "./db"

export class HouseListingInstance extends Model<HouseListing> {}

HouseListingInstance.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  fr_property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  agency_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  owner_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  owner_last_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_published: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact_phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  property_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location_commune: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  locations_neighbourhood: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  tableName: 'house-listings-sm'
})
