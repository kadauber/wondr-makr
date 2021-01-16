import React, { useEffect, useState } from 'react';
import './App.css';
import WMButton from './component/utility/WMButton';
import WonderBasicPropertiesForm from './component/WonderBasicPropertiesForm';
import WonderDisplay from './component/WonderDisplay';
import WonderQuirkInput from './component/WonderQuirkInput';
import Axiom from './model/Axiom';
import Quirk from './model/Quirk';
import QuirkTemplate from './model/QuirkTemplate';
import Wonder from './model/Wonder';
import Utils from './Utils';

function App() {
  // Wonder state
  const [wonder, setWonder] = useState(Wonder.createWonder());

  // Wonder quirks
  const [selectedQuirkTemplates, setSelectedQuirkTemplates] = useState(new Set<QuirkTemplate>());
  // Map from template ID to (map from option group ID to option ID)
  const [selectedQuirkOptions, setSelectedQuirkOptions] = useState(new Map<string, Map<string, string>>());
  // Map from template ID to (map from number input ID to value)
  const [quirkCustomNumberInputValues, setQuirkCustomNumberInputValues] = useState(new Map<string, Map<string, number>>());

  // Initialize universal quirk settings to defaults
  useEffect(() => {
    const newSelectedQuirkOptions = new Map<string, Map<string, string>>();
    const newQuirkCustomNumberInputValues = new Map<string, Map<string, number>>();

    QuirkTemplate.UNIVERSAL_QUIRK_TEMPLATES.forEach(quirkTemplate => {
      const quirkTemplateOptions = new Map<string, string>();

      // Initialize option groups to default values
      quirkTemplate.optionGroups?.forEach(group => {
        quirkTemplateOptions.set(group.id, group.defaultOptionID);
      });
      newSelectedQuirkOptions.set(quirkTemplate.id, quirkTemplateOptions);

      // Initialize number inputs to default values
      const numberInputValues = new Map<string, number>();
      quirkTemplate.customNumberInputs?.forEach((numberInput) => {
        numberInputValues.set(numberInput.id, numberInput.defaultValue);
      });
      newQuirkCustomNumberInputValues.set(quirkTemplate.id, numberInputValues);
    });

    setSelectedQuirkOptions(newSelectedQuirkOptions);
    setQuirkCustomNumberInputValues(newQuirkCustomNumberInputValues);
  }, []);

  function displayCalculatedUsageModifier() {
    const quirks = new Set<Quirk>();

    // Create quirks from state
    selectedQuirkTemplates.forEach((template: QuirkTemplate) => {
      const options = selectedQuirkOptions.get(template.id);
      const numberInputValues = quirkCustomNumberInputValues.get(template.id);
      const quirk = Quirk.createQuirk(template, options, numberInputValues);
      quirks.add(quirk);
    });

    let usageModifier = 0;
    quirks.forEach(quirk => {
      usageModifier += quirk.getUsageModifier();
    });
    return usageModifier;
  }

  function renderQuirkInput(quirkTemplate: QuirkTemplate) {
    return <WonderQuirkInput key={quirkTemplate.id}
      quirkTemplate={quirkTemplate}
      isChecked={selectedQuirkTemplates.has(quirkTemplate)}
      onIsCheckedChanged={(isChecked: boolean) => {
        const newSelectedQuirkTemplates = new Set(selectedQuirkTemplates);

        if (isChecked) {
          newSelectedQuirkTemplates.add(quirkTemplate);
        } else {
          newSelectedQuirkTemplates.delete(quirkTemplate);
        }

        setSelectedQuirkTemplates(newSelectedQuirkTemplates);
      }}
      optionSelections={selectedQuirkOptions.get(quirkTemplate.id)}
      onSelectOption={((optionGroupID: string, optionID: string) => {
        // Copy the entire map templateID => { optionGroupID => optionID }}
        const newSelectedQuirkOptions = new Map(selectedQuirkOptions);

        // Update the template's map { optionGroupID => optionID }
        newSelectedQuirkOptions.get(quirkTemplate.id)?.set(optionGroupID, optionID);

        setSelectedQuirkOptions(newSelectedQuirkOptions);
      })}
      customNumberInputValues={quirkCustomNumberInputValues.get(quirkTemplate.id)}
      onCustomNumberInputValuesChanged={(inputID: string, value: number) => {
        // Copy the entire map templateID => { numberInputID => value }}
        const newNumberInputValues = new Map(quirkCustomNumberInputValues);

        // Update the template's map { numberInputID => value }
        newNumberInputValues.get(quirkTemplate.id)?.set(inputID, value);

        setQuirkCustomNumberInputValues(newNumberInputValues);
      }}
    />
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

          <div>
            <h2>2. Quirks</h2>
            <p><label className="b">Core Modifier: {Utils.renderUsageModifier(displayCalculatedUsageModifier())}</label></p>
            <h3>Universal Quirks</h3>
            {QuirkTemplate.UNIVERSAL_QUIRK_TEMPLATES.map(quirkTemplate => renderQuirkInput(quirkTemplate))}

            <WMButton>Save</WMButton>
          </div>

        </div>

        <div className="ml2 pa2 bg-near-white mw7 shadow-1 flex-grow-1">
          <WonderDisplay wonder={wonder} />
        </div>
      </div>
    </div >
  );
}

export default App;
