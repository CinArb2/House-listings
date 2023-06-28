require('dotenv').config()
import axios from 'axios'
import * as body from './body-request.json'
import _ from 'lodash'
import moment from 'moment'
import { FrHouseHit, FrHouseListing } from 'types/house-listing'
import { v4 as uuidv4 } from 'uuid'

const getAllHouseListings = async () => {
  try {
    return await axios.post(process.env.API_URL as string, body)
  } catch (error) {
    console.error(error)
  }
}

export const filterHouses = async () => {
  try {
    const response = await getAllHouseListings()
    const data = response?.data

    const filteredHouses = data.hits.hits.filter((el: any) => {
      const datePublished = el._source.listing.dates.published
      const date = moment.utc(datePublished)

      // Check if the date is not six months old
      const sixMonthsAgo = moment().subtract(6, 'months');
      return date.isAfter(sixMonthsAgo);
    })

    return filteredHouses
  } catch (error) {
    console.error(error)
  }
}

export const createDbdata = (data: FrHouseHit[]) => {
  const houseListings = data.map((house: FrHouseHit) => {
    const id = uuidv4()
    const listingDetails: FrHouseListing = house._source.listing

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
      location_commune: listingDetails.locations?.communes?.[0].name ?? '',
      locations_neighbourhood: listingDetails.locations?.neighbourhoods?.[0].name ?? ''
    }
  })

  return houseListings
}
