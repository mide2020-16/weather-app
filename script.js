const button = document.querySelector("button i"),
  container = document.querySelector(".container"),
  imageDiv = document.querySelector(".image");
const image = document.querySelector("img"),
  temperatureDiv = document.querySelector(".temperature")

button.addEventListener("click", function () {
   
  const city = document.querySelector("input").value
  if (city === "") {
    return
  }
    container.style.height = "auto"
    container.style.borderRadius = "10px"
  console.log(city)
  const APIkey = '231b6d109df99a3b4e5b612444628f03'
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
    if (json.cod === '404') {
      
      temperatureDiv.style.display = "none"
      image.src = "images/error.jpg"
      const erParagraph = document.createElement("span")
      erParagraph.innerText = "This country does not exist"
      erParagraph.classList.add("error")
      imageDiv.appendChild(erParagraph)
      return
      }
      
      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/sunny.jpg"
          break;
        case "Rain":
          image.src = "images/rain.jpg"
          break;
        case "Snow":
          image.src = "images/snow.png"
          break;
        case "Clouds":
          image.src = "images/clouds.png"
          break;
        case "Haze":
          image.src = "images/haze.jpg"
          break;
        case "Dust":
          image.src = "images/dust.png"
          break;
        default:
          image.src = ""
          break
      }

      temperatureDiv.style.display = "flex"
      const tempDigi = document.querySelector(".temperature__digit"),
        tempDesc = document.querySelector(".temperature__description"),
        humidity = document.querySelector(".description__humidity"),
        wind = document.querySelector(".description__wind")
      
      tempDigi.textContent = `${parseInt(json.main.temp)}°C`
      tempDesc.textContent = `${json.weather[0].description}`
      humidity.textContent = `${parseInt(json.main.humidity)}%`
      wind.textContent = `${parseInt(json.wind.speed)}km/hr`
   })
})