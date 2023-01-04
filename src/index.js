import React from 'react'
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

class Main extends React.Component {
    //Will connect regions server to this app, extract region list info
    getRegions() {
        const {regions} = this.state //Takes list of regions from \getregions server
        var url = this.urlbase + '/getregions' //Accesses server
        axios.get(url).then((resp) => { //???
            //PT -- This code runs after you get the results from getregions. In this case, you'll take what's in data,
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
    //NOTE: May need two separate functions for this feature (may need to create a getRegionID() function)

    //Will connect countries server to this app
    getCountries() {
        const {countries} = this.state //Takes list of regions from \getregions server
        var url2 = this.urlbase2 + '/getcountries' //Accesses server
        //var regionid_url = this.urlbase_regionid + '/getregionid'
        axios.get(url2/*, regionid_url*/).then((resp) => { //???
            //PT -- as above, you're getting a list of countries from your Python server. Here you might
            // put the code to get a random index
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
                //PT -- maybe add this: country_index = (Math.random() * countries.length).parseInt()
            })
        }).catch(error => { //Catch errors, tell in console in dev tools
            console.log(error)
        })
    }

    constructor() { //Create website to host everything (NOT COMPLETELY SURE WHAT THIS DOES)
        super()
        this.urlbase = 'http://127.0.0.1:5000'     // localhost
        // this.urlbase = 'https://flask-service.2346o2l3anjri.us-west-2.cs.amazonlightsail.com'
        this.state = {ID: '', regions: []}  //PT -- you change state two lines later, so you don't need this.
        this.urlbase2 = 'http://127.0.0.1:5000'     // localhost
        this.state = {regionid: -1, regions: [], countryid: -1, countries: []} //Links together country and regionID information
        //PT -- you might set the country index in the above line also:
        //PT -- this.state = {regionid: -1, regions: [], countryid: -1, countries: [], country_index: -1} //Links together country and regionID information
        //TRYING TO PRINT RANDOM COUNTRY: var country_index = (Math.random() * this.state.length).parseInt()
    }

    componentDidMount() { //???
        //PT -- this gets called automatically once your website is loaded for the first time. You fetch the regions here
        debugger
        this.getRegions()
    }

    // onRegionChange(e) {
    //     this.state = { regions: [] } 
    //     this.setState({...this.state, regionid: e.target.value})
    // }

    //Create combobox for regions
    onRegionChange(e) { 
        //This passes the chosen region id to the server
        var url = this.urlbase + '/getcountries/'+e.target.value //???
        //PT -- e has the information about the region drop-down. e.target.value has the chosen region, which you send to your server
        //   so you can get the countries in that region
        console.log(url) //??
        //Places region list into combobox, then allows you to  choose one reion out of those in the combobox
        axios.get(url/*, regionid_url*/).then((resp) => { //???
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
                //PT -- as before, you might add this line to set the country index:
                //PT -- maybe add this: country_index = (Math.random() * resp.data.length).parseInt()
            })
        }).catch(error => { //Catch error, tell console

            console.log(error)
        })
        }

    //Put countries into a list?
    onCountryChange(e) {
        //PT -- since you're only getting one country, it won't change. You won't need this.
        this.state = { countries: [] }
    }

    //NO MORE CHANGES MADE BEYOND THIS POINT (as of now)

    //What the website actually shows
    render () {
        //PT -- this gets the current list of regions and countries from state. You might also get the country index:
        // const {regions, countries, country_index} = this.state //???
        const {regions, countries} = this.state //???
        const optregions = regions.map((r)=>{ //???
            //PT -- this builds an list of options in the region drop-down.
            return <option key={r.id} value={r.id}>{r.region}</option>
        })
        //PT -- since you only want to show one country, you probably don't need this.
        const optcountries = countries.map((r)=>{ //???
            return <span key={r.id} value={r.id}>{r.country}</span>
        })
           
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
                //PT -- you only want to show one country. So this might work:
                // { country_index >= 0 && <span className='countries'>{countries[country_index]}</span>
                <span className='countries'>{optcountries}</span>
            </div>
        </div>)

    }
    
}
 //???
//PT -- this simply calls your Main class (which you define above) to build the website.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);
