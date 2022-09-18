import React from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanets = async () => {
  const res = await fetch('https://swapi.dev/api/planets/');
  return res.json();
};

const Planets = () => {
    const { data, status } = useQuery('planets', fetchPlanets);
    console.log(data);

    return (
        <div>
            <h2>Planets</h2>
            {/* <p>{ status }</p> */}

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <div>
                    {data.results.map(planet => <Planet planet={planet} key={planet.name}/>)}
                </div>
            )}
        </div>
    );
}

export default Planets;