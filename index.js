const userTab=document.querySelector("[data-userweather]") ;
const searchTab=document.querySelector("[data-searchweather]");
const userContainer=document.querySelector(".weather-container");
const grantAccesContainer=document.querySelector(".grant-location-container");
const searchForm=document.querySelector("[data-searchforcity]")

const loadingScreen=document.querySelector(".loading-Container");
const userInfoContainer=document.querySelector(".user-info-container");

const notFound = document.querySelector('.errorContainer');
const errorBtn = document.querySelector('[data-errorButton]');
const errorText = document.querySelector('[data-errorText]');
const errorImage = document.querySelector('[data-errorImg]');
let oldTab=userTab;
const API_KEY="1165bf74e7a682011598858bdd4e4522";
oldTab.classList.add("current-tab");
function switchTab(newTab) {
    if(newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            searchForm.classList.add("active");
            userInfoContainer.classList.remove("active");
            grantAccesContainer.classList.remove("active"); 
        }
        else{
            searchForm.classList.remove("active");
            userContainer.classList.remove("active"); 
            getfromSessionStorage();
        }
    }
}
 


userTab.addEventListener("click",()=>{
    switchTab(userTab);
});
searchTab.addEventListener("click",()=>{
    switchTab(searchTab);
});

function getfromSessionStorage(){
const localCoordinates=sessionStorage.getItem("user-Coordinates");
if(!localCoordinates){
    grantAccesContainer.classList.add("active");
}
else{
    const coordinate=JSON.parse(localCoordinates); 

 fetchUserInfo(coordinate);
}
}

async function fetchUserInfo(coordinate){
    const {lat,lon}=coordinate;
    //make grant access conatianer invisible
    grantAccesContainer.classList.remove("active");
    
    //loading screen active
    loadingScreen.classList.add("active"); 
    try{
const response= await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
   
);
const data=await response.json();
loadingScreen.classList.remove("active"); 
userInfoContainer.classList.add("active");
renderWeatherInfo(data);

    }
    catch(err){
        loadingScreen.classList.remove("active");
        // loadingContainer.classList.remove('active');
        notFound.classList.add('active');
        errorImage.style.display = 'none';
        errorText.innerText = `Error: ${err?.message}`;
        errorBtn.style.display = 'block';
        errorBtn.addEventListener("click", fetchWeatherInfo);

    }
}

function renderWeatherInfo(weatherInfo){
    const cityName=document.querySelector('[data-cityName]');
    const countryIcon=document.querySelector('[data-countryicon]');
    const desc=document.querySelector('[data-weatherDesc]');
    const weatherIcon=document.querySelector('[data-weatherIcon]');
    const temp=document.querySelector('[data-temperature]');
    const windspeed=document.querySelector('[data-windSpeed]');
    const humidity=document.querySelector('[data-humidity]');
    const cloudiness=document.querySelector('[data-Clouds]');
    console.log(weatherInfo)

    //fetch values from weatherInfo object and put it into ui elements

    cityName.innerText=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp} °C`;
    windspeed.innerText=`${weatherInfo?.wind?.speed} m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity} %`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all} %`;
    


}

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    else{
        alert("No geolocation support available");
    }
}

function showPosition(position){
    const userCoordinates={
        lat:position.coords.latitude,
        lon:position.coords.longitude,
    
    }
    sessionStorage.setItem("user-Coordinates",JSON.stringify(userCoordinates)); 
    fetchUserInfo(userCoordinates); 
} 
const grantAccess=document.querySelector('[data-grantaccess]');
grantAccesContainer.addEventListener('click',getLocation);
let searchInput=document.querySelector("[data-searchInput]")
searchForm.addEventListener("submit",(e)=>{
     e.preventDefault();
     let cityName=searchInput.value;

     if(cityName ==="")return;
     else{
        fetchSearchWeatherInfo(cityName); 

     }
     
});

async function fetchSearchWeatherInfo(city){
loadingScreen.classList.add("active");
userInfoContainer.classList.remove("active");
grantAccesContainer.classList.remove("active");
notFound.classList.remove("active");
try{
    const response= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
       
    );
    const data=await response.json();
    loadingScreen.classList.remove("active"); 
    userInfoContainer.classList.add("active");
    renderWeatherInfo(data);
        

}
catch(e){
    loadingContainer.classList.remove('active');
    userInfoContainer.classList.remove('active');
    notFound.classList.add('active');
    errorText.innerText = `${err?.message}`;
    errorBtn.style.display = "none";
}

}



