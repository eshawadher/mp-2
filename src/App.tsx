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
            const rawData = await(await fetch("https://thronesapi.com/api/v2/Characters")).json();
            console.log(rawData);
            const results: Character[] = [];
            rawData.map((char:{ id: number; fullName: string; imageUrl: string; title: string; status:string })=>{
                const character: Character  = {
                    id: char.id,
                    full_name: char.fullName,
                    image: char.imageUrl,
                    title: char.title,
                    status: char.status,
                }
                results.push(character);
            })
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


