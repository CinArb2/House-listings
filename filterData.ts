require('dotenv').config()
import axios from 'axios'
import * as body from './body-request.json'
import _ from 'lodash'
import moment from 'moment'

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
