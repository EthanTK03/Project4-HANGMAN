import React from 'react'
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
        axios.get(url2/*, regionid_url*/).then((resp) => { //???
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
                country_index: (Math.random() * countries.length).parseInt() //Changed '=' to ':'
                //^Random Country Placement Option 1
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
        this.state = this.state = {regionid: -1, regions: [], countryid: -1, countries: [], country_index: -1} //Links together country and regionID information
        //TRYING TO PRINT RANDOM COUNTRY: var country_index = (Math.random() * this.state.length).parseInt()
    }

    componentDidMount() { 
        //^PT -- this gets called automatically once your website is loaded for the first time. You fetch the regions here
        debugger
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
                //country_index: (Math.random() * resp.data.length).parseInt() //Changed '=' to ':'
                //^Random Country Placement Option 2
            })
        }).catch(error => { //Catch error, tell console

            console.log(error)
        })
        }

    //What the website actually shows (render)
    render () {
        const {regions, countries, country_index} = this.state 
        //^gets the current list of regions, countries and country index from state.
        const optregions = regions.map((r)=>{
            return <option key={r.id} value={r.id}>{r.region}</option>
            //^PT -- this builds a list of options in the region drop-down.
        })
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
            <div className='countries-group'>
                <label htmlFor="">Country: </label>
                <span className='countries'>{optcountries}</span>
            </div>
        </div>)

    }
    
}
//PT -- this simply calls your Main class (which you define above) to build the website
root.render(<Main />);