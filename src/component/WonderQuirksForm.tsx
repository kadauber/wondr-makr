import React, { useEffect, useState } from 'react';
import Quirk from '../model/Quirk';
import QuirkTemplate from '../model/QuirkTemplate';
import Utils from '../Utils';
import WMButton from './utility/WMButton';
import WonderQuirkInput from './WonderQuirkInput';

interface WonderQuirksFormProps {
    className?: string;
    onSave: (quirks: Set<Quirk>) => void;
}

function WonderQuirksForm(props: WonderQuirksFormProps) {
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

    function generateQuirks(): Set<Quirk> {
        const quirks = new Set<Quirk>();

        // Create quirks from state
        selectedQuirkTemplates.forEach((template: QuirkTemplate) => {
            const options = selectedQuirkOptions.get(template.id);
            const numberInputValues = quirkCustomNumberInputValues.get(template.id);
            const quirk = Quirk.createQuirk(template, options, numberInputValues);
            quirks.add(quirk);
        });

        return quirks;
    }

    function displayCalculatedUsageModifier() {
        const quirks = generateQuirks();
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

    return <div className={props.className ?? ""}>
        <h2>2. Add Quirks</h2>
        <p><label className="b">Core Modifier: {Utils.renderUsageModifier(displayCalculatedUsageModifier())}</label></p>
        <h3>Universal Quirks</h3>
        {QuirkTemplate.UNIVERSAL_QUIRK_TEMPLATES.map(quirkTemplate => renderQuirkInput(quirkTemplate))}

        <WMButton onClick={(e) => {
            props.onSave(generateQuirks());
        }}>Save</WMButton>
    </div>
}

export default WonderQuirksForm;
