import Quirky from "./Quirky";

class PeculiarRequirementQuirk implements Quirky {
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
        return 1;
    }

    public getEffect(): string {
        return this.requirement;
    }
}

export default PeculiarRequirementQuirk;