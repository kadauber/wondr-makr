import QuirkTemplate, { QuirkTemplateOption } from "./QuirkTemplate";
import Quirky from "./Quirky";

class BaseQuirk implements Quirky {
  private readonly template: QuirkTemplate;
  // Map from template option ids to option selection ids
  private readonly optionSelections?: Map<string, QuirkTemplateOption>;
  // Arbitrary additional modifiers
  private readonly customNumberInputValues?: Map<string, number>;

  private constructor(template: QuirkTemplate, optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) {
    this.template = template;

    if (optionSelections !== undefined) {
      this.optionSelections = new Map(optionSelections);
    }

    this.customNumberInputValues = customNumberInputValues;
  }

  public static createQuirkFromTemplate(template: QuirkTemplate, optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>): BaseQuirk {
    return new BaseQuirk(template, optionSelections, customNumberInputValues);
  }

  public getDisplayName(): string {
    return this.template.displayName;
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

    if (this.template.id === QuirkTemplate.SIZE.id) {
      const size = this.customNumberInputValues?.get("sizeinput");
      if (size !== undefined) {
        if (size <= 0) {
          usageModifier -= 2;
        } else if (size === 1) {
          usageModifier -= 1;
        } else if (size <= 3) {
          usageModifier += 0;
        } else if (size <= 5) {
          usageModifier += 1;
        } else if (size <= 11) {
          usageModifier += 2;
        } else if (size <= 29) {
          usageModifier += 3;
        } else {
          usageModifier += 4;
        }
      }
    }

    return usageModifier;
  }

  public getEffect(): string {
    return this.template.getEffect(this.optionSelections, this.customNumberInputValues);
  }

  public getCustomNumberValue(inputID: string): string | undefined {
    const value = this.customNumberInputValues?.get(inputID)
    return value === undefined ? value : value.toString();
  }
}

export default BaseQuirk;