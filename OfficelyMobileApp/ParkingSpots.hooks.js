

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
        const response = await fetch('https://parkingi.azurewebsites.net/auth/login', {
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
        const url = `https://parkingi.azurewebsites.net/user/car_park?${queryParams.toString()}`;
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
        console.log(error);
     }
};