import React from 'react';
import './Card.css';
export default function Card({isRed, active, title, cases, total}) {
    return (
        <div className = {`card ${!isRed && active && "card-green"} ${isRed && active && "card-red"}`}>
        <div className = "card-content">
            <p>{title}</p>
            <h2 className = {`${!isRed && "cases-green"}`}>{cases}</h2>
            <p>{total} Total</p>
        </div>
        </div>
    )
}
