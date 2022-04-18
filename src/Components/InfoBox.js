import React from 'react';
import Card from './Card';
import './InfoBox.css';
function InfoBox({
    title,
    cases,
    isRed,
    active,
    total,
    ...props
}) {
    return (
        <div className="infoBox"
            onClick={
                props.onClick
        }>
            <Card isRed={isRed}
                active={active}
                title={title}
                cases={cases}
                total={total}/>
        </div>
    )
}

export default InfoBox
