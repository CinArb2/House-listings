import express, { Application, Request, Response } from 'express'
import db from './db'
import { HouseListingInstance } from './Model'
import { createDbdata, filterHouses } from './filterData'
import { FrHouseHit } from './types/house-listing'

db.sync().then(() => {
  console.log('connect to Database')
})

const app: Application = express()

app.get('/api/listings/refresh', async (_req: Request, res: Response) => {
  const latestHouseListing: FrHouseHit[] = await filterHouses()
  const houseListingDb = await HouseListingInstance.findAll()

  const missingHouseListings: FrHouseHit[] = latestHouseListing.filter(({ _source }) => {
    const frPropertyId = _source.listing.fr_property_id;
    return !houseListingDb.some((houseDb) => houseDb.getDataValue('fr_property_id') === frPropertyId);
  })

  let record: HouseListingInstance[] = []

  if(missingHouseListings.length > 0) {
    const dbData = createDbdata(missingHouseListings)
    record = await HouseListingInstance.bulkCreate(dbData)
  }

  res.status(200).json({
    record,
  })
})

app.get('/api/listings', async (_req: Request, res: Response) => {
  const houseList = await HouseListingInstance.findAll()
  res.status(200).json({
    houseList,
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`)
})
