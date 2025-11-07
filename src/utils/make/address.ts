
interface IAddress {
    city: number,
    district: number,
    ward: number,
    addressLine: number,
    latitude: string,
    longitude: string,
}

const address = (address: IAddress) => {
    const { city, district, ward, addressLine, latitude, longitude } = address;

    return {
        city: String(city),
        district: String(district),
        ward: String(ward),
        addressLine: String(addressLine),
        latitude: latitude,
        longitude: longitude
    } as unknown;
};

export default address;