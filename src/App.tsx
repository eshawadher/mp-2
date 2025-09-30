import GameOfThrones from "./components/GameOfThrones.tsx";
import styled from "styled-components";
import {useEffect, useState} from "react";
import type {Character} from "./interfaces/Character.ts";

const ParentDiv=styled.div`
    width: 80vw;
    margin: auto;
    border: 5px #ECEFCA solid;
`;

export default function App(){

    // useState Hook to store Data.
    const [data, setData] = useState<Character[]>([]);

    // useEffect Hook for error handling and re-rendering.
    useEffect(() => {
        async function fetchData(): Promise<void> {
            const rawData = await fetch("https://thronesapi.com/api/v2/Characters");
            //const apiData= (await rawData.json()) as Character[];
            //setData(apiData);
            //const {results} : {results: Character[]} = await rawData.json();
            //setData(results);
            const apiData = (await rawData.json()) as Array<{
                id: number;
                fullName?: string;
                firstName?: string;
                lastName?: string;
                imageUrl?: string;
            }>;
            //json turned into array so that api can be used in order to get the attributes i want
            const {results}: {results: Character[]} = {
                results: apiData.map((x): Character => ({
                    id:x.id,
                    name: x.fullName || "Unknown",
                    image: x.imageUrl ?? "",
                    species: "Human",
                    status: "Unknown",
                })),
            };
            setData(results);
        }
        fetchData()
            .then(() => console.log("Data fetched successfully"))
            .catch((e: Error) => console.log("There was the error: " + e));
    }, [data.length]);

    return(
        <ParentDiv>
            <GameOfThrones data={data}/>
        </ParentDiv>
    )
}


