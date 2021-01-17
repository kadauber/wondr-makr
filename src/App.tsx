import React, { useState } from 'react';
import './App.css';
import WonderBasicPropertiesForm from './component/WonderBasicPropertiesForm';
import WonderDisplay from './component/WonderDisplay';
import WonderQuirksForm from './component/WonderQuirksForm';
import Axiom from './model/Axiom';
import BaseQuirk from './model/BaseQuirk';
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
          <WonderBasicPropertiesForm
            onSave={(newName: string, newDescription: string, newAxiom: Axiom, newRank: number, newFlavor: string) => {
              setWonder(wonder.updateBasicProperties(newName, newDescription, newAxiom, newRank, newFlavor));
            }} />

          <WonderQuirksForm onSave={(sizeQuirk: BaseQuirk, additionalQuirks: Set<BaseQuirk>, peculiarRequirements: Set<PeculiarRequirementQuirk>) => {
            const quirks: Set<Quirky> = new Set(additionalQuirks);
            peculiarRequirements.forEach((quirk) => {
              quirks.add(quirk);
            });
            setWonder(wonder.updateQuirks(sizeQuirk, quirks));
          }} />
        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <WonderDisplay wonder={wonder} />
        </div>
      </div>
    </div >
  );
}

export default App;
