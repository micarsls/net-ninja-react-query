import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Person from "./Person";

const fetchPeople = async (page) => {
    const res = await fetch(`https://swapi.dev/api/people?page=${page}`);
    return res.json();
};

const People = () => {
    const [page, setPage] = useState(1);
    const {data, status} = useQuery(['people', page], () => fetchPeople(page) );

    return (
        <div>
            <h2>People</h2>

            {status === 'loading' && (
                <div>Loading data...</div>
            )}

            {status === 'error' && (
                <div>Error fetching data</div>
            )}

            {status === 'success' && (
                <>
                    <button onClick={() => setPage(old => Math.max(old -1, 1))} disabled={page === 1}>Previous</button>
                    <span>{ page }</span>
                    <button onClick={() => setPage(old=> (!data || !data.next ? old:old+1))} disabled={!data || !data.next}>Next</button>
                    <div>
                    {data.results.map(person => <Person person={person} key={person.name}/>)}
                    </div>
                </>
            )}
        </div>
    );
}

export default People;