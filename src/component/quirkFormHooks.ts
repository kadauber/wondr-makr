import { useReducer } from "react";
import QuirkTemplate, { QuirkTemplateOption } from "../model/QuirkTemplate";

export function useSelectedQuirkTemplates() {
    function reduceSelectedQuirkTemplates(selectedTemplates: Set<QuirkTemplate>, action: { quirkTemplate: QuirkTemplate, isChecked: boolean }) {
        const newSelectedTemplates = new Set(selectedTemplates);

        if (action.isChecked) {
            newSelectedTemplates.add(action.quirkTemplate);
        } else {
            newSelectedTemplates.delete(action.quirkTemplate);
        }

        return newSelectedTemplates;
    }
    const [selectedQuirkTemplates, dispatchToSelectedQuirkTemplates] = useReducer(reduceSelectedQuirkTemplates, new Set<QuirkTemplate>());

    return { selectedQuirkTemplates, dispatchToSelectedQuirkTemplates };
}


export function useSelectedQuirkOptions(quirkTemplates: QuirkTemplate[]) {
    /**
     * Process an action to take on the selected quirk options
     * @param selectedOptions Previous set of selected options
     * @param action Action to set templateID.get(optionGroupID) to option
     */
    function selectedQuirkOptionsReducer(
        selectedOptions: Map<string, Map<string, QuirkTemplateOption>>,
        action: { templateID: string, optionGroupID: string, option: QuirkTemplateOption }
    ) {
        const newSelectedQuirkOptions = new Map(selectedOptions);

        // Update the template's map { optionGroupID => option }
        newSelectedQuirkOptions.get(action.templateID)?.set(action.optionGroupID, action.option);

        return newSelectedQuirkOptions;
    }

    /**
     * Initialize selected quirk options by setting them to their default values
     * @param selectedOptions Previous set of selected options
     */
    function initSelectedQuirkOptions(selectedOptions: Map<string, Map<string, QuirkTemplateOption>>) {
        const newSelectedOptions = new Map(selectedOptions);

        quirkTemplates.forEach(quirkTemplate => {
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

            newSelectedOptions.set(quirkTemplate.id, quirkTemplateOptions);
        });

        return newSelectedOptions;
    }

    const [selectedQuirkOptions, dispatchToSelectedQuirkOptions] = useReducer(
        selectedQuirkOptionsReducer,
        new Map<string, Map<string, QuirkTemplateOption>>(),
        initSelectedQuirkOptions
    );

    return { selectedQuirkOptions, dispatchToSelectedQuirkOptions };
}

export function useQuirkCustomNumberInputValues(quirkTemplates: QuirkTemplate[]) {
    function reduceQuirkCustomNumberInputValues(
        numberInputValues: Map<string, Map<string, number>>,
        action: { quirkTemplateID: string, inputID: string, value: number }
    ): Map<string, Map<string, number>> {
        // Copy the entire map templateID => { numberInputID => value }}
        const newNumberInputValues = new Map(numberInputValues);

        // Update the template's map { numberInputID => value }
        newNumberInputValues.get(action.quirkTemplateID)?.set(action.inputID, action.value);

        return newNumberInputValues;
    }

    function initQuirkCustomNumberInputValues(numberInputValues: Map<string, Map<string, number>>): Map<string, Map<string, number>> {
        const newTemplateIDToInputs = new Map(numberInputValues);

        quirkTemplates.forEach((quirkTemplate) => {
            const numberInputToValue = new Map<string, number>();
            quirkTemplate.customNumberInputs?.forEach((numberInput) => {
                numberInputToValue.set(numberInput.id, numberInput.defaultValue);
            });
            newTemplateIDToInputs.set(quirkTemplate.id, numberInputToValue);
        });

        return newTemplateIDToInputs;
    }

    const [quirkCustomNumberInputValues, dispatchToQuirkCustomNumberInputValues] = useReducer(
        reduceQuirkCustomNumberInputValues,
        new Map<string, Map<string, number>>(),
        initQuirkCustomNumberInputValues
    );

    return { quirkCustomNumberInputValues, dispatchToQuirkCustomNumberInputValues };
}
