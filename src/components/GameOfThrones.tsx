import styled from "styled-components";
import type {Character} from "../interfaces/Character.ts";

const AllCharsDiv=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    background-color: #547792;
`;

const SingleCharDiv=styled.div<{status: string}>`
    display: flex;
    flex-direction: column;   
    justify-content: center;
    max-width: 30%;
    padding: 2%;
    margin: 1%;
    background-color: ${(props)=>(props.status === "Alive" ? 'blue' : '#333446')};
    color: ${(props) => (props.status !== "Alive" ? '#ECEFCA' : 'black')};
    border: 3px #94B4C1 solid;
    font: italic small-caps bold calc(2px + 1vw) "Lucida Handwriting", cursive;
    text-align: center;
`;

export default function GameOfThrones(props : { data:Character[] } ){
    return (
        <AllCharsDiv >
            {
                props.data.map((char: Character) =>
                    <SingleCharDiv key={char.id} status={char.status}>
                        <h1>{char.full_name}</h1>
                        <h3>{char.title}</h3>
                        <img src={char.image} alt={`image of ${char.full_name}`} />
                    </SingleCharDiv>
                )
            }
        </AllCharsDiv>
    );
}

