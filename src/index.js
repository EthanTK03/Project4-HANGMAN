import React from 'react'
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import './index.css';

class Main extends React.Component {
    getRegions() {
        const {regions} = this.state
        var url = this.urlbase + '/getregions'
        axios.get(url).then((resp) => {
            console.log(resp)
            this.setState({...this.state, 
                regions: resp.data,
            })
        }).catch(error => {
            console.log(error)
        })
    }
    //NOTE: May need two separate functions for this feature (may need to create a getRegionID() function)
    getCountries() {
        const {countries} = this.state2
        var country_url = this.urlbase_country + '/getcountries'
        var regionid_url = this.urlbase_regionid + '/getregionid'
        axios.get(country_url, regionid_url).then((resp) => {
            console.log(resp)
            this.setState({...this.state2,
                countries: resp.data,
            })
        }).catch(error => {
            console.log(error)
        })
    }

    constructor() {
        super()
        this.urlbase = 'http://127.0.0.1:5000'     // localhost
        // this.urlbase = 'https://flask-service.2346o2l3anjri.us-west-2.cs.amazonlightsail.com'
        this.state = {ID: '', regions: []}
        this.state2 = {CountryID: '', countries: []}
    }

    componentDidMount() {
        debugger
        this.getRegions()
        this.getCountries()
    }

    onRegionChange(e) {
        this.state = { regions: [] }    
        this.state2 = { countries: [] }
    }

    //NO MORE CHANGES MADE BEYOND THIS POINT (as of now)

    //render: What the website actually shows (essentially)
    render () {
        const {regions} = this.state
        const optregions = regions.map((r)=>{
            return <option value={r}>{r}</option>
        })
            
        return (<div className='Main'>
            <div className='regions-group'>
                <label htmlFor="">Select Regions: </label>
                <select className='regions-select'>
                {optregions}
                </select>           
            </div>
        </div>)

    }
    
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);