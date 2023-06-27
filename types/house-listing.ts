interface HouseContactEmail {
    email: string
}

interface HouseContactPhone {
    phone_number: string
}

interface HouseContact {
    emails: HouseContactEmail[] | undefined,
    phones: HouseContactPhone[] | undefined
}

interface HouseClient {
    first_name: string,
    last_name: string,
    company_name: string
}

interface HouseType {
    name: "Proyecto" | "Apartamento",
}

interface HouseDates {
    published: string,
}

interface HouseNeighbourhoods {
    name: string,
}

interface HouseCommunes {
    name: string,
}

interface HouseLocation {
    communes: HouseCommunes[] | undefined,
    neighbourhoods: HouseNeighbourhoods[] | undefined,
}

export interface FrHouseListing {
    area: string,
    price: string,
    contact: HouseContact,
    client: HouseClient,
    locations: HouseLocation,
    fr_property_id: number,
    dates: HouseDates,
    property_type: HouseType[]
}

export interface HouseListing extends Pick<FrHouseListing, "area" | "price" | "fr_property_id"> {
    id: string,
    agency_name: HouseClient['company_name'],
    owner_name: HouseClient['first_name'],
    owner_last_name: HouseClient['last_name'],
    date_published: HouseDates['published'],
    contact_email: HouseContactEmail['email'],
    contact_phone: HouseContactPhone['phone_number'],
    property_type: HouseType['name'],
    location_commune: HouseCommunes['name'],
    locations_neighbourhood: HouseNeighbourhoods['name'],
}

export interface FrHouseHit {
    _index: string,
    _id: string,
    _score: number,
    _source: { listing: FrHouseListing }
}
