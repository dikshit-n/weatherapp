import React from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

class Weather extends React.Component{
    render=()=>{
        var a=this.props.Country;
        if(a!==undefined){
            a=a.split(" ")
            a=a[0]
            a=a.split(",")
            a=a[0]
        }
        // if(this.props.Weather_condition==="Sunny")
        var mn = "sun.png"
        var classn
        if(this.props.Opacity){
            classn="bind true"
        }
        else{
            classn="bind false"
        }
        return(
            <div className="weath-dept">
                <div className={classn} >
                    <div className="weather-condition">
                        {this.props.Weather_condition}
                    </div>
                    <div className="show-weather">
                        <div className="one-container">
                            <div className="icon">
                                <img src={require(`./${mn}`)} className="image" alt="img" />
                            </div>
                            <div className="w">
                                <div>{this.props.Weather} </div>
                            </div>
                        </div>
                        <div className="two-container">
                            <div className="one" id="o">C</div>
                            <div className="two"  >
                                    <div className="tx" id="t" onClick={this.props.Click}>F</div>
                            </div>
                        </div>
                    </div>
                    <div className="show-country">
                        {a}
                    </div>
                </div>
            </div>
        )
    }
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
export {Search,Weather,Weather_details}