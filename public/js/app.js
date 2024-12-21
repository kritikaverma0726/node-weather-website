const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        }
        else {
            weather = data.weather
            messageOne.textContent = data.location
            messageTwo.textContent = data.weather
            if(weather.split(" ").includes("Light")){
                document.getElementById("image").src = "/img/images.png"
            }
            else if(weather.split(" ").includes("heavy") || weather.split(" ").includes("Patchy")){
                document.getElementById("image").src = "/img/moderate or heavy rain shower.png"
            }
            else if(weather.split(" ").includes("Partly")){
                document.getElementById("image").src = "/img/weather.png"
            }
            else if(weather.split(" ").includes("Haze")){
                document.getElementById("image").src = "/img/haze.png"
            }
            else if(weather.split(" ").includes("Overcast")){
                document.getElementById("image").src = "/img/cloudy.png"
            }
            else {
                document.getElementById("image").src = "/img/sunny.png"
            }
        }
    })
})
})