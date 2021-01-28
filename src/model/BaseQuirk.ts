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

    if (this.template.id === "longrange") {
      const longRangeRank = this.customNumberInputValues?.get("longrangerank");
      if (longRangeRank !== undefined) {
        usageModifier = longRangeRank * -1;
      }
    }

    if (this.template.id === "manyminds") {
      const manyMindsRank = this.customNumberInputValues?.get("manymindsrank") ?? 0;
      if (manyMindsRank < 0) {
        return 0;
      } else {
        return manyMindsRank * -1;
      }
    }

    if (this.template.id === "increasedrangeexelixi" || this.template.id === "increasedrangemetaptropi" || this.template.id === "increasedrangeskafoi") {
      const increasedRangeRank = this.customNumberInputValues?.get("increasedrangerank");
      if (increasedRangeRank !== undefined) {
        usageModifier += increasedRangeRank * -1;
      }
    }

    if (this.template.id === "adjustedrange") {
      const adjustedRangeRank = this.customNumberInputValues?.get("rangeadjustment");
      if (adjustedRangeRank !== undefined) {
        usageModifier += adjustedRangeRank * -1;
      }
    }

    if (this.template.id === "armorpiercing") {
      const armorPiercingRanks = this.customNumberInputValues?.get("armorpiercingranks");
      if (armorPiercingRanks !== undefined) {
        usageModifier += armorPiercingRanks * -1;
      }
    }

    if (this.template.id === "goodbalanceandweight") {
      const goodBalanceAndWeightRanks = this.customNumberInputValues?.get("goodbalanceandweightranks");
      if (goodBalanceAndWeightRanks !== undefined) {
        usageModifier += goodBalanceAndWeightRanks * -1;
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