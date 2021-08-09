import axios from "axios";
import {features} from "../data/countries.json"
import legendItems from "../entities/LegendItems";

export default class LoadCountriesTasks {
    mapCountries = features;
    covid19DataURL = "https://disease.sh/v3/covid-19/countries";
    #processCovidData = (covidCountries) => {
        for(let i = 0; i < this.mapCountries.length; i++){
            const mapCountry = this.mapCountries[i];
            const covidCountry = covidCountries.find((covidCountry) => covidCountry.countryInfo.iso3 === mapCountry.properties.ISO_A3);

            mapCountry.properties.confirmed = 0;
            mapCountry.properties.confirmedText = "0";

            if(covidCountry != null){
                const confirmed = covidCountry.cases;
                mapCountry.properties.confirmed = confirmed;
                mapCountry.properties.confirmedText = this.#numberRegexFormat(confirmed);
            }
            this.#setCountryColor(mapCountry);
        };
        this.setState(this.mapCountries);
    }

    #numberRegexFormat = number => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");     // separate every 3 numbers by ","
    }

    #setCountryColor = (mapCountry) => {
        const legendItem = legendItems.find(cases => cases.isFor(mapCountry.properties.confirmed));
        if(legendItem != null){
            mapCountry.properties.color = legendItem.color;
        }
        else{
            mapCountry.properties.color = "white";
        }
    }

    load = async (setState) => {
        this.setState = setState;
        try{
            const response = await axios.get(this.covid19DataURL);
            console.log(response);
            const covidCountries = response.data;
            this.#processCovidData(covidCountries);
            }
        catch(error){
            console.log(error);
            }
    }
}