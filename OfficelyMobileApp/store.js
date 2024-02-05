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
    officeType: "",
    minRating: 0,
    minArea: "",
    sort: "",
    sortOrder: "",

    officeId: 41,

    // Setters
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
    
    setOfficeId: (newValue) => set({ officeId: newValue }),

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
          officeType: "",
          minRating: 0,
          minArea: "",
          sort: "",
          sortOrder: "",
          officeId: 41,
        });
      },

}));


// const {
//     pageSize, setPageSize,
//     pageNum, setPageNum,
//     latitude, setLatitude,
//     longitude, setLongitude,
//     availableFrom, setAvailableFrom,
//     availableTo, setAvailableTo,
//     maxDistance, setMaxDistance,
//     name, setName,
//     minPrice, setMinPrice,
//     maxPrice, setMaxPrice,
//     amenities, setAmenities,
//     officeType, setOfficeType,
//     minRating, setMinRating,
//     minArea, setMinArea,
//     sort, setSort,
//     sortOrder, setSortOrder,
//   } = useStore();