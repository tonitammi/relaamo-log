const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
}

interface LocationError {
  code: number;
  message: string;
}

export const getLocation = (): Promise<GeolocationPosition | LocationError> => {
  
  return new Promise((resolve, reject) => {
    const success = (pos: GeolocationPosition): void => {
      const crd = pos.coords;
  
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      resolve(pos);
    }
  
    const error = (err: LocationError): void => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      reject(err);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  })
}

export const getCity = async (lat: number, long: number) => {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&apiKey=ffd38ab51c79461f80cb3fef2b657699`;
  const options = { method: "GET" };

  const res = await fetch(url, options);
  const data = await res.json();

  if(data.features.length === 0) throw Error("Sijaintia ei löytynyt");
  
  return {
    city: data.features[0].properties?.city,
    county: data.features[0].properties?.county
  }
}

