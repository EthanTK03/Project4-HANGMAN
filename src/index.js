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
        const {countries} = this.state
        var url2 = this.urlbase2 + '/getcountries'
        //var regionid_url = this.urlbase_regionid + '/getregionid'
        axios.get(url2/*, regionid_url*/).then((resp) => {
            console.log(resp)
            this.setState({...this.state,
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
        this.urlbase2 = 'http://127.0.0.1:5000'     // localhost
        this.state = {regionid: -1, regions: [], countryid: -1, countries: []}
    }

    componentDidMount() {
        debugger
        this.getRegions()
        this.getCountries()
    }

    // onRegionChange(e) {
    //     this.state = { regions: [] } 
    //     this.setState({...this.state, regionid: e.target.value})
    // }

    onRegionChange(e) {
        //This passes the chosen region id to the server
        var url = this.urlbase + '/getcountries/'+e.target.value
        console.log(url)
        axios.get(url/*, regionid_url*/).then((resp) => {
            console.log(resp)
            this.setState({...this.state,
                countries: resp.data,
            })
        }).catch(error => {

            console.log(error)
        })
        }

    onCountryChange(e) {
        this.state = { countries: [] }
    }

    //NO MORE CHANGES MADE BEYOND THIS POINT (as of now)

    //render: What the website actually shows (essentially)
    render () {
        const {regions, countries} = this.state
        const optregions = regions.map((r)=>{
            return <option key={r.id} value={r.id}>{r.region}</option>
        })
        const optcountries = countries.map((r)=>{
            return <option key={r.id} value={r.id}>{r.country}</option>
        })
            
        return (<div className='Main'>
            <div className='regions-group'>
                <label htmlFor="">Select Regions: </label>
                <select className='regions-select' onChange={this.onRegionChange.bind(this)}>
                
                {optregions}

                </select>           
            </div>
            <div className='countries-group'>
                <label htmlFor="">Country: </label>
                <select className='countries-select'></select>
            </div>
        </div>)

    }
    
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);