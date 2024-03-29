import { create } from 'zustand';

export const useStore = create((set) => ({
    
    // pages
    pageSize: 10,
    pageNum: 0,

    // office
    latitude: 52.2297,
    longitude: 21.0122,
    availableFrom: new Date(),
    availableTo: new Date(),
    maxDistance: "",
    name: "",
    minPrice: "",
    maxPrice: "",
    amenities: [],
    officeType: "4",
    minRating: 0,
    minArea: "",
    sort: "",
    sortOrder: "",
    startDate: new Date(new Date().getTime() + (24 * 60 * 60 * 1000)),
    endDate: new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)),

    officeId: 41,

    parkingId: 0,
    parkingIso3166Country: 'PL',
    parkingCityName: 'Lodz',
    parkingPostalCode: '90-001',
    parkingStreetName: 'Piotrkowska',
    parkingBuildingNumber: '1415',
    parkingLongitude: 19.45415,
    parkingLatitude: 51.76873,
    parkingDailyCost: 9,
    parkingDistanceKm: 1.8,

    cityName: "",
    countryCode: "",

    parkingToken: "",

    // Setters
    setParkingIso3166Country: (newValue) => set({ parkingIso3166Country: newValue }),
    setParkingCityName: (newValue) => set({ parkingCityName: newValue }),
    setParkingPostalCode: (newValue) => set({ parkingPostalCode: newValue }),
    setParkingStreetName: (newValue) => set({ parkingStreetName: newValue }),
    setParkingBuildingNumber: (newValue) => set({ parkingBuildingNumber: newValue }),
    setParkingLongitude: (newValue) => set({ parkingLongitude: newValue }),
    setParkingLatitude: (newValue) => set({ parkingLatitude: newValue }),
    setParkingDailyCost: (newValue) => set({ parkingDailyCost: newValue }),
    setParkingDistanceKm: (newValue) => set({ parkingDistanceKm: newValue }),

    setPageSize: (newValue) => set({ pageSize: newValue }),
    setPageNum: (newValue) => set({ pageNum: newValue }),
    setLatitude: (newValue) => set({ latitude: newValue }),
    setLongitude: (newValue) => set({ longitude: newValue }),
    setAvailableFrom: (newValue) => set({ availableFrom: newValue }),
    setAvailableTo: (newValue) => set({ availableTo: newValue }),
    setMaxDistance: (newValue) => set({ maxDistance: newValue }),
    setName: (newValue) => set({ name: newValue }),
    setMinPrice: (newValue) => set({ minPrice: newValue }),
    setMaxPrice: (newValue) => set({ maxPrice: newValue }),
    setAmenities: (newValue) => set({ amenities: newValue }),
    setOfficeType: (newValue) => set({ officeType: newValue }),
    setMinRating: (newValue) => set({ minRating: newValue }),
    setMinArea: (newValue) => set({ minArea: newValue }),
    setSort: (newValue) => set({ sort: newValue }),
    setSortOrder: (newValue) => set({ sortOrder: newValue }),
    setStartDate: (newValue) => set({ startDate: newValue }),
    setEndDate: (newValue) => set({ endDate: newValue }),
    
    setOfficeId: (newValue) => set({ officeId: newValue }),
    setParkingId: (newValue) => set({ parkingId: newValue }),

    setCityName: (newValue) => set({ cityName: newValue }),
    setCountryCode: (newValue) => set({ countryCode: newValue }),

    setParkingToken: (newValue) => set({ parkingToken: newValue }),

    setDefault: () => {
        set({
          pageSize: 10,
          pageNum: 0,
          latitude: 52.2297,
          longitude: 21.0122,
          availableFrom: new Date(),
          availableTo: new Date(),
          maxDistance: "",
          name: "",
          minPrice: "",
          maxPrice: "",
          amenities: [],
          officeType: "OFFICE",
          minRating: 0,
          minArea: "",
          sort: "",
          sortOrder: "",
          officeId: 41,
        });
      },

}));