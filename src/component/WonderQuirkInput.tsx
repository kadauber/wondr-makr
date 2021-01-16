import React, { useState } from 'react';
import QuirkTemplate from '../model/QuirkTemplate';
import Utils from '../Utils';

interface WonderQuirkInputProps {
  quirkTemplate: QuirkTemplate;
  isChecked: boolean;
  onIsCheckedChanged: (isChecked: boolean) => void;
  optionSelections?: Map<string, string>;
  onSelectOption: (optionGroupID: string, optionID: string) => void;
}

function WonderQuirkInput(props: WonderQuirkInputProps) {
  const [customNumberInputValue, setCustomNumberInputValue] = useState(0);
  const [customStringInputValue, setCustomStringInputValue] = useState("");

  const usageModifier = Utils.renderUsageModifier(props.quirkTemplate.baseUsageModifier);

  // function renderCustomNumberInput(id: string, label: string) {
  //   return <div className="ml2 mb2 bl b--near-black">
  //     <label className="ml2">
  //       {label}
  //       <input type="number"
  //         className="ml1"
  //         value={customNumberInputValue}
  //         // value={quirkCustomNumberInputValues.get(quirk.customNumberInput.id)}
  //         onChange={(e) => {
  //           const inputID = quirk.customNumberInput?.id;
  //           if (inputID !== undefined) {
  //             const newQuirkCustomNumberInputValues = new Map(quirkCustomNumberInputValues);
  //             newQuirkCustomNumberInputValues.set(inputID, parseInt(e.target.value));
  //             setQuirkCustomNumberInputValues(newQuirkCustomNumberInputValues);
  //           }
  //         }}
  //       />
  //     </label>
  //   </div>
  // }

  // function renderCustomStringInput() {
  //   <div className="ml2 mb2 bl b--near-black">
  //     <label className="ml2">
  //       {quirk.customStringInput.label}
  //       <input type="text"
  //         className="ml1"
  //         value={quirkCustomStringInputValues.get(quirk.customStringInput.id)}
  //         onChange={(e) => {
  //           const inputID = quirk.customStringInput?.id;
  //           if (inputID !== undefined) {
  //             const newQuirkCustomStringInputValues = new Map(quirkCustomStringInputValues);
  //             newQuirkCustomStringInputValues.set(inputID, e.target.value);
  //             setQuirkCustomStringInputValues(newQuirkCustomStringInputValues);
  //           }
  //         }} />
  //     </label>
  //   </div>
  // }

  return <div key={props.quirkTemplate.id}>
    <div className="flex items-center mb2">
      <input className="w1 mr2"
        type="checkbox"
        id={props.quirkTemplate.id}
        checked={props.isChecked}
        onChange={(e) => {
          props.onIsCheckedChanged(e.target.checked);
        }}
      />
      <label htmlFor={props.quirkTemplate.id} className="lh-copy">{props.quirkTemplate.displayName} ({usageModifier})</label>
    </div>

    {/* {props.isChecked && props.quirkTemplate.customNumberInputs !== undefined && renderCustomNumberInput()}

    {props.isChecked && props.quirkTemplate.customStringInputs !== undefined && renderCustomStringInput()} */}

    {props.isChecked && props.quirkTemplate.optionGroups?.map((optionGroup, i) => {
      return <div key={i} className="ml2 bl b--near-black">
        {optionGroup.quirkOptions.map((option, j) => {
          const inputID = `${props.quirkTemplate.id}-${optionGroup.id}-${option.id}`;
          const optionUsageModifier = Utils.renderUsageModifier(option.usageModifier);

          return <div className="flex items-center mb2 ml2" key={j}>
            <input className="mr2"
              type="radio"
              id={inputID}
              name={`${props.quirkTemplate.id}-${i}`}
              value={option.id}
              checked={props.optionSelections?.get(optionGroup.id) === option.id}
              onChange={(e) => {
                props.onSelectOption(optionGroup.id, option.id);
              }}
              // checked={selectedQuirkOptions.get(optionGroup.id) === option.id}
              // onChange={(e) => {
              //   const newSelectedQuirkOptions = new Map(selectedQuirkOptions);
              //   newSelectedQuirkOptions.set(optionGroup.id, option.id);
              //   setSelectedQuirkOptions(newSelectedQuirkOptions);
              // }}
            />
            <label htmlFor={inputID} className="lh-copy">{option.displayName} ({optionUsageModifier})</label>
          </div>
        })}
      </div>
    })}
  </div>
}

export default WonderQuirkInput;