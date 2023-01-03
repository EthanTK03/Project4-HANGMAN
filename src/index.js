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
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
            })
        }).catch(error => { //Catch errors, tell in console in dev tools
            console.log(error)
        })
    }

    constructor() { //Create website to host everything (NOT COMPLETELY SURE WHAT THIS DOES)
        super()
        this.urlbase = 'http://127.0.0.1:5000'     // localhost
        // this.urlbase = 'https://flask-service.2346o2l3anjri.us-west-2.cs.amazonlightsail.com'
        this.state = {ID: '', regions: []}
        this.urlbase2 = 'http://127.0.0.1:5000'     // localhost
        this.state = {regionid: -1, regions: [], countryid: -1, countries: []} //Links together country and regionID information
        //TRYING TO PRINT RANDOM COUNTRY: var country_index = (Math.random() * this.state.length).parseInt()
    }

    componentDidMount() { //???
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
        console.log(url) //??
        //Places region list into combobox, then allows you to  choose one reion out of those in the combobox
        axios.get(url/*, regionid_url*/).then((resp) => { //???
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
            })
        }).catch(error => { //Catch error, tell console

            console.log(error)
        })
        }

    //Put countries into a list?
    onCountryChange(e) {
        this.state = { countries: [] }
    }

    //NO MORE CHANGES MADE BEYOND THIS POINT (as of now)

    //What the website actually shows
    render () {
        const {regions, countries} = this.state //???
        const optregions = regions.map((r)=>{ //???
            return <option key={r.id} value={r.id}>{r.region}</option>
        })
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
                <span className='countries'>{optcountries}</span>
            </div>
        </div>)

    }
    
}
 //???
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);