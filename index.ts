import express, {Application, Request, Response} from 'express'
import {filterHouses} from './filterData'
import db from './db'
import { v4 as uuidv4 } from 'uuid'
import { HouseListingInstance } from './Model'
import { FrHouseHit, HouseListing } from './types/house-listing'

db.sync().then(() => {
  console.log('connect to Database')
})

const app: Application = express()

/*
 * TODO: first I need to validate if db is already created and then check that
 * there are not multiples fr_property_id in db

app.get('/api/listings/refresh', async (_req: Request, res: Response) => {
  try{
    const data = await filterHouses()

    const houseListings = data.map((house: FrHouseHit) => {
      const id = uuidv4()
      const listingDetails = house._source.listing

      return {
        id,
        area: listingDetails.area,
        price: listingDetails.price,
        fr_property_id: listingDetails.fr_property_id,
        agency_name: listingDetails.client.company_name,
        owner_name: listingDetails.client.first_name,
        owner_last_name: listingDetails.client.last_name,
        date_published: listingDetails.dates.published,
        contact_email: listingDetails.contact.emails?.[0].email ?? '',
        contact_phone: listingDetails.contact.phones?.[0].phone_number ?? '',
        property_type: listingDetails.property_type[0].name,
        location_commune: listingDetails.locations.communes?.[0].name ?? '',
        locations_neighbourhood: listingDetails.locations.neighbourhoods?.[0].name ?? ''
      }
    })
    const record = await HouseListingInstance.bulkCreate(houseListings)
    return res.json({ record, msg: "Successfully created" })
  }catch (e) {
    return res.json({ msg: "fail to create", status: 500, error: e });
  }
})
*/

app.get('/api/listings', (_req: Request, res: Response): void => {
  res.send('get list of houses!!')
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`listing on ${PORT}`)
})
