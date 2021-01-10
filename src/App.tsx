import React, { useEffect, useState } from 'react';
import './App.css';
import WMButton from './component/utility/WMButton';
import WMDotSelector from './component/utility/WMDotSelector';
import Axiom from './model/Axiom';

function App() {
  // Wonder name and description state
  const [wonderName, setWonderName] = useState("");
  const [wonderNameDraft, setWonderNameDraft] = useState("");
  const [wonderDescription, setWonderDescription] = useState("");
  const [wonderDescriptionDraft, setWonderDescriptionDraft] = useState("");

  // Axiom options
  const axioms: Axiom[] = [
    Axiom.APOCALYPSI,
    Axiom.AUTOMATA,
    Axiom.EPIKRATO,
    Axiom.EXELIXI,
    Axiom.KATASTROFI,
    Axiom.METAPTROPI,
    Axiom.PROSTASIA,
    Axiom.SKAFOI
  ];

  // Wonder axiom, rank, and flavor state
  const [selectedAxiom, setSelectedAxiom] = useState(undefined as Axiom | undefined);
  const [selectedAxiomDraft, setSelectedAxiomDraft] = useState(axioms[0]);
  const [selectedRank, setSelectedRank] = useState(undefined as number | undefined);
  const [selectedRankDraft, setSelectedRankDraft] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState(undefined as string | undefined);
  const [selectedFlavorDraft, setSelectedFlavorDraft] = useState("");

  // Reset flavor when axiom or rank draft changes
  useEffect(() => {
    const newFlavor = selectedAxiomDraft.getFlavors(selectedRankDraft)[0];
    setSelectedFlavorDraft(newFlavor);
  }, [selectedAxiomDraft, selectedRankDraft]);

  function renderSelectFlavor() {
    const flavors = selectedAxiomDraft.getFlavors(selectedRankDraft);

    if (flavors.length < 2)
    {
      return <div className="h2 mb3 flex items-center">{flavors[0]}</div>;
    }

    return <select
      id="wonder-flavor"
      className="h2 db mb3"
      onChange={(e) => setSelectedFlavorDraft(e.target.value)}
    >
      {flavors.map((val, i) =>
        <option key={i} value={val}>{val}</option>
      )}
    </select>
  }

  return (
    <div className="App pa2">
      <h1>Wondr Makr</h1>
      <div className="flex">
        <div className="pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <h2>1. Name and Description</h2>
          <label htmlFor="wonder-name" className="b db mb2">Name</label>
          <input id="wonder-name"
            className="input-reset ba b--black-20 pa2 mb2 db w-100 measure"
            type="text"
            value={wonderNameDraft}
            onChange={(e) => setWonderNameDraft(e.target.value)}
          />
          <label htmlFor="wonder-desc" className="b db mb2">Description</label>
          <textarea id="wonder-desc"
            className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
            value={wonderDescriptionDraft}
            onChange={(e) => setWonderDescriptionDraft(e.target.value)}></textarea>

          <WMButton onClick={(e) => {
            setWonderName(wonderNameDraft);
            setWonderDescription(wonderDescriptionDraft);
          }}>Save</WMButton>

          <h2>2. Axiom, Rank, and Flavor</h2>
          <label htmlFor="wonder-axiom" className="b db mb2">Axiom</label>
          <select
            id="wonder-axiom"
            className="db mb3 h2"
            onChange={(e) => {
              const newAxiom = axioms.find(axiom => axiom.id === e.target.value);
              if (newAxiom !== undefined) {
                setSelectedAxiomDraft(newAxiom);
              }
            }}
          >
            {axioms.map((val, i) =>
              <option key={i} value={val.id}>{val.displayName}</option>
            )}
          </select>

          <label htmlFor="wonder-rank" className="b db mb2">Rank</label>
          <WMDotSelector
            id="wonder-rank"
            className="mb3 h2 flex items-center"
            value={selectedRankDraft}
            onChange={(rank) => setSelectedRankDraft(rank)}
          />

          <label htmlFor="wonder-flavor" className="b db mb2">Flavor</label>
          {renderSelectFlavor()}
          <WMButton onClick={() => {
            setSelectedAxiom(selectedAxiomDraft);
            setSelectedRank(selectedRankDraft);
            setSelectedFlavor(selectedFlavorDraft);
          }}>Save</WMButton>

          <h2>3. Quirks</h2>
          <p>Some crap...</p>
          <WMButton>Save</WMButton>

        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <h2>{wonderName.length > 0 ? wonderName : <em>My Wonder</em>}</h2>
          <p>{wonderDescription.length > 0 ? wonderDescription : <em>All about my wonder...</em>}</p>
          <p>{selectedAxiom?.displayName} {selectedRank} {selectedFlavor}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
