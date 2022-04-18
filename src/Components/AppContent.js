import React, {useEffect, useState} from 'react';
import './AppContent.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import "leaflet/dist/leaflet.css";
import LineGraph from './LineGraph';
import {prettyPrintStat, sortData} from './util';


export default function AppContent() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all").then((response) => response.json()).then((data) => {
            setCountryInfo(data);
        });
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries").then((response) => response.json()).then((data) => {
                const countries = data.map((country) => ({name: country.country, value: country.countryInfo.iso2}));
                const sortedData = sortData(data);
                setTableData(sortedData);
                setMapCountries(data);
                setCountries(countries);
            });
        };
        getCountriesData();
    }, [])

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        await fetch(url).then(response => response.json()).then(data => {
            setCountry(countryCode);
            setCountryInfo(data);
            setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
            setMapZoom(5);
        });
    }

    return (
        <div className="appContent">
            <div className="appContent-left">
                <div className="appContent-left-header">
                    <div className="header">
                        <h1>COVID_19 TRACKER</h1>
                    </div>
                    <select className="dropdown"
                        onChange={onCountryChange}
                        value={country}>
                        <option value="worldwide">Worldwide</option>
                        {
                        countries.map(country => (
                            <option value={
                                country.value
                            }>
                                {
                                country.name
                            }</option>
                        ))
                    } </select>
                </div>

                <div className="stats">
                    <InfoBox isRed
                        active={
                            casesType === "cases"
                        }
                        onClick={
                            e => setCasesType("cases")
                        }
                        title="Coronavirus cases"
                        cases={
                            prettyPrintStat(countryInfo.todayCases)
                        }
                        total={
                            prettyPrintStat(countryInfo.cases)
                        }/>
                    <InfoBox isRed={false}
                        active={
                            casesType === "recovered"
                        }
                        onClick={
                            e => setCasesType("recovered")
                        }
                        title="Recovered"
                        cases={
                            prettyPrintStat(countryInfo.todayRecovered)
                        }
                        total={
                            prettyPrintStat(countryInfo.recovered)
                        }/>
                    <InfoBox isRed
                        active={
                            casesType === "deaths"
                        }
                        onClick={
                            e => setCasesType("deaths")
                        }
                        title="Deaths"
                        cases={
                            prettyPrintStat(countryInfo.todayDeaths)
                        }
                        total={
                            prettyPrintStat(countryInfo.deaths)
                        }/>
                </div>

                <Map casesType={casesType}
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}/>

                <div className="app-graph">
                    <h1>Total Cases</h1>
                    <LineGraph/>
                </div>
            </div>

            <div className="appContent-right">
                <h3>Live Cases by Country</h3>
                <Table countries={tableData}/>
            </div>
        </div>
    )
}
