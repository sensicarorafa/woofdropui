export const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
};

export const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

export const showPosition = (position: GeolocationPosition) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const distance = getDistance(lat, lon, lat, lon);
    console.log("Distance: ", distance);
    return distance;
};

export const getLocation = () => {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition((position) => {
            return position;
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
};

export const watchLocation = (watch: boolean = true) => {
    if (watch) {
        if (navigator.geolocation) {
            return navigator.geolocation.watchPosition((position) => {
                return position;
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
};

export const capitalizeFirstLetter = (word: string | undefined): string => {
    const firstLetter = word?.charAt(0);
  
    const firstLetterCap = firstLetter?.toUpperCase();
  
    const remainingLetters = word?.slice(1);
  
    let capitalizedWord = "";
  
    if (firstLetterCap && remainingLetters) {
      capitalizedWord = firstLetterCap + remainingLetters;
    }
  
    return capitalizedWord;
};

export const capitalizeAllFirstLetters = (word?: string): string => {
    if (word) {
      let splitName = word.split(" ");
      splitName = splitName.map((name) => capitalizeFirstLetter(name));
      return splitName.join(" ");
    } else return "";
};
