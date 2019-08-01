function setup() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            writeInformations(position.coords.latitude, position.coords.longitude)
        })
    }
}

setup()

function onButtonClick() {
    const latitude = document.getElementById('inputLatitude')
    const longitude = document.getElementById('inputLongitude')

    writeInformations(latitude.value, longitude.value)

    latitude.value = ''
    longitude.value = ''
}


function writeInformations(latitude, longitude) {

    const linkAPI = 'https://www.prevision-meteo.ch/services/json/lat=' + latitude + 'lng=' + longitude

    getRequest(linkAPI, function (request) {
        const json = JSON.parse(request)

        const firstInformation = document.getElementById('meteoDiv').firstChild
        const firstError = document.getElementById('errorDiv').firstChild

        if(firstInformation != undefined) {
            document.getElementById('informationsCoordinates').remove()
            document.getElementById('informationsConditions').remove()
            document.getElementById('informationsDate').remove()
            document.getElementById('informationsHour').remove()
            document.getElementById('informationsTemperature').remove()
            document.getElementById('informationsWindSpeed').remove()
            document.getElementById('informationsWindDirection').remove()
            document.getElementById('informationsHumidity').remove()
            document.getElementById('informationsElevation').remove()
            document.getElementById('informationsImage').remove()
            document.getElementById('informationsGIF').remove()

            document.getElementById('informationsTomorrowDate').remove()
            document.getElementById('informationsTomorrowCondition').remove()
            document.getElementById('informationsTomorrowTemperatureMinimum').remove()
            document.getElementById('informationsTomorrowTemperatureMaximum').remove()
            document.getElementById('informationsTomorrowImage').remove()
            document.getElementById('informationsTomorrowGIF').remove()
        }
        
        if(firstError != undefined) {
            firstError.innerHTML = ''
        }

        if(json.current_condition != undefined) {
            const currentCondition = json.current_condition.condition
            const currentDate = json.current_condition.date
            const currentHour = json.current_condition.hour
            const currentTemperature = json.current_condition.tmp
            const currentWindSpeed = json.current_condition.wnd_spd
            const currentWindDirection = json.current_condition.wnd_dir
            const currentHumidity = json.current_condition.humidity
            const currentElevation = json.forecast_info.elevation
        
            const currentImage = json.current_condition.icon_big
            

            const labelCoordinates = document.createElement('h2')
        
            labelCoordinates.innerHTML = 'Latitude : ' + latitude + ' / Longitude : ' + longitude
            labelCoordinates.style.fontFamily = 'Arial'
            labelCoordinates.style.textAlign = 'center'
            labelCoordinates.id = 'informationsCoordinates'

            const labelConditions = document.createElement('p')
        
            labelConditions.innerHTML = 'Conditions : ' + currentCondition
            labelConditions.style.fontFamily = 'Arial'
            labelConditions.style.textAlign = 'center'
            labelConditions.id = 'informationsConditions'
        
            const labelDate = document.createElement('p')
        
            labelDate.innerHTML = 'Date : ' + currentDate
            labelDate.style.fontFamily = 'Arial'
            labelDate.style.textAlign = 'center'
            labelDate.id = 'informationsDate'
        
            const labelHour = document.createElement('p')
        
            labelHour.innerHTML = 'Heure : ' + currentHour
            labelHour.style.fontFamily = 'Arial'
            labelHour.style.textAlign = 'center'
            labelHour.id = 'informationsHour'

            const labelTemperature = document.createElement('p')

            labelTemperature.innerHTML = 'Température : ' + currentTemperature + ' °C'
            labelTemperature.style.fontFamily = 'Arial'
            labelTemperature.style.textAlign = 'center'
            labelTemperature.id = 'informationsTemperature'
        
            const labelWindSpeed = document.createElement('p')
        
            labelWindSpeed.innerHTML = 'Vitesse du vent : ' + currentWindSpeed + ' km/h'
            labelWindSpeed.style.fontFamily = 'Arial'
            labelWindSpeed.style.textAlign = 'center'
            labelWindSpeed.id = 'informationsWindSpeed'
        
            const labelWindDirection = document.createElement('p')
        
            labelWindDirection.innerHTML = 'Direction du vent : ' + currentWindDirection
            labelWindDirection.style.fontFamily = 'Arial'
            labelWindDirection.style.textAlign = 'center'
            labelWindDirection.id = 'informationsWindDirection'

            const labelHumidity = document.createElement('p')
        
            labelHumidity.innerHTML = 'Humidité : ' + currentHumidity + ' %'
            labelHumidity.style.fontFamily = 'Arial'
            labelHumidity.style.textAlign = 'center'
            labelHumidity.id = 'informationsHumidity'

            const labelElevation = document.createElement('p')
        
            labelElevation.innerHTML = 'Altitude : ' + currentElevation + ' m'
            labelElevation.style.fontFamily = 'Arial'
            labelElevation.style.textAlign = 'center'
            labelElevation.id = 'informationsElevation'
        
            document.getElementById('meteoDiv').appendChild(labelCoordinates)
            document.getElementById('meteoDiv').appendChild(labelConditions)
            document.getElementById('meteoDiv').appendChild(labelDate)
            document.getElementById('meteoDiv').appendChild(labelHour)
            document.getElementById('meteoDiv').appendChild(labelTemperature)
            document.getElementById('meteoDiv').appendChild(labelWindSpeed)
            document.getElementById('meteoDiv').appendChild(labelWindDirection)
            document.getElementById('meteoDiv').appendChild(labelHumidity)
            document.getElementById('meteoDiv').appendChild(labelElevation)
        
            const IMG = document.createElement('img')

            IMG.src = currentImage
            IMG.style.cssFloat = 'center'
            IMG.id = 'informationsImage'

            const GIF = document.createElement('img')

            if(json.current_condition.condition_key === 'nuit-claire') {
                GIF.src = 'https://media.giphy.com/media/3ohze0k1Z43jsEJMCQ/giphy.gif'
            }else if(json.current_condition.condition_key === 'pluie-moderee') {
                GIF.src = 'https://media.giphy.com/media/1ipRdxBacFXBjoov2f/giphy.gif'
            }else if(json.current_condition.condition_key === 'eclaircies') {
                GIF.src = 'https://media.giphy.com/media/KV1s4kSJHaY3m/giphy.gif'
            }else if(json.current_condition.condition_key === 'fortement-nuageux') {
                GIF.src = 'https://media.giphy.com/media/5HK4TiiBeLSZq/giphy.gif'
            }else if(json.current_condition.condition_key === 'pluie-faible') {
                GIF.src = 'https://media.giphy.com/media/l2SqdlKgzWTH0pgK4/giphy.gif'
            }else if(json.current_condition.condition_key === 'faiblement-nuageux') {
                GIF.src = 'https://media.giphy.com/media/IxJ1Ch3cWrsRO/giphy.gif'
            }else if(json.current_condition.condition_key === 'nuit-nuageuse') {
                GIF.src = 'https://media.giphy.com/media/qbtSJYQgUIVgs/giphy.gif'
            }else if(json.current_condition.condition_key === 'developpement-nuageux') {
                GIF.src = 'https://media.giphy.com/media/dcJC4ypj9HuXC/giphy.gif'
            }else if(json.current_condition.condition_key === 'nuit-avec-developpement-nuageux') {
                GIF.src = 'https://media.giphy.com/media/l0HU7Cs5D0Gbo7G3S/giphy.gif'
            }else if(json.current_condition.condition_key === 'nuit-legerement-voilee') {
                GIF.src = 'https://media.giphy.com/media/13cbswY3dovmJq/giphy.gif'
            }else if(json.current_condition.condition_key === 'stratus-se-dissipant') {
                GIF.src = 'https://media.giphy.com/media/hL8a3mIQK8Ehy/giphy.gif'
            }else if(json.current_condition.condition_key === 'nuit-avec-averses') {
                GIF.src = 'https://media.giphy.com/media/qHWAmPd3SWyY0/giphy.gif'
            }else if(json.current_condition.condition_key === 'ciel-voile') {
                GIF.src = 'https://media.giphy.com/media/u01ioCe6G8URG/giphy.gif'
            }else if(json.current_condition.condition_key === 'ensoleille') {
                GIF.src = 'https://media.giphy.com/media/26hisNbqTHrCduoWQ/giphy.gif'
            }

            GIF.style.cssFloat = 'right'
            GIF.id = 'informationsGIF'
        
            document.getElementById('meteoDiv').appendChild(IMG)
            document.getElementById('gifDiv').appendChild(GIF)

            document.getElementById('hrDiv').appendChild(document.createElement('hr'))



            const tomorrowCondition = json.fcst_day_1.condition
            const tomorrowTemperatureMinium = json.fcst_day_1.tmin
            const tomorrowTemperatureMaximum = json.fcst_day_1.tmax
            const tomorrowImage = json.fcst_day_1.icon_big


            const labelTomorrow = document.createElement('h2')

            labelTomorrow.innerHTML = 'Demain (' + json.fcst_day_1.day_long + ')'
            labelTomorrow.style.fontFamily = 'Arial'
            labelTomorrow.style.textAlign = 'center'
            labelTomorrow.id = 'informationsTomorrowDate'

            const labelTomorrowCondition = document.createElement('p')

            labelTomorrowCondition.innerHTML = 'Conditions : ' + tomorrowCondition
            labelTomorrowCondition.style.fontFamily = 'Arial'
            labelTomorrowCondition.style.textAlign = 'center'
            labelTomorrowCondition.id = 'informationsTomorrowCondition'

            const labelTomorrowTemperatureMinimum = document.createElement('p')

            labelTomorrowTemperatureMinimum.innerHTML = 'Température minimum : ' + tomorrowTemperatureMinium + ' °C'
            labelTomorrowTemperatureMinimum.style.fontFamily = 'Arial'
            labelTomorrowTemperatureMinimum.style.textAlign = 'center'
            labelTomorrowTemperatureMinimum.id = 'informationsTomorrowTemperatureMinimum'

            const labelTomorrowTemperatureMaximum = document.createElement('p')

            labelTomorrowTemperatureMaximum.innerHTML = 'Température maximum : ' + tomorrowTemperatureMaximum + ' °C'
            labelTomorrowTemperatureMaximum.style.fontFamily = 'Arial'
            labelTomorrowTemperatureMaximum.style.textAlign = 'center'
            labelTomorrowTemperatureMaximum.id = 'informationsTomorrowTemperatureMaximum'

            document.getElementById('meteoTomorrowDiv').appendChild(labelTomorrow)
            document.getElementById('meteoTomorrowDiv').appendChild(labelTomorrowCondition)
            document.getElementById('meteoTomorrowDiv').appendChild(labelTomorrowTemperatureMinimum)
            document.getElementById('meteoTomorrowDiv').appendChild(labelTomorrowTemperatureMaximum)

            const tomorrowIMG = document.createElement('img')

            tomorrowIMG.src = tomorrowImage
            tomorrowIMG.style.cssFloat = 'center'
            tomorrowIMG.id = 'informationsTomorrowImage'

            const tomorrowGIF = document.createElement('img')

            if(json.fcst_day_1.condition_key === 'nuit-claire') {
                tomorrowGIF.src = 'https://media.giphy.com/media/3ohze0k1Z43jsEJMCQ/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'pluie-moderee') {
                tomorrowGIF.src = 'https://media.giphy.com/media/1ipRdxBacFXBjoov2f/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'eclaircies') {
                tomorrowGIF.src = 'https://media.giphy.com/media/KV1s4kSJHaY3m/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'fortement-nuageux') {
                tomorrowGIF.src = 'https://media.giphy.com/media/5HK4TiiBeLSZq/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'pluie-faible') {
                tomorrowGIF.src = 'https://media.giphy.com/media/l2SqdlKgzWTH0pgK4/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'faiblement-nuageux') {
                tomorrowGIF.src = 'https://media.giphy.com/media/IxJ1Ch3cWrsRO/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'nuit-nuageuse') {
                tomorrowGIF.src = 'https://media.giphy.com/media/qbtSJYQgUIVgs/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'developpement-nuageux') {
                tomorrowGIF.src = 'https://media.giphy.com/media/dcJC4ypj9HuXC/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'nuit-avec-developpement-nuageux') {
                tomorrowGIF.src = 'https://media.giphy.com/media/l0HU7Cs5D0Gbo7G3S/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'nuit-legerement-voilee') {
                tomorrowGIF.src = 'https://media.giphy.com/media/13cbswY3dovmJq/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'stratus-se-dissipant') {
                tomorrowGIF.src = 'https://media.giphy.com/media/hL8a3mIQK8Ehy/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'nuit-avec-averses') {
                tomorrowGIF.src = 'https://media.giphy.com/media/qHWAmPd3SWyY0/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'ciel-voile') {
                tomorrowGIF.src = 'https://media.giphy.com/media/u01ioCe6G8URG/giphy.gif'
            }else if(json.fcst_day_1.condition_key === 'ensoleille') {
                tomorrowGIF.src = 'https://media.giphy.com/media/26hisNbqTHrCduoWQ/giphy.gif'
            }

            tomorrowGIF.style.cssFloat = 'right'
            tomorrowGIF.id = 'informationsTomorrowGIF'

            document.getElementById('meteoTomorrowDiv').appendChild(tomorrowIMG)
            document.getElementById('gifTomorrowDiv').appendChild(tomorrowGIF)


            if(window.innerHeight < 1200) {
                document.getElementsByTagName('h1').innerHTML = 'jc Meteo'
            }
        }else{
            const labelError = document.createElement('h2')

            labelError.innerHTML = 'ERREUR : Vos localisations sont mauvaises.'
            labelError.style.fontFamily = 'Arial'
            labelError.style.textAlign = 'center'
            labelError.id = 'error'

            document.getElementById('errorDiv').appendChild(labelError)
        }
    })
}

function getRequest(url, callback) {
    const request = new XMLHttpRequest()

    request.open('GET', url)

    request.addEventListener('load', function (response) {
        if(request.status >= 200 && request.status < 400) {
            callback(request.responseText)
		}else{
            const labelError = document.createElement('p')

            labelError.innerHTML = 'ERROR : ' + request.status
            labelError.style.textAlign = 'center'
            labelError.style.color = 'whitesmoke'

            document.getElementById('meteoDiv').appendChild(labelError)
        }
    })

    request.addEventListener('loadstart', function (response) {
        const loadIMG = document.createElement('img')

        loadIMG.src = '/loading.gif'

        document.getElementById('loadingDiv').appendChild(loadIMG)
    })

    request.addEventListener('loadend', function (response) {
        const loadIMG = document.getElementById('loadingDiv').firstChild

        if(typeof loadIMG !== undefined) {
            loadIMG.remove()
        }
    })

    request.addEventListener('error', function (response) {
        const labelError = document.createElement('h2')

        labelError.innerHTML = 'Erreur : Mauvaise connection avec internet. Veuillez rafraichir la page.'
        labelError.style.textAlign = 'center'
        labelError.style.color = 'whitesmoke'

        document.getElementById('meteoDiv').appendChild(labelError)
    })

    request.send(null)
} 


document.addEventListener('keypress', function (e) {
    if(e.keyCode === 13) {
        onButtonClick()
    }
})
