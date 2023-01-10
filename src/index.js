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
                country_index: parseInt(Math.random() * resp.data.length)
                //^Random Country Placement
            })
        }).catch(error => { //Catch errors, tell in console in dev tools
            console.log(error)
        })
    }

    constructor() { //Create website to host everything (NOT COMPLETELY SURE WHAT THIS DOES)
        super()
        this.urlbase = 'http://127.0.0.1:5000'     // localhost
        // this.urlbase = 'https://flask-service.2346o2l3anjri.us-west-2.cs.amazonlightsail.com'
        this.urlbase2 = 'http://127.0.0.1:5000'     // localhost
        this.state = this.state = {regionid: -1, regions: [], countryid: -1, countries: [], country_index: -1, guesses: ''} //Links together country and regionID information
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
        var {guesses} = this.state
        //^PT -- e has the information about the region drop-down. e.target.value has the chosen region, 
        // which you send to your server so you can get the countries in that region
        console.log(url)
        //Places region list into combobox, then allows you to  choose one reion out of those in the combobox
        axios.get(url).then((resp) => {
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data, 
                country_index: parseInt(Math.random() * resp.data.length), //Random Country Placement
                guesses: '' //Reset Guesses when changing regions
            })
        }).catch(error => { //Catch error, tell console

            console.log(error)
        })
    }

    onGuessChange(e) {
        this.setState({...this.state, guess: e.target.value}) //Get the value typed into the textbox
    }
    addGuess() {
        var {guess, guesses} = this.state //Define guess, guesses in function
        console.log(guesses + ' + ' + guess.length[0]) //Output what is in state (in console) after guess button is hit
        guesses = guesses + guess.toLowerCase() //Add guess from textbox into a list of all guesses
        this.setState({...this.state, guesses: guesses}) //Put the value from textbox into the list of guesses (?)

        
    }

    //What the website actually shows (render)
    render () {
        const {regions, countries, country_index, guesses} = this.state 
        //^gets the current list of regions, countries and country index from state.
        const optregions = regions.map((r)=>{
            return <option key={r.id} value={r.id}>{r.region}</option>
            //^PT -- this builds a list of options in the region drop-down.
        })
        var incorrect_guesses = 0 //Counts the amount of incorrect guesses (for drawing hangman)
        var country = '' //Represents each character in the full word
        //If you have a country chosen, go through each character. If that character is in guesses, show it. Otherwise show an _
        if (country_index >= 0) { //If there is more than one character in the word (?)
            console.log(countries[country_index].country) //
            country = countries[country_index].country.split('').map((c) => { return ' ' + (guesses.indexOf(c.toLowerCase()) >= 0 ? c : '_') + ' ' }).join('');
            //^Changes full word into spaced out underscores
        }
        
        //SHOWN ON WEBSITE
        return (<div className='Main'>

            {/* SELECT REGION */}
            <div className='regions-group'>
                <label htmlFor="">Select Region: </label>
                <select className='regions-select' onChange={this.onRegionChange.bind(this)}> 
                {/* ^Change region chosen and displayed */}
                {optregions}
                {/* ^List of regions displayed in the combobox */}
                </select>
                {/* ^<select></select> is the creation of the combobox */}
            </div>

            <p></p>

            {/* DISPLAY COUNTRY */}
            <div className='countries-group'>
                <label htmlFor="">Country: </label>
                {country}
                {/* ^Prints the random country (as underscores)*/}
            </div>

            {/* GUESS A LETTER */}
            <div>
                <label htmlFor="Guess"><big><b>Guess a Letter:</b></big></label>

                <p></p>

                <input type="text" id="letter" letter="letter" maxLength="16" 
                onChange={this.onGuessChange.bind(this)}></input> 
                {/* ^Textbox where the user types their guess, that guess is added to a list of guesses, 
                and the process is repeated when a new character is typed */}

                <button onClick={this.addGuess.bind(this)}>Guess</button>
                {/* ^Button to confirm the user's guess of a character */}
            </div>

            {/* THE HANGMAN */}
            {/* <div>
                Hangman Frame (COMMENT THIS OUT)
                <img id="vert1" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FVertical-Line-PNG-HD-Image.png&f=1&nofb=1" style='width:600px;height:600px'></img>
                <img id="vert2" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:200px'></img>
                <img id="hori1" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:300px;height:400px'></img>
                <img id="hori2" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:334px;height:300px'></img>

                The Man (COMMENT THIS OUT)
                if (incorrect_guesses >= 1) {
                    <img id="head" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fsad-face-transparent-background%2Fsad-face-transparent-background-2.png&f=1&nofb=1" style='width:150px;height:150px'></img>
                }
                if (incorrect_guesses >= 2) {
                <img id="body" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:250px'></img>
                }
                if (incorrect_guesses >= 3) {
                <img id="larm" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:250px'></img>
                }
                if (incorrect_guesses >= 4) {
                <img id="rarm" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:250px'></img>
                }
                if (incorrect_guesses >= 5) {
                <img id="lleg" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:250px'></img>
                }
                if (incorrect_guesses >= 6) {
                <img id="rleg" src="https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fclipart-library.com%2Fimages_k%2Fline-with-transparent-background%2Fline-with-transparent-background-12.png&f=1&nofb=1" style='width:150px;height:250px'></img>
                }
            </div> */}

        </div>)

    }
    
}

//PT -- this simply calls your Main class (which you define above) to build the website
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);