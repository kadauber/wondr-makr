import React from 'react';
import Wonder from '../model/Wonder';

interface WondrDisplayProps {
    wonder: Wonder;
}

function WonderDisplay(props: WondrDisplayProps) {
    return <>
        <h2>{props.wonder.wonderName.length > 0 ? props.wonder.wonderName : <em>My Wonder</em>}</h2>
        <h3>{props.wonder.axiom?.displayName} {props.wonder.rank} {props.wonder.flavor}</h3>
        <p>{props.wonder.description.length > 0 ? props.wonder.description : <em>All about my wonder...</em>}</p>
    </>

}

export default WonderDisplay;