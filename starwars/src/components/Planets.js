import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Planet from "./Planet";

const fetchPlanets = async (queryKey, page) => {
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
    const [page, setPage] = useState(1);
    const { data, status } = useQuery(["planets", page], ({ queryKey }) => fetchPlanets(queryKey, page));

    return (
        <div>
            <h2>Planets</h2>
            
            <button onClick={() => setPage(1)}>Page 1</button>
            <button onClick={() => setPage(2)}>Page 2</button>
            <button onClick={() => setPage(3)}>Page 3</button>

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