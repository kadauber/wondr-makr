import React from 'react';
import Wonder from '../model/Wonder';
import Utils from '../Utils';

interface WondrDisplayProps {
    wonder: Wonder;
}

function WonderDisplay(props: WondrDisplayProps) {
    function renderCoreModifier() {
        return Utils.renderUsageModifier(props.wonder.getCoreModifier())
    }

    return <>
        <h2>{props.wonder.wonderName.length > 0 ? props.wonder.wonderName : <em>My Wonder</em>}</h2>
        <h3>Info</h3>
        <p>{props.wonder.axiom?.displayName} {props.wonder.rank} {props.wonder.flavor}</p>
        <p>{props.wonder.description.length > 0 ? props.wonder.description : <em>All about my wonder...</em>}</p>
        <p><label className="b">Core Modifier: {renderCoreModifier()}</label></p>
        <p>Roll to build: Inspiration + Attribute + Skill + Laboratory Equipment + Beholden Ability - Wonder Rank</p>
        <p>Bind mania to build: {props.wonder.rank ? <span className="tracked">{props.wonder.rank} -</span> : <em>Rank -</em>} Larvae</p>
        <p>Time to build: </p>
        <p>Roll to use: Attribute + Skill {renderCoreModifier()}</p>
        <p>Mania cost to use: </p>
        <p>Durability: </p>
        <h3>Quirks</h3>
        {(props.wonder.quirks === undefined || props.wonder.quirks.size === 0) && <em>No quirks - this wonder is a normie.</em>}
        {props.wonder.quirks !== undefined && Array.from(props.wonder.quirks).map((quirk, idx) => {
            return <div key={idx}>
                <h4>{quirk.getDisplayName()}</h4>
                <p>Modifier: {Utils.renderUsageModifier(quirk.getUsageModifier())}</p>
                <p>Effect: {quirk.getEffect()}</p>
            </div>
        })}
    </>

}

export default WonderDisplay;