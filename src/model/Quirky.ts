export default interface Quirky {
    getDisplayName(): string;
    getUsageModifier(): number;
    getEffect(optionSelections?: Map<string, string>, customNumberInputValues?: Map<string, number>): string;
}