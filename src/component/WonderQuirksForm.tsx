import { groupEnd } from 'console';
import React, { useEffect, useState } from 'react';
import BaseQuirk from '../model/BaseQuirk';
import PeculiarRequirementQuirk from '../model/PeculiarRequirementQuirk';
import QuirkTemplate, { QuirkTemplateOption } from '../model/QuirkTemplate';
import Quirky from '../model/Quirky';
import Utils from '../Utils';
import WMButton from './utility/WMButton';
import WonderQuirkInput from './WonderQuirkInput';

interface WonderQuirksFormProps {
    className?: string;
    onSave: (sizeQuirk: BaseQuirk, additionalQuirks: Set<BaseQuirk>, peculiarRequirements: Set<PeculiarRequirementQuirk>) => void;
}

function WonderQuirksForm(props: WonderQuirksFormProps) {
    // Wonder quirks
    const [sizeInput, setSizeInput] = useState(3);
    const [selectedQuirkTemplates, setSelectedQuirkTemplates] = useState(new Set<QuirkTemplate>());
    // Map from template ID to (map from option group ID to option ID)
    const [selectedQuirkOptions, setSelectedQuirkOptions] = useState(new Map<string, Map<string, QuirkTemplateOption>>());
    // Map from template ID to (map from number input ID to value)
    const [quirkCustomNumberInputValues, setQuirkCustomNumberInputValues] = useState(new Map<string, Map<string, number>>());
    // Peculiar requirements
    const [peculiarRequirements, setPeculiarRequirements] = useState([] as string[]);

    // Initialize universal quirk settings to defaults
    useEffect(() => {
        const newSelectedQuirkOptions = new Map<string, Map<string, QuirkTemplateOption>>();
        const newQuirkCustomNumberInputValues = new Map<string, Map<string, number>>();

        QuirkTemplate.UNIVERSAL_ADDITIONAL_QUIRK_TEMPLATES.forEach(quirkTemplate => {
            const quirkTemplateOptions = new Map<string, QuirkTemplateOption>();

            // Initialize option groups to default values
            quirkTemplate.optionGroups?.forEach(group => {
                const defaultOption = group.quirkOptions.find((option) => {
                    return option.id === group.defaultOptionID;
                });
                if (defaultOption !== undefined) {
                    quirkTemplateOptions.set(group.id, defaultOption);
                }
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
        const quirks = new Set<BaseQuirk>();

        // Create quirks from checkboxes
        selectedQuirkTemplates.forEach((template: QuirkTemplate) => {
            const options = selectedQuirkOptions.get(template.id);
            const numberInputValues = quirkCustomNumberInputValues.get(template.id);
            const quirk = BaseQuirk.createQuirkFromTemplate(template, options, numberInputValues);
            quirks.add(quirk);
        });

        return quirks;
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
            onSelectOption={((optionGroupID: string, option: QuirkTemplateOption) => {
                // Copy the entire map templateID => { optionGroupID => option }}
                const newSelectedQuirkOptions = new Map(selectedQuirkOptions);

                // Update the template's map { optionGroupID => option }
                newSelectedQuirkOptions.get(quirkTemplate.id)?.set(optionGroupID, option);

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

    return <div className={props.className ?? ""}>
        <h2>2. Add Universal Quirks</h2>
        <p><label className="b">Core Modifier: {Utils.renderUsageModifier(displayCalculatedUsageModifier())}</label></p>
        <div className="flex mb3">
            <label className="">
                <div className="mb2">Size ({Utils.renderUsageModifier(generateSizeQuirk().getUsageModifier())})</div>
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
                    <label htmlFor={`pr-${idx}`} className="b db mb2">Peculiar Requirement #{idx + 1} ({Utils.renderUsageModifier(1)})</label>
                    <textarea id={`pr-${idx}`}
                        className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                        value={peculiarRequirements[idx]}
                        onChange={(e) => {
                            const newPeculiarRequirements = peculiarRequirements.slice();
                            newPeculiarRequirements[idx] = e.target.value;
                            setPeculiarRequirements(newPeculiarRequirements);
                        }}></textarea>
                    <WMButton onClick={(e) => {
                        const newPeculiarRequirements = peculiarRequirements.slice();
                        newPeculiarRequirements.splice(idx, 1);
                        setPeculiarRequirements(newPeculiarRequirements);
                    }}>Remove</WMButton>
                </div>
            })}
            <WMButton onClick={(e) => {
                const newPeculiarRequirements = peculiarRequirements.slice();
                newPeculiarRequirements.push("");
                setPeculiarRequirements(newPeculiarRequirements);
            }}>Add Peculiar Requirement ({Utils.renderUsageModifier(PeculiarRequirementQuirk.PECULIAR_REQUIREMENT_USAGE_MODIFIER)})</WMButton>
        </div>

        <WMButton onClick={(e) => {
            props.onSave(generateSizeQuirk(), generateAdditionalQuirks(), generatePeculiarRequirements());
        }}>Save</WMButton>
    </div>
}

export default WonderQuirksForm;
