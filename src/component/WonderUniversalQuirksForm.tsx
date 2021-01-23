import React, { useReducer, useState } from 'react';
import BaseQuirk from '../model/BaseQuirk';
import PeculiarRequirementQuirk from '../model/PeculiarRequirementQuirk';
import QuirkTemplate, { QuirkTemplateOption } from '../model/QuirkTemplate';
import Quirky from '../model/Quirky';
import Utils from '../Utils';
import { useQuirkCustomNumberInputValues, useSelectedQuirkOptions, useSelectedQuirkTemplates } from './quirkFormHooks';
import WMButton from './utility/WMButton';
import WonderQuirkInput from './WonderQuirkInput';

interface WonderQuirksFormProps {
    className?: string;
    onSave: (sizeQuirk: BaseQuirk, additionalQuirks: Set<BaseQuirk>, peculiarRequirements: Set<PeculiarRequirementQuirk>) => void;
}

function WonderQuirksForm(props: WonderQuirksFormProps) {
    // Wonder quirks
    const [sizeInput, setSizeInput] = useState(3);

    // Selected quirk templates
    const {selectedQuirkTemplates, dispatchToSelectedQuirkTemplates} = useSelectedQuirkTemplates();
    // Map from template ID to (map from option group ID to option ID)
    const { selectedQuirkOptions, dispatchToSelectedQuirkOptions } = useSelectedQuirkOptions(QuirkTemplate.UNIVERSAL_ADDITIONAL_QUIRK_TEMPLATES);
    // Map from template ID to (map from number input ID to value)
    const { quirkCustomNumberInputValues, dispatchToQuirkCustomNumberInputValues } = useQuirkCustomNumberInputValues(QuirkTemplate.UNIVERSAL_ADDITIONAL_QUIRK_TEMPLATES);

    // Peculiar requirements
    function reducePeculiarRequirements(
        requirements: string[],
        action: { type: "add" | "remove" | "update", idx?: number, requirement?: string }
    ): string[] {
        const newRequirements = requirements.slice();

        switch (action.type) {
            case "add":
                newRequirements.push("");
                break;
            case "remove":
                action.idx !== undefined && newRequirements.splice(action.idx, 1);
                break;
            case "update":
                if (action.requirement !== undefined && action.idx !== undefined) {
                    newRequirements[action.idx] = action.requirement;
                }
                break;
            default:
                break;
        }

        return newRequirements;
    }
    const [peculiarRequirements, dispatchToPeculiarRequirements] = useReducer(reducePeculiarRequirements, [] as string[]);

    function generateSizeQuirk(): BaseQuirk {
        const sizeNumberInputMap = new Map<string, number>();
        if (QuirkTemplate.SIZE.customNumberInputs !== undefined) {
            sizeNumberInputMap.set(QuirkTemplate.SIZE.customNumberInputs[0].id, sizeInput);
        } else {
            console.error("Uh check your size quirk template, it's missing a number input");
        }
        return BaseQuirk.createQuirkFromTemplate(QuirkTemplate.SIZE, undefined, sizeNumberInputMap);
    }

    function generateAdditionalQuirks(): Set<BaseQuirk> {
        return QuirkTemplate.generateQuirks(selectedQuirkTemplates, selectedQuirkOptions, quirkCustomNumberInputValues);
    }

    function generatePeculiarRequirements(): Set<PeculiarRequirementQuirk> {
        const quirks = new Set<PeculiarRequirementQuirk>();
        peculiarRequirements.forEach((requirement) => {
            quirks.add(PeculiarRequirementQuirk.createPeculiarRequirementQuirk(requirement));
        });
        return quirks;
    }

    function displayCalculatedUsageModifier() {
        const quirks: Set<Quirky> = generateAdditionalQuirks();
        quirks.add(generateSizeQuirk());
        generatePeculiarRequirements().forEach((requirementQuirk) => {
            quirks.add(requirementQuirk);
        });
        return Utils.calculateUsageModifier(quirks);
    }

    function renderQuirkInput(quirkTemplate: QuirkTemplate) {
        return <WonderQuirkInput key={quirkTemplate.id}
            quirkTemplate={quirkTemplate}
            isChecked={selectedQuirkTemplates.has(quirkTemplate)}
            onIsCheckedChanged={(isChecked: boolean) => dispatchToSelectedQuirkTemplates({ quirkTemplate, isChecked })}
            optionSelections={selectedQuirkOptions.get(quirkTemplate.id)}
            onSelectOption={((optionGroupID: string, option: QuirkTemplateOption) => {
                dispatchToSelectedQuirkOptions({
                    templateID: quirkTemplate.id,
                    optionGroupID,
                    option
                });
            })}
            customNumberInputValues={quirkCustomNumberInputValues.get(quirkTemplate.id)}
            onCustomNumberInputValuesChanged={(inputID: string, value: number) => {
                dispatchToQuirkCustomNumberInputValues({ quirkTemplateID: quirkTemplate.id, inputID, value });
            }}
        />
    }

    return <div className={props.className ?? ""}>
        <h3>Universal Quirks</h3>
        <p><label className="b">Core Modifier: {Utils.renderUsageModifier(displayCalculatedUsageModifier(), false)}</label></p>
        <div className="flex mb3">
            <label className="">
                <div className="mb2">Size {Utils.renderUsageModifier(generateSizeQuirk().getUsageModifier())}</div>
                <div className="flex items-center">
                    <input type="number"
                        id="size-input-number"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(parseInt(e.target.value))}
                        min="0"
                        max="30"
                    />
                    <input type="range"
                        className="ml2 w5"
                        id="size-input-range"
                        min="0" max="30"
                        step="1"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(parseInt(e.target.value))}
                    />
                </div>
            </label>
        </div>
        {QuirkTemplate.UNIVERSAL_ADDITIONAL_QUIRK_TEMPLATES.map(quirkTemplate => renderQuirkInput(quirkTemplate))}

        <div className="mv4">
            {peculiarRequirements.map((requirement, idx) => {
                return <div className="mb3" key={idx}>
                    <label htmlFor={`pr-${idx}`} className="b db mb2">Peculiar Requirement #{idx + 1} {Utils.renderUsageModifier(1)}</label>
                    <textarea id={`pr-${idx}`}
                        className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                        value={peculiarRequirements[idx]}
                        onChange={(e) => dispatchToPeculiarRequirements({ type: "update", requirement: e.target.value, idx })}></textarea>
                    <WMButton onClick={(e) => dispatchToPeculiarRequirements({ type: "remove", idx}) }>Remove</WMButton>
                </div>
            })}
            <WMButton onClick={(e) => dispatchToPeculiarRequirements({ type: "add" })}>Add Peculiar Requirement {Utils.renderUsageModifier(PeculiarRequirementQuirk.PECULIAR_REQUIREMENT_USAGE_MODIFIER)}</WMButton>
        </div>

        <WMButton onClick={(e) => {
            props.onSave(generateSizeQuirk(), generateAdditionalQuirks(), generatePeculiarRequirements());
        }}>Save</WMButton>
    </div>
}

export default WonderQuirksForm;
