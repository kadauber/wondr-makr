import React, { useState, useEffect } from 'react';
import WMButton from '../component/utility/WMButton';
import WMDotSelector from '../component/utility/WMDotSelector';
import Axiom from '../model/Axiom';
import Apocalypsi from '../model/axioms/Apocalypsi';
import Automata from '../model/axioms/Automata';
import Epikrato from '../model/axioms/Epikrato';
import Exelixi from '../model/axioms/Exelixi';
import Katastrofi from '../model/axioms/Katastrofi';
import Metaptropi from '../model/axioms/Metaptropi';
import Prostasia from '../model/axioms/Prostasia';
import Skafoi from '../model/axioms/Skafoi';
import Flavor from '../model/Flavor';

interface WonderBasicPropertiesFormProps {
    className?: string;
    onSave: (newName: string, creatorName: string, newDescription: string, newAxiom: Axiom, newRank: number, newFlavor: Flavor) => void;
}

function WonderBasicPropertiesForm(props: WonderBasicPropertiesFormProps) {
    // Axiom options
    const axioms: Axiom[] = [
        Apocalypsi.create(),
        Automata.create(),
        Epikrato.create(),
        Exelixi.create(),
        Katastrofi.create(),
        Metaptropi.create(),
        Prostasia.create(),
        Skafoi.create()
    ];

    const DEFAULT_AXIOM = axioms[0];
    const DEFAULT_RANK = 1;
    const DEFAULT_FLAVOR = DEFAULT_AXIOM.getFlavors(DEFAULT_RANK)[0];

    // Form state
    const [wonderNameDraft, setWonderNameDraft] = useState("");
    const [creatorNameDraft, setCreatorNameDraft] = useState("");
    const [wonderDescriptionDraft, setWonderDescriptionDraft] = useState("");
    const [selectedAxiomDraft, setSelectedAxiomDraft] = useState(DEFAULT_AXIOM);
    const [selectedRankDraft, setSelectedRankDraft] = useState(DEFAULT_RANK);
    const [selectedFlavorDraft, setSelectedFlavorDraft] = useState(DEFAULT_FLAVOR);

    // Reset flavor when axiom or rank draft changes
    useEffect(() => {
        const newFlavor = selectedAxiomDraft.getFlavors(selectedRankDraft)[0];
        setSelectedFlavorDraft(newFlavor);
    }, [selectedAxiomDraft, selectedRankDraft]);

    function renderSelectFlavor() {
        const flavors = selectedAxiomDraft.getFlavors(selectedRankDraft);

        if (flavors.length < 2) {
            return <div className="h2 mb3 flex items-center">{flavors[0].displayName}</div>;
        }

        return <select
            id="wonder-flavor"
            className="h2 db mb3"
            value={selectedFlavorDraft?.id}
            onChange={(e) => {
                const newFlavor = selectedAxiomDraft.getFlavors(selectedRankDraft).find(flavor => flavor.id === e.target.value);
                if (newFlavor !== undefined) {
                    setSelectedFlavorDraft(newFlavor);
                }
            }}>
            {flavors.map((val, i) =>
                <option key={i} value={val.id}>{val.displayName}</option>
            )}
        </select>
    }

    return <div className="flex flex-column" style={{ gap: "1rem" }}>
        <div>
            <label htmlFor="wonder-name" className="b db mb2">Name</label>
            <input id="wonder-name"
                className="input-reset ba b--black-20 pa2 mb2 db w-100 measure"
                type="text"
                value={wonderNameDraft}
                onChange={(e) => setWonderNameDraft(e.target.value)}
            />
        </div>

        <div>
            <label htmlFor="wonder-creator-name" className="b db mb2">Creator</label>
            <input id="wonder-creator-name"
                className="input-reset ba b--black-20 pa2 mb2 db w-100 measure"
                type="text"
                value={creatorNameDraft}
                onChange={(e) => setCreatorNameDraft(e.target.value)}
            />
        </div>

        <div className="flex" style={{ gap: "2rem" }}>
            <div className="">
                <label htmlFor="wonder-axiom" className="b db mb2">Axiom</label>
                <select id="wonder-axiom"
                    className="db mb3 h2"
                    value={selectedAxiomDraft.id}
                    onChange={(e) => {
                        const newAxiom = axioms.find(axiom => axiom.id === e.target.value);
                        if (newAxiom !== undefined) {
                            setSelectedAxiomDraft(newAxiom);
                        }
                    }}>
                    {axioms.map((val, i) =>
                        <option key={i} value={val.id}>{val.displayName}</option>
                    )}
                </select>
            </div>
            <div className="">
                <label htmlFor="wonder-rank" className="b db mb2">Rank</label>
                <WMDotSelector
                    id="wonder-rank"
                    className="mb3 h2 flex items-center"
                    value={selectedRankDraft}
                    onChange={(rank) => setSelectedRankDraft(rank)}
                />
            </div>
            <div>
                <label htmlFor="wonder-flavor" className="b db mb2">Flavor</label>
                {renderSelectFlavor()}
            </div>
        </div>

        <div>
            <label htmlFor="wonder-desc" className="b db mb2">Description</label>
            <textarea id="wonder-desc"
                className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                value={wonderDescriptionDraft}
                onChange={(e) => setWonderDescriptionDraft(e.target.value)}></textarea>
        </div>

        <div>
            <WMButton onClick={(e) => {
                props.onSave(wonderNameDraft, creatorNameDraft, wonderDescriptionDraft, selectedAxiomDraft, selectedRankDraft, selectedFlavorDraft);
            }}>Save</WMButton>
        </div>
    </div>
}

export default WonderBasicPropertiesForm;