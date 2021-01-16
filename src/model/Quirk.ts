import QuirkTemplate from "./QuirkTemplate";

class Quirk {
    public readonly template: QuirkTemplate;
    // Map from template option ids to option selection ids
    private readonly optionSelections?: Map<string, string>;
    // Arbitrary additional modifier
    private readonly customUsageModifier?: number;

    private constructor(template: QuirkTemplate, optionSelections?: Map<string, string>, customUsageModifier?: number) {
        this.template = template;

        if (optionSelections !== undefined) {
            this.optionSelections = new Map(optionSelections);
        }

        this.customUsageModifier = customUsageModifier;
    }

    public static createQuirk(template: QuirkTemplate, optionSelections?: Map<string, string>, customUsageModifier?: number): Quirk {
        return new Quirk(template, optionSelections, customUsageModifier);
    }

    public getUsageModifier(): number {
        return this.template.getUsageModifier(this.optionSelections, this.customUsageModifier);
    }
}

export default Quirk;