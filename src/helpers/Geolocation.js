import {usersCollection} from '../services/firebase'

function getCoordinates(id) { 
    var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
    }; 

    function success(pos) { 
        var crd = pos.coords; 
        var lat = crd.latitude.toString(); 
        var lng = crd.longitude.toString(); 
        var coordinates = [lat, lng];
        getCity(coordinates, id);
        return;
    } 

    function error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`); 
    } 

    navigator.geolocation.getCurrentPosition(success, error, options); 
} 

function getCity(coordinates, id) { 
    var xhr = new XMLHttpRequest(); 
    var lat = coordinates[0]; 
    var lng = coordinates[1]; 

    xhr.open('GET', " https://us1.locationiq.com/v1/reverse.php?key=" + process.env.REACT_APP_LOCATION_IQ + "&lat=" + lat + "&lon=" + lng + "&format=json", true); 
    xhr.send(); 
    xhr.onreadystatechange = processRequest; 
    xhr.addEventListener("readystatechange", processRequest, false); 

    function processRequest() { 
        if (xhr.readyState === 4 && xhr.status === 200) { 
            var response = JSON.parse(xhr.responseText);
            usersCollection.doc(id).set({location: response.address.city}, {merge: true});
        } 
    } 
} 

export default getCoordinates;