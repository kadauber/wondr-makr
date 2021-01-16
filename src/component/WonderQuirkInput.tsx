import React from 'react';
import QuirkTemplate, { QuirkTemplateCustomNumberInput } from '../model/QuirkTemplate';
import Utils from '../Utils';

interface WonderQuirkInputProps {
  quirkTemplate: QuirkTemplate;

  isChecked: boolean;
  onIsCheckedChanged: (isChecked: boolean) => void;

  optionSelections?: Map<string, string>;
  onSelectOption: (optionGroupID: string, optionID: string) => void;

  customNumberInputValues?: Map<string, number>;
  onCustomNumberInputValuesChanged: (inputID: string, value: number) => void;
}

function WonderQuirkInput(props: WonderQuirkInputProps) {
  const usageModifier = Utils.renderUsageModifier(props.quirkTemplate.baseUsageModifier);

  function renderNumberInput(numberInput: QuirkTemplateCustomNumberInput) {
    return <div className="ml2 mb2 bl b--near-black" key={numberInput.id}>
      <label className="ml2">
        {numberInput.label}
        <input type="number"
          className="ml1"
          value={props.customNumberInputValues?.get(numberInput.id)}
          onChange={(e) => {
            props.onCustomNumberInputValuesChanged(numberInput.id, parseInt(e.target.value));
          }}
        />
      </label>
    </div>
  }

  function renderCustomNumberInputs() {
    if (props.quirkTemplate.customNumberInputs === undefined) {
      return "";
    }

    return props.quirkTemplate.customNumberInputs.map((numberInput) => {
      return renderNumberInput(numberInput);
    });
  }

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

    {props.isChecked && props.quirkTemplate.customNumberInputs !== undefined && renderCustomNumberInputs()}

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
            />
            <label htmlFor={inputID} className="lh-copy">{option.displayName} ({optionUsageModifier})</label>
          </div>
        })}
      </div>
    })}
  </div>
}

export default WonderQuirkInput;