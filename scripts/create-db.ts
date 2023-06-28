import { createDbdata, filterHouses } from "../filterData"
import { HouseListingInstance } from '../Model'
import { FrHouseHit } from '../types/house-listing'
import db from "../db"

async function createDb(): Promise<void> {
  try{
    // Check if table exists in the database
    const tableCheckQuery = `
      SELECT name FROM sqlite_master
      WHERE type='table' AND name='house-listings-sm';
    `;
    const [result] = await db.query(tableCheckQuery);
    const tableExists = result.length > 0;

    if (tableExists) {
      console.log("Table 'house-listings-sm' already exists. Skipping creation.");
      return;
    }

    const data: FrHouseHit[] = await filterHouses()

    const houseListings = createDbdata(data)

    await HouseListingInstance.sync()
    await HouseListingInstance.bulkCreate(houseListings)
    console.log("Database created successfully.");
  }catch (e) {
    console.error(e)
  }
}

createDb()
