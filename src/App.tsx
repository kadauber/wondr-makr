import React, { useEffect, useState } from 'react';
import './App.css';
import WMButton from './component/utility/WMButton';
import WMDotSelector from './component/utility/WMDotSelector';
import Axiom from './model/Axiom';
import Quirk from './model/Quirk';

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

    if (flavors.length < 2) {
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

  // Wonder quirks
  const [selectedQuirks, setSelectedQuirks] = useState(new Set<Quirk>());
  const [selectedQuirkOptions, setSelectedQuirkOptions] = useState(new Map<string, string>());
  const [quirkCustomNumberInputValues, setQuirkCustomNumberInputValues] = useState(new Map<string, number>());
  const [quirkCustomStringInputValues, setQuirkCustomStringInputValues] = useState(new Map<string, string>());

  // Initialize universal quirk settings to defaults
  useEffect(() => {
    Quirk.UNIVERSAL_QUIRKS.forEach(quirk => {
      const newSelectedQuirkOptions = new Map<string, string>();
      quirk.optionGroups?.forEach(group => {
        newSelectedQuirkOptions.set(group.id, group.defaultOptionID);
      });
      setSelectedQuirkOptions(newSelectedQuirkOptions);

      const newQuirkCustomNumberInputValues = new Map<string, number>();
      if (quirk.customNumberInput !== undefined) {
        newQuirkCustomNumberInputValues.set(quirk.customNumberInput.id, quirk.customNumberInput.defaultValue);
      }
      setQuirkCustomNumberInputValues(newQuirkCustomNumberInputValues);

      const newQuirkCustomStringInputValues = new Map<string, string>();
      if (quirk.customStringInput !== undefined) {
        newQuirkCustomStringInputValues.set(quirk.customStringInput.id, quirk.customStringInput.defaultValue);
      }
      setQuirkCustomStringInputValues(newQuirkCustomStringInputValues);
    });
  }, []);

  function renderUsageModifier(usageModifier: number): React.ReactNode {
    let usageModifierString = "";
    if (usageModifier === 0) {
      usageModifierString = "+0";
    } else if (usageModifier < 0) {
      usageModifierString = usageModifier.toString();
    } else {
      usageModifierString = `+${usageModifier}`;
    }

    return <span className="tracked">{usageModifierString}</span>
  }

  function displayCalculatedUsageModifier() {
    let usageModifier = 0;
    selectedQuirks.forEach(quirk => {
      let additionalModifier = 0;
      
      if (quirk.id === Quirk.MANIA_COST.id && quirk.customNumberInput !== undefined) {
        const maniaCostMod = quirkCustomNumberInputValues.get(quirk.customNumberInput?.id);
        if (maniaCostMod !== undefined) {
          additionalModifier = maniaCostMod;
        }
      }

      if (quirk.id === Quirk.RESILIENT.id && quirk.customNumberInput !== undefined) {
        const resilientRanks = quirkCustomNumberInputValues.get(quirk.customNumberInput?.id);
        if (resilientRanks !== undefined) {
          additionalModifier = -1 * resilientRanks;
        }
      }

      usageModifier += quirk.getUsageModifier(selectedQuirkOptions, additionalModifier);
    });
    return usageModifier;
  }

  function renderQuirkControl(quirk: Quirk) {
    const usageModifier = renderUsageModifier(quirk.baseUsageModifier);

    return <div key={quirk.id}>
      <div className="flex items-center mb2">
        <input className="w1 mr2"
          type="checkbox"
          id={quirk.id}
          defaultChecked={selectedQuirks.has(quirk)}
          onChange={(e) => {
            const newSelectedQuirks = new Set(selectedQuirks);

            if (e.target.checked) {
              newSelectedQuirks.add(quirk);
            } else {
              newSelectedQuirks.delete(quirk);
            }

            setSelectedQuirks(newSelectedQuirks);
          }}
        />
        <label htmlFor={quirk.id} className="lh-copy">{quirk.displayName} ({usageModifier})</label>
      </div>

      {selectedQuirks.has(quirk) && quirk.customNumberInput !== undefined && <div className="ml2 mb2 bl b--near-black">
        <label className="ml2">
          {quirk.customNumberInput.label}
          <input type="number"
            className="ml1"
            value={quirkCustomNumberInputValues.get(quirk.customNumberInput.id)}
            onChange={(e) => {
              const inputID = quirk.customNumberInput?.id;
              if (inputID !== undefined) {
                const newQuirkCustomNumberInputValues = new Map(quirkCustomNumberInputValues);
                newQuirkCustomNumberInputValues.set(inputID, parseInt(e.target.value));
                setQuirkCustomNumberInputValues(newQuirkCustomNumberInputValues);
              }
            }} />
        </label>
      </div>}

      {selectedQuirks.has(quirk) && quirk.optionGroups?.map((optionGroup, i) => {
        return <div key={i} className="ml2 bl b--near-black">
          {optionGroup.quirkOptions.map((option, j) => {
            const inputID = `${quirk.id}-${i}-${j}`;
            const optionUsageModifier = renderUsageModifier(option.usageModifier);

            return <div className="flex items-center mb2 ml2" key={j}>
              <input className="mr2"
                type="radio"
                id={inputID}
                name={`${quirk.id}-${i}`}
                value={option.id}
                checked={selectedQuirkOptions.get(optionGroup.id) === option.id}
                onChange={(e) => {
                  const newSelectedQuirkOptions = new Map(selectedQuirkOptions);
                  newSelectedQuirkOptions.set(optionGroup.id, option.id);
                  setSelectedQuirkOptions(newSelectedQuirkOptions);
                }}
              />
              <label htmlFor={inputID} className="lh-copy">{option.displayName} ({optionUsageModifier})</label>
            </div>
          })}
        </div>
      })}
    </div>
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
          <p><label className="b">Core Modifier: {renderUsageModifier(displayCalculatedUsageModifier())}</label></p>
          <h3>Universal Quirks</h3>
          {Quirk.UNIVERSAL_QUIRKS.map(quirk => renderQuirkControl(quirk))}
          <WMButton>Save</WMButton>

        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <h2>{wonderName.length > 0 ? wonderName : <em>My Wonder</em>}</h2>
          <p>{wonderDescription.length > 0 ? wonderDescription : <em>All about my wonder...</em>}</p>
          <h3>{selectedAxiom?.displayName} {selectedRank} {selectedFlavor}</h3>
        </div>
      </div>
    </div>
  );
}

export default App;
