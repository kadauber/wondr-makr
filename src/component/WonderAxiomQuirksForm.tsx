import React, { useEffect, useState } from "react";
import Axiom from "../model/Axiom";
import BaseQuirk from "../model/BaseQuirk";
import QuirkTemplate, { QuirkTemplateOption } from "../model/QuirkTemplate";
import { useQuirkCustomNumberInputValues, useSelectedQuirkOptions, useSelectedQuirkTemplates } from "./quirkFormHooks";
import WMButton from "./utility/WMButton";
import WonderQuirkInput from "./WonderQuirkInput";

interface WonderAxiomQuirksFormProps {
    axiom: Axiom;
    className?: string;
    onSave: (quirks: Set<BaseQuirk>) => void;
}

function WonderAxiomQuirksForm(props: WonderAxiomQuirksFormProps) {
    const { selectedQuirkTemplates, dispatchToSelectedQuirkTemplates } = useSelectedQuirkTemplates();
    // Map from template ID to (map from option group ID to option ID)
    const { selectedQuirkOptions, dispatchToSelectedQuirkOptions } = useSelectedQuirkOptions(props.axiom.quirkTemplates);
    // Map from template ID to (map from number input ID to value)
    const { quirkCustomNumberInputValues, dispatchToQuirkCustomNumberInputValues } = useQuirkCustomNumberInputValues(props.axiom.quirkTemplates);

    function generateQuirks(): Set<BaseQuirk> {
        return QuirkTemplate.generateQuirks(selectedQuirkTemplates, selectedQuirkOptions, quirkCustomNumberInputValues);
    }

    return <>
        <h3>Axiom Quirks</h3>
        {props.axiom?.quirkTemplates.map((quirkTemplate) => {
            return <WonderQuirkInput quirkTemplate={quirkTemplate}
                isChecked={selectedQuirkTemplates.has(quirkTemplate)}
                onIsCheckedChanged={(isChecked) => dispatchToSelectedQuirkTemplates({ quirkTemplate, isChecked })}
                optionSelections={selectedQuirkOptions.get(quirkTemplate.id)}
                onSelectOption={(optionGroupID, option) => { dispatchToSelectedQuirkOptions({ templateID: quirkTemplate.id, optionGroupID, option }) }}
                customNumberInputValues={quirkCustomNumberInputValues.get(quirkTemplate.id)}
                onCustomNumberInputValuesChanged={(inputID, value) => { dispatchToQuirkCustomNumberInputValues({ quirkTemplateID: quirkTemplate.id, inputID, value }) }}
            />
        })}
        <WMButton onClick={e => props.onSave(generateQuirks())}>Save</WMButton>
    </>

}

export default WonderAxiomQuirksForm;