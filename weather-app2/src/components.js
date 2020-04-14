 import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Weather extends React.Component{
    render=()=>{
        var country_name=this.props.State.city2;
        if(country_name!==undefined){
            country_name=country_name.split(",")
            country_name=country_name[0]
            country_name=country_name.split(" ")
            if(country_name[1]!==undefined)
            country_name=country_name[0]+" "+country_name[1]
            else
            country_name=country_name[0]
        }
        // if(this.props.Weather_condition==="Sunny")
        var mn = this.props.State.icon
        var classn
        if(this.props.State.opacity){
            classn="bind true"
        }
        else{
            classn="bind false"
        }
        return(
            <div className="weath-dept">
                <div className={classn} >
                    <Show_Country Country_name={country_name} />
                    <Show_Weather Picture={mn} Weather={this.props.State.Weather} Click={this.props.Click} />
                    <Weather_Condition Weather_condition={this.props.State.weather_condition} />
                </div>
            </div>
        )
    }
}

const Show_Country = props => {
    return (
        <div className="show-country">
            {props.Country_name}
        </div>
    )
}

const Show_Weather = props => {
    return(
        <div className="show-weather">
                <div className="icon"><img src={require(`./${props.Picture}`)} className="image" alt="img" /></div>
                <div className="we">{props.Weather}</div>
                <div className="celcius-fahrenheit">
                    <div className="one" id="o">C</div>
                    <div className="two" id="t" onClick={props.Click}>F</div>
                </div>
        </div>
    )
}

const Weather_Condition = props => {
    return(
        <div className="weather-condition">
            {props.Weather_condition}
        </div>
    )
}

const Below = props => {
    return(
        <div className="below">
          <div className="weather-details">
            <div className="ab">
              <Weather_details name="Humidity" Value={props.State.Humidity} />
              <Weather_details name="Wind" Value={props.State.Wind} />
              <Weather_details name="Sunrise" Value={props.State.Sunrise} />
            </div>
            <div className="ab">
              <Weather_details name="Low" Value={props.State.Low} />
              <Weather_details name="Rain" Value={props.State.Rain} />
              <Weather_details name="Sunset" Value={props.State.Sunset} />
            </div>
          </div>
        </div>
    )
}

const Search = props => {
    return(
        <div className="search-area" >
                <input spellCheck="false" className="textbox" type="textbox" placeholder="Search.." value={props.city} onChange={props.Change} />
                <div className="search" >
                    <FontAwesomeIcon icon={faSearch} onClick={props.Click} />
                </div>
        </div>
    )
}

const Weather_details = props => {
    return(
        <div className="inner" >
            <div className="other">{props.Value}</div>
            <div>{props.name}</div>
        </div>
    )
}

export default Weather
export {Search,Weather,Below}