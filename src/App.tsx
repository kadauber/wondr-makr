import React, { useState } from 'react';
import './App.css';
import WonderAxiomQuirksForm from './component/WonderAxiomQuirksForm';
import WonderBasicPropertiesForm from './component/WonderBasicPropertiesForm';
import WonderDisplay from './component/WonderDisplay';
import WonderQuirksForm from './component/WonderUniversalQuirksForm';
import Axiom from './model/Axiom';
import BaseQuirk from './model/BaseQuirk';
import Flavor from './model/Flavor';
import PeculiarRequirementQuirk from './model/PeculiarRequirementQuirk';
import Quirky from './model/Quirky';
import Wonder from './model/Wonder';

function App() {
  // Wonder state
  const [wonder, setWonder] = useState(Wonder.createWonder());

  return (
    <div className="App pa2">
      <h1>Wondr Makr</h1>
      <div className="flex">
        <div className="pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <h2>1. Describe Wonder</h2>
          <WonderBasicPropertiesForm
            onSave={(newName: string, newCreatorName: string, newDescription: string, newAxiom: Axiom, newRank: number, newFlavor: Flavor) => {
              setWonder(wonder.updateBasicProperties(newName, newCreatorName, newDescription, newAxiom, newRank, newFlavor));
            }} />

          <h2>2. Add Universal Quirks</h2>
          <WonderQuirksForm onSave={(sizeQuirk: BaseQuirk, additionalQuirks: Set<BaseQuirk>, peculiarRequirements: Set<PeculiarRequirementQuirk>) => {
            const quirks: Set<Quirky> = new Set(additionalQuirks);
            peculiarRequirements.forEach((quirk) => {
              quirks.add(quirk);
            });
            setWonder(wonder.updateAdditionalQuirks(sizeQuirk, quirks));
          }} />

          {wonder.axiom !== undefined && <>
            <h2>3. Add Axiom Quirks</h2>
            <WonderAxiomQuirksForm
              axiom={wonder.axiom}
              onSave={(quirks) => {
                setWonder(wonder.updateAxiomQuirks(quirks));
              }}
            />
          </>}
        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <WonderDisplay wonder={wonder} />
        </div>
      </div>
    </div>
  );
}

export default App;
