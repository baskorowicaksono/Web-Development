import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import CovidMap from './CovidMap';
import Legend from './Legend';
import LoadCountriesTasks from '../tasks/LoadCountriesTasks';
import legendItems from '../entities/LegendItems';

export default function Covid19() {
    const [countries, setCountries] = useState([]);
    const legendItemsInReverse = [...legendItems].reverse();

    const load = () => {
        const loadCountriesTasks = new LoadCountriesTasks();
        loadCountriesTasks.load(setCountries);
    }
    useEffect(load,[]);

    return (
        <div>
            {countries.length === 0 ?
            <Loading />
            : <div><CovidMap countries={countries}/> <Legend legendItems={legendItemsInReverse} /></div>}
        </div>
    )
}
