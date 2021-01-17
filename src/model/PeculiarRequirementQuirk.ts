import Quirky from "./Quirky";

class PeculiarRequirementQuirk implements Quirky {
    public static readonly PECULIAR_REQUIREMENT_USAGE_MODIFIER = 1;

    private readonly requirement: string;

    private constructor(requirement: string) {
        this.requirement = requirement;
    }

    public static createPeculiarRequirementQuirk(requirement: string) {
        return new PeculiarRequirementQuirk(requirement);
    }

    public getDisplayName(): string {
        return "Peculiar Requirement";
    }

    public getUsageModifier(): number {
        return PeculiarRequirementQuirk.PECULIAR_REQUIREMENT_USAGE_MODIFIER;
    }

    public getEffect(): string {
        return this.requirement;
    }
}

export default PeculiarRequirementQuirk;