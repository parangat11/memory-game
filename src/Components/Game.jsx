import { useEffect, useState } from "react";
import Profile from "./Profile.jsx";
import "../styles/game.css";

const total = 12;

function selectBosses(result) {
    const indeces = new Set();
    while(indeces.size < total) {  // Select total random indeces from 0 to 99
        let num = Math.floor(Math.random() * 100);
        while(indeces.has(num) || num===1) {   // If already selected, check the next index
            num++;
            num %= 100; // Warp back to 0 (stay in range of 0 to 99)
        }
        indeces.add(num);
    }
    const bosses = [];  // Add the bosses present at those indeces
    for(let i = 0; i < 100; i++) {
        if(indeces.has(i)) {
            bosses.push({...result[i], selected: false});
        }
    }
    return bosses;
}

function generateSequence() {
    const selected = new Set();
    const arr = [];
    for(let i = 0; i < total; i++) {
        let num = Math.floor(Math.random() * total);
        while(selected.has(num)) {
            num++;
            num %= total;
        }
        arr.push(num);
        selected.add(num);
    }
    return arr;
}



export default function Game({ result }){
    const [bosses, setBosses] = useState(selectBosses(result));
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [sequence, setSequence] = useState(generateSequence());
    function handleClick(e, name) {
        setSequence(generateSequence());
        setBosses(prevBosses => {
            const newBosses = [];
            let gameOver = false;
            for(let i = 0; i < prevBosses.length; i++) {
                let currBoss = prevBosses[i];
                if(currBoss.name===name) {
                    if(currBoss.selected) {
                        gameOver = true;
                        currBoss = {...currBoss, selected: false};
                    }
                    else {
                        currBoss = {...currBoss, selected: true};
                    }
                }
                newBosses.push(currBoss);
            }
            if(gameOver) {
                for(let i = 0; i < newBosses.size; i++) {
                    newBosses[i] = {...newBosses[i], selected: false};
                }
            }
            let curr = 0;
            for(let i = 0; i < newBosses.length; i++) {
                if(newBosses[i].selected) {
                    curr++;
                }
            }
            setScore(curr);
            return newBosses;
        })
    }
    console.log(score);
    useEffect(() => {
        if(maxScore < score) {
            setMaxScore(score);
        }
    }, [score, maxScore])
    useEffect(() => {
        const hasInvalidImage = bosses.some(boss => !boss.image || boss.image === "");
        if (hasInvalidImage) {
            setBosses(selectBosses(result));
        }
    }, [bosses, result]);
    return (
        <>
            <div className="header">I shall remember thee...</div>
            <div className="game-board">
                <div className="card-container">
                    {sequence.map(index => {
                        return <Profile key={index} handleClick={handleClick} name={bosses[index].name} image={bosses[index].image}/>
                    })}
                </div>
            </div>
        </>
    )
}