console.log("hello ji kaise ho saare aane");
const API_KEY="1165bf74e7a682011598858bdd4e4522";

function renderWeatherInfo(){
    let newPara=document.createElement('p');

    newPara.textContent=`${data?.main?.temp.toFixed(2)} °F`;
 
    document.body.appendChild(newPara);
}

async function showWeather(){
    try{
        let lat=25.3333;
    let lon=54.0033;

    // let city="goa";
    

    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    const data= await response.json();
    console.log("Weather data ->",data);  
    
    renderWeatherInfo(data);

    }  
    catch(err){
         
    }
}

async function getCustomWeatherDetails(){
    try{
        let lat=25.3333;
    let lon=54.0033;

    let response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);

    let data=await response.json();
    console.log(data);
    }
    catch(e){
        console.log("Error Found"+err);  
    }
}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else{
        console.log("No Location support"); 
    }
}

function showPosition(position){
    let lat=position.coords.latitude;
    let lon=position.coords.longitude;

    console.log(lat);
    console.log(lon);
}