
const apiUrl1="https://parkingi.azurewebsites.net";
const apiUrl2="https://parkingi.azurewebsites.net";
const apiUrl3="https://3f19-194-29-137-24.ngrok-free.app";
//            'Accept': '*/*',
export const getCityAndCountry = async (latitude, longitude) => {
    try {
    const apiKey = "AIzaSyCu4u7lfHE-XWI8Bh1AOeLn0SoUw_kRXOU";
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
  
      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.results.length > 0) {
        const addressComponents = data.results[0].address_components;
  
        let cityName = '';
        let countryCode = '';
  
        // Pobierz nazwę miejscowości i kod kraju z odpowiedzi
        for (let component of addressComponents) {
          if (component.types.includes('locality')) {
            cityName = component.long_name;
          } else if (component.types.includes('country')) {
            countryCode = component.short_name;
          }
        }
  
        return { cityName, countryCode };
      } else {
        throw new Error('Nie znaleziono danych geolokalizacyjnych');
      }
    } catch (error) {
      console.error('Błąd w pobieraniu danych geolokalizacyjnych:', error);
      throw error;
    }
  };
  
export const getParklyToken = async () => {
      try {
        const response = await fetch(`${apiUrl1}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: "partner@officely.com",
            password: "zaq1@WSX"
          }),
        });
  
        const data = await response.json();
        return data.jwttoken;
      } catch (error) { }
};
  
export const getParkings = async (countryCode,cityName,availableFrom,availableTo,latitude,longitude,token) => {
    try {
        const queryParams = new URLSearchParams({
            countryName: countryCode,
            cityName: cityName,
            startDateTime: availableFrom,
            endDateTime: availableTo,
            dailyCostMin: 1,
            dailyCostMax: 1000,
            searchLatitude: latitude,
            searchLongitude: longitude,
            searchRadius: 25,
            page: 0,
            size: 10,
        });
        //const url = `${apiUrl1}/user/car_park?${queryParams.toString()}`;

        const url = `${apiUrl1}/user/car_park?countryName=${countryCode}&cityName=${cityName}&startDateTime=${availableFrom}&endDateTime=${availableTo}&dailyCostMin=1&dailyCostMax=1000&searchLatitude=${latitude}&searchLongitude=${longitude}&searchRadius=25&page=0&size=10`;
        console.log(url);
        
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',

        },
        });

return response;
    } catch (error) {
        console.log(error);
     }
};