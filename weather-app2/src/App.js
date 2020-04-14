import React, { Component } from 'react';
import './App.css';
import Radium from 'radium'
import * as C from './components'

const proxy = "https://cors-anywhere.herokuapp.com/"
var weather_data
var lat
var long
var Fare
var cels
var bg_url
var weather_type
var icon
class App extends Component {

  state={
    city:"",
    WindSpeed:"",
    Weather:"",
    city2:this.city,
    time:"",
    bg_url:'',
    F:"",
    unit:"C",
    weather_condition:"",
    opacity:false,
    Humidity:"50",
    Wind:"",
    Sunrise:"9.00",
    Sunset:"9.00",
    Rain:"50%",
    Low:"67",
    icon:""
  }

  componentDidMount = () => {
    var city1 = "mexico"
    this.setState({city:city1 , city2:city1 })
    this.BeforeLoad(city1) 
  }    
  
  
  handleChange = (event) => {
    var name = event.target.value
    this.setState({city:name})
  }

  handleClick = () => {
    if(this.state.unit==="C"){
      this.setState({unit:"F" , Weather:Fare })
    }
    else if(this.state.unit==="F"){
      this.setState({unit:"C" , Weather:cels })
    }
  }
  
  BeforeLoad=(a)=>{
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + a + ".json?access_token=pk.eyJ1IjoiamFnYWRoZWVzaDYiLCJhIjoiY2s3aXo4MTBlMG5xdDNrbHB1OXZ4NGdnNSJ9.BmItdc7_NyDeeUsFMNL2kA"
    fetch(url)
        .then(res => {
            return res.json()
        })
    .then(data => {
        if (data.features.length !== 0){
            lat = (data.features[0].geometry.coordinates[1])
            long = (data.features[0].geometry.coordinates[0])
            this.Weather()
        }
    })
}

  Weather=()=>{
    const api = proxy + "https://api.darksky.net/forecast/d3b28870fe6a9fcaa4351437b95b8135/"+lat+","+long+"?units=ca"
    fetch(api)
    .then(res=>{
    return res.json()
  }) 
  .then(data=>{
    weather_data=data
    this.AfterLoad()
})
}
  AfterLoad=()=>{
    var windspeed = weather_data.currently.windSpeed+" kmp"
    var celcius = Math.floor(weather_data.currently.temperature) +"°"
    var Far = "13°"
    var wc = weather_data.daily.data[0].icon
    console.log(wc)
    cels=celcius
    Fare=Far
    this.setState({Weather:cels,
                   WindSpeed:windspeed,
                   F:Fare,
                   weather_condition:wc,
                   Wind: Math.round(weather_data.currently.windSpeed)+" kph",
                   Humidity:weather_data.currently.humidity,
                   city2:this.state.city,
                   opacity:true
    })
    weather_type=this.state.weather_condition
    if(weather_type==="sunny"){ bg_url="https://i.redd.it/nzvvy9h9lhkx.jpg"; icon="icons/sun.png"; }
    else if(weather_type==="clear-day"){ bg_url="https://s3.envato.com/files/1646240/eveningclouds.jpg"; icon="icons/clear-day.png" }
    else if(weather_type==="cloudy" || weather_type==="partly-cloudy-day"){ bg_url="https://www.vmcdn.ca/f/files/sudbury/uploadedImages/news/localNews/rain-clouds.jpg;w=960"; icon="icons/cloudy.png" }
    else if(weather_type==="rain"){ bg_url="https://media.graytvinc.com/images/690*388/Rain+Clouds+Pixabay.jpg"; icon="icons/rain.png" }
    else if(weather_type==="snow"){ bg_url="https://c4.wallpaperflare.com/wallpaper/151/870/500/snow-trees-forest-nature-wallpaper-preview.jpg"; icon="icons/snow.png" }
    this.setState({bg_url:bg_url,icon:icon})
  }


  render(){
    return(
      <div className="body" style={{backgroundImage:'url('+this.state.bg_url+')'}} >
        <C.Search Click={()=>this.BeforeLoad(this.state.city,this.state.weather_condition)} city={this.state.city} Change={(event)=>this.handleChange(event)} />
        <C.Weather State={this.state}  Click={this.handleClick} />
        <C.Below State={this.state} />
      </div>
    )
  }
  }


export default Radium(App);