import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

class Main extends React.Component {
    //Will connect regions server to this app, extract region list info
    getRegions() {
        const {regions} = this.state //Takes list of regions from \getregions server
        var url = this.urlbase + '/getregions' //Accesses server
        axios.get(url).then((resp) => {
            //^PT -- This code runs after you get the results from getregions. In this case, you'll take what's in data,
            // which I think is a list of regions, and store it in your state. Notice in render() you get regions from
            // state so they can be displayed in the regions-select drop-down
            console.log(resp)
            this.setState({...this.state, 
                regions: resp.data,
            })
        }).catch(error => { //Catch errors, tell in console in dev tools
            console.log(error)
        })
    }

    //Will connect countries server to this app
    getCountries() {
        const {countries} = this.state //Takes list of regions from \getregions server
        var url2 = this.urlbase2 + '/getcountries' //Accesses server
        axios.get(url2).then((resp) => {
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
                country_index: parseInt(Math.random() * resp.data.length) //Changed '=' to ':'
                //^Random Country Placement
            })
        }).catch(error => { //Catch errors, tell in console in dev tools
            console.log(error)
        })
    }

    // getGuesses() {
    //     const {guesses} = this.state //Get a list of all Guesses (user inputs)
    //     var input = this.inputbase
    //     axios.get(input).then((resp) => {
    //         console.log(resp)
    //         this.setState({...this.state,
    //         guesses: resp.data,
    //     })
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    constructor() { //Create website to host everything (NOT COMPLETELY SURE WHAT THIS DOES)
        super()
        this.urlbase = 'http://127.0.0.1:5000'     // localhost
        // this.urlbase = 'https://flask-service.2346o2l3anjri.us-west-2.cs.amazonlightsail.com'
        this.urlbase2 = 'http://127.0.0.1:5000'     // localhost
        this.state = this.state = {regionid: -1, regions: [], countryid: -1, countries: [], country_index: -1, guesses: []} //Links together country and regionID information
        //TRYING TO PRINT RANDOM COUNTRY: var country_index = (Math.random() * this.state.length).parseInt()
    }

    componentDidMount() { 
        //^PT -- this gets called automatically once your website is loaded for the first time. You fetch the regions here
        this.getRegions()
    }

    //Create combobox for regions
    onRegionChange(e) { 
        //This passes the chosen region id to the server
        var url = this.urlbase + '/getcountries/'+e.target.value
        //^PT -- e has the information about the region drop-down. e.target.value has the chosen region, 
        // which you send to your server so you can get the countries in that region
        console.log(url)
        //Places region list into combobox, then allows you to  choose one reion out of those in the combobox
        axios.get(url).then((resp) => {
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data, 
                country_index: parseInt(Math.random() * resp.data.length) //Changed '=' to ':'
                //^Random Country Placement
            })
        }).catch(error => { //Catch error, tell console

            console.log(error)
        })
    }

    addGuess() {
        const {guesses} = this.state
        var url = this.urlbase + '/getcountries/' + guesses //+ country
        axios.get(url).then((resp) => {
            this.setState({...this.state,
            guess_count: resp.data['guess count'], //Counts the amount of guesses (should it count the letter guessed as well or does it already?)
            letter_count: resp.data['letter count']}) //Counts amount of letters in a word/country
        })
    }

    //What the website actually shows (render)
    render () {
        const {regions, countries, country_index, guesses} = this.state 
        //^gets the current list of regions, countries and country index from state.
        const optregions = regions.map((r)=>{
            return <option key={r.id} value={r.id}>{r.region}</option>
            //^PT -- this builds a list of options in the region drop-down.
        })

        //If you have a country chosen, go through each character. If that character is in guesses, show it. Otherwise show an _
        var country = ''
        if (country_index > 0) {
            console.log(countries[country_index].country)
            country = countries[country_index].country.split('').map((c) => { return ' ' + (guesses.indexOf(c) >= 0 ? c : '_') + ' ' }).join('');
        }
        

        // const optcountries = countries.map((r)=>{
        //     return <span key={r.id} value={r.id}>{r.country}</span>
        // })
        //^PROBABLY DON'T NEED THIS
        
        //What the website will show
        return (<div className='Main'>
            <div className='regions-group'>
                <label htmlFor="">Select Regions: </label>
                <select className='regions-select' onChange={this.onRegionChange.bind(this)}>
                {optregions}
                </select>
            </div>

            <p></p>
            <div className='countries-group'>
                <label htmlFor="">Country: </label>
                {/* {country_index >= 0 && <span className='countries'>{countries[country_index].country}</span>} */}
                {country}
                {/* ^Prints the random country */}
            </div>

            <div>
                <label htmlFor="Guess"><big><b>Guess a Letter:</b></big></label>
                <p></p>
                <input type="text" id="letter" letter="letter" maxLength="16" value={guesses} onChange={this.addGuess.bind(this)}></input>

                {/* User Input (Guessing a Letter) */}
                {/* <input value={country} onChange={this.onRegionChange.bind(this)}/>  */}
                <button onClick={this.country.bind(this)}>Guess</button>
            </div>
        </div>)

    }
    
}
//PT -- this simply calls your Main class (which you define above) to build the website
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);