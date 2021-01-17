import Utils from "../Utils";
import Axiom from "./Axiom";
import Quirk from "./Quirk";

class Wonder {
    public readonly wonderName: string;
    public readonly description: string;
    public readonly axiom?: Axiom;
    public readonly rank?: number;
    public readonly flavor?: string;
    public readonly quirks?: Set<Quirk>;

    private constructor(wonderName: string, description: string, axiom?: Axiom, rank?: number, flavor?: string, quirks?: Set<Quirk>) {
        this.wonderName = wonderName;
        this.description = description;
        this.axiom = axiom;
        this.rank = rank;
        this.flavor = flavor;
        this.quirks = new Set(quirks);
    }

    /**
     * Create a new empty wonder.
     */
    public static createWonder(): Wonder {
        return new Wonder("", "");
    }

    /**
     * Create a new Wonder with updated name, description, axiom, rank, and flavor.
     * @param newName 
     * @param newDescription 
     * @param newAxiom 
     * @param newRank 
     * @param newFlavor 
     */
    public updateBasicProperties(newName: string, newDescription: string, newAxiom?: Axiom, newRank?: number, newFlavor?: string): Wonder {
        return new Wonder(newName, newDescription, newAxiom, newRank, newFlavor, this.quirks);
    }

    /**
     * Create a new Wonder with updated quirks.
     * @param newQuirks 
     */
    public updateQuirks(newQuirks: Set<Quirk>): Wonder {
        return new Wonder(this.wonderName, this.description, this.axiom, this.rank, this.flavor, newQuirks);
    }

    /**
     * Calculate the wonder's core modifier.
     */
    public getCoreModifier(): number {
        if (this.quirks === undefined) {
            return 0;
        }
        return Utils.calculateUsageModifier(this.quirks);
    }
}

export default Wonder;