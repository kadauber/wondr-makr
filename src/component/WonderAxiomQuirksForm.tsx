import React, { useEffect, useState } from "react";
import Axiom from "../model/Axiom";
import BaseQuirk from "../model/BaseQuirk";
import QuirkTemplate, { QuirkTemplateOption } from "../model/QuirkTemplate";
import WMButton from "./utility/WMButton";
import WonderQuirkInput from "./WonderQuirkInput";

interface WonderAxiomQuirksFormProps {
    axiom?: Axiom;
    className?: string;
    onSave: (quirks: Set<BaseQuirk>) => void;
}

function WonderAxiomQuirksForm(props: WonderAxiomQuirksFormProps) {
    const [selectedQuirkTemplates, setSelectedQuirkTemplates] = useState(new Set<QuirkTemplate>());
    // Map from template ID to (map from option group ID to option ID)
    const [selectedQuirkOptions, setSelectedQuirkOptions] = useState(new Map<string, Map<string, QuirkTemplateOption>>());
    // Map from template ID to (map from number input ID to value)
    const [quirkCustomNumberInputValues, setQuirkCustomNumberInputValues] = useState(new Map<string, Map<string, number>>());

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

    function generateQuirks(): Set<BaseQuirk> {
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

    if (props.axiom === undefined) {
        return "";
    }
    return <>
        <h2>3. Add Axiom-specific Quirks</h2>
        {props.axiom?.quirkTemplates.map((quirkTemplate) => {
            return <WonderQuirkInput quirkTemplate={quirkTemplate}
                isChecked={false}
                onIsCheckedChanged={() => { }}
                onSelectOption={() => { }}
                onCustomNumberInputValuesChanged={() => { }}
            />
        })}
        <WMButton onClick={e => props.onSave(generateQuirks())}>Save</WMButton>
    </>

}

export default WonderAxiomQuirksForm;