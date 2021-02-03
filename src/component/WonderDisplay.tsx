import React from 'react';
import Quirky from '../model/Quirky';
import Wonder from '../model/Wonder';
import Utils from '../Utils';

interface WondrDisplayProps {
    wonder: Wonder;
}

function WonderDisplay(props: WondrDisplayProps) {
    function renderWonderName(): React.ReactNode {
        return props.wonder.wonderName.length > 0 ? props.wonder.wonderName : <em>My Wonder</em>
    }

    function renderCoreModifier() {
        return Utils.renderUsageModifier(props.wonder.getCoreModifier(), false)
    }

    function renderTimeToBuild() {
        return props.wonder.getTimeToBuild();
    }

    function getQuirks(): Quirky[] {
        let quirks: Quirky[] = [];
        if (props.wonder.additionalQuirks !== undefined) {
            quirks = quirks.concat(Array.from(props.wonder.additionalQuirks));
        }
        if (props.wonder.axiomQuirks !== undefined) {
            quirks = quirks.concat(Array.from(props.wonder.axiomQuirks));
        }
        return quirks;
    }
    const quirks = getQuirks();

    return <>
        <h2>{renderWonderName()}</h2>
        {props.wonder.creatorName.length > 0 && <p>Created by {props.wonder.creatorName}</p>}
        <p className="b">{props.wonder.axiom?.displayName} {props.wonder.rank} {props.wonder.flavor}</p>
        {props.wonder.description && <p>{props.wonder.description.length > 0 ? props.wonder.description : <em>All about my wonder...</em>}</p>}
        <dl>
            <div className="mb1 b"><dt className="dib">Core Modifier: </dt><dd className="dib ml1">{renderCoreModifier()}</dd></div>
            <div className="mb1"><dt className="dib">Size: </dt><dd className="dib ml1">{props.wonder.size}</dd></div>
            <div className="mb1"><dt className="dib">Durability: </dt><dd className="dib ml1">{props.wonder.durability}</dd></div>
            <div><dt className="dib">Structure: </dt><dd className="dib ml1">{props.wonder.structure}</dd></div>
        </dl>

        <h3>Building {renderWonderName()}</h3>
        <p>Roll to build: Inspiration + Attribute + Skill + Laboratory Equipment + Beholden Ability - Wonder Rank</p>
        <p>Bind mania to build: {props.wonder.rank ? <span className="tracked">{props.wonder.rank} -</span> : <em>Rank -</em>} Larvae</p>
        <p>Time to build: {renderTimeToBuild()}</p>

        <h3>Using {renderWonderName()}</h3>
        <p>Roll to use: Attribute + Skill {renderCoreModifier()}</p>
        <p>Mania cost to use: </p>

        <h3>Quirks of {renderWonderName()}</h3>
        <h4>{props.wonder.sizeQuirk.getDisplayName()}: {props.wonder.sizeQuirk.getCustomNumberValue("sizeinput")}</h4>
        <p>Modifier: {Utils.renderUsageModifier(props.wonder.sizeQuirk.getUsageModifier(), false)}</p>
        {(quirks.length === 0) && <em>No additional quirks - this wonder is a normie.</em>}
        {quirks.length > 0 && quirks.map((quirk, idx) => {
            return <div key={idx}>
                <h4>{quirk.getDisplayName()}</h4>
                <p>Modifier: {Utils.renderUsageModifier(quirk.getUsageModifier(), false)}</p>
                <p>Effect: {quirk.getEffect()}</p>
            </div>
        })}
    </>

}

export default WonderDisplay;