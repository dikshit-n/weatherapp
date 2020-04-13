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
class App extends Component {

  state={
    city:"",
    WindSpeed:"",
    Weather:"",
    city2:this.city,
    time:"",
    url:'',
    F:"",
    unit:"C",
    weather_condition:""
  }

  componentDidMount = () => {
    var city1 = "mexico"
    var time1=13
    this.setState({city:city1})
    this.setState({city2:city1})
    this.setState({time:time1})
    this.BeforeLoad(city1,time1) 
  }    
  
  
  handleChange = (event) => {
    var name = event.target.value
    this.setState({city:name})
  }

  handleClick = () => {
    if(this.state.unit==="C"){
      this.setState({unit:"F"})
      this.setState({Weather:Fare})
    }
    else if(this.state.unit==="F"){
      this.setState({unit:"C"})
      this.setState({Weather:cels})
    }
    console.log(this.state.unit)
  }
  
  BeforeLoad=(a,time)=>{
    var time2=time
    if (time2>=6 && time2<12)
      this.setState({url:"https://ak1.picdn.net/shutterstock/videos/1927591/thumb/4.jpg"})
    else if(time2>=12 && time2<17)
      this.setState({url:"https://s3.envato.com/files/1646240/eveningclouds.jpg"})
    else if(time2>=17 && time2<=19)
      this.setState({url:"https://cdn62.picsart.com/186281275001202.jpg?type=webp&to=min&r=640"})
    else if(time2>19)
      this.setState({url:"https://s1.1zoom.me/b3337/445/Sky_Clouds_Moon_558021_2560x1440.jpg"})
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
    const api = proxy + "https://api.darksky.net/forecast/d3b28870fe6a9fcaa4351437b95b8135/"+lat+","+long+"?units=si"
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
    var wc = "Sunny"
    this.setState({WindSpeed:windspeed})
    cels=celcius
    Fare=Far
    this.setState({Weather:cels})
    this.setState({F:Fare})
    this.setState({weather_condition:wc})
    console.log("WINDSPEED:",windspeed)
    console.log("WEATHER:",celcius)
    console.log(this.state.city)
    this.setState({city2:this.state.city})
  }


  render(){
    return(
      <div className="body" style={{backgroundImage:'url('+this.state.url+')'}} >
        <C.Search Click={()=>this.BeforeLoad(this.state.city)} city={this.state.city} Change={(event)=>this.handleChange(event)} />
        <C.Weather Weather={this.state.Weather} WindSpeed={this.state.WindSpeed} Weather_condition={this.state.weather_condition} Country={this.state.city2} Click={this.handleClick} />
        <div className="below">
          <div className="weather-details">
              <C.Weather_details name="HUMIDITY" />
              <C.Weather_details name="HUMIDITY" />
              <C.Weather_details name="HUMIDITY" />
              <C.Weather_details name="HUMIDITY" />
              <C.Weather_details name="HUMIDITY" />
              <C.Weather_details name="HUMIDITY" />
          </div>
          
        </div>
      </div>
    )
  }
  }

export default Radium(App);
