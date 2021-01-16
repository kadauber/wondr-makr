import QuirkTemplate from "./QuirkTemplate";

class Quirk {
    public readonly template: QuirkTemplate;
    // Map from template option ids to option selection ids
    private readonly optionSelections?: Map<string, string>;
    // Arbitrary additional modifiers
    private readonly customNumberInputValues?: Map<string, number>;

    private constructor(template: QuirkTemplate, optionSelections?: Map<string, string>, customNumberInputValues?: Map<string, number>) {
        this.template = template;

        if (optionSelections !== undefined) {
            this.optionSelections = new Map(optionSelections);
        }

        this.customNumberInputValues = customNumberInputValues;
    }

    public static createQuirk(template: QuirkTemplate, optionSelections?: Map<string, string>, customNumberInputValues?: Map<string, number>): Quirk {
        return new Quirk(template, optionSelections, customNumberInputValues);
    }

    public getUsageModifier(): number {
        let usageModifier = 0;

        // Add template base modifier
        usageModifier += this.template.baseUsageModifier;

        // Add options
        usageModifier += this.template.getOptionsModifier(this.optionSelections);

        // Add template cases
        if (this.template.id === QuirkTemplate.MANIA_COST.id) {
          const maniaCostMod = this.customNumberInputValues?.get("maniacostmod");
          if (maniaCostMod !== undefined) {
            usageModifier += maniaCostMod;
          }
        }
  
        if (this.template.id === QuirkTemplate.RESILIENT.id) {
          const resilientRankCount = this.customNumberInputValues?.get("resilientrankcount");
          if (resilientRankCount !== undefined) {
            usageModifier += -1 * resilientRankCount;
          }
        }
  
        return usageModifier;
    }
}

export default Quirk;