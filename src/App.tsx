import React, { useEffect, useState } from 'react';
import './App.css';
import WMButton from './component/utility/WMButton';
import WonderBasicPropertiesForm from './component/WonderBasicPropertiesForm';
import WonderDisplay from './component/WonderDisplay';
import Axiom from './model/Axiom';
import Quirk from './model/Quirk';
import Wonder from './model/Wonder';

function App() {
  // Wonder state
  const [wonder, setWonder] = useState(Wonder.createWonder());

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
          <WonderBasicPropertiesForm
            onSave={(newName: string, newDescription: string, newAxiom: Axiom, newRank: number, newFlavor: string) => {
              setWonder(wonder.updateBasicProperties(newName, newDescription, newAxiom, newRank, newFlavor));
            }} />

          <h2>2. Quirks</h2>
          <p><label className="b">Core Modifier: {renderUsageModifier(displayCalculatedUsageModifier())}</label></p>
          <h3>Universal Quirks</h3>
          {Quirk.UNIVERSAL_QUIRKS.map(quirk => renderQuirkControl(quirk))}

          <WMButton>Save</WMButton>

        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <WonderDisplay wonder={wonder} />
        </div>
      </div>
    </div >
  );
}

export default App;
