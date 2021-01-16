import Axiom from "./Axiom";
import QuirkTemplate from "./QuirkTemplate";

class Wonder {
    public readonly wonderName: string;
    public readonly description: string;
    public readonly axiom?: Axiom;
    public readonly rank?: number;
    public readonly flavor?: string;
    public readonly quirks?: Set<QuirkTemplate>;

    private constructor(wonderName: string, description: string, axiom?: Axiom, rank?: number, flavor?: string, quirks?: Set<QuirkTemplate>) {
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
    public updateQuirks(newQuirks: Set<QuirkTemplate>): Wonder {
        return new Wonder(this.wonderName, this.description, this.axiom, this.rank, this.flavor, newQuirks);
    }
}

export default Wonder;