import Utils from "../Utils";
import Axiom from "./Axiom";
import BaseQuirk from "./BaseQuirk";
import QuirkTemplate from "./QuirkTemplate";
import Quirky from "./Quirky";

class Wonder {
    public readonly wonderName: string;
    public readonly description: string;
    public readonly sizeQuirk: BaseQuirk;
    public readonly axiom?: Axiom;
    public readonly rank?: number;
    public readonly flavor?: string;
    public readonly additionalQuirks?: Set<Quirky>;
    public readonly axiomQuirks?: Set<Quirky>;

    private constructor(wonderName: string, description: string, sizeQuirk: BaseQuirk, axiom?: Axiom, rank?: number, flavor?: string, additionalQuirks?: Set<Quirky>, axiomQuirks?: Set<Quirky>) {
        this.wonderName = wonderName;
        this.description = description;
        this.sizeQuirk = sizeQuirk;
        this.axiom = axiom;
        this.rank = rank;
        this.flavor = flavor;
        this.additionalQuirks = new Set(additionalQuirks);
        this.axiomQuirks = new Set(axiomQuirks);
    }

    /**
     * Create a new empty wonder.
     */
    public static createWonder(): Wonder {
        const sizeQuirk = BaseQuirk.createQuirkFromTemplate(QuirkTemplate.SIZE);
        return new Wonder("", "", sizeQuirk);
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
        return new Wonder(newName, newDescription, this.sizeQuirk, newAxiom, newRank, newFlavor, this.additionalQuirks, this.axiomQuirks);
    }

    /**
     * Create a new Wonder with updated quirks.
     * @param newSizeQuirk
     * @param newQuirks 
     */
    public updateAdditionalQuirks(newSizeQuirk: BaseQuirk, additionalQuirks: Set<Quirky>): Wonder {
        return new Wonder(this.wonderName, this.description, newSizeQuirk, this.axiom, this.rank, this.flavor, additionalQuirks, this.axiomQuirks);
    }

    /**
     * Create a new Wonder with updated axiom quirks.
     */
    public updateAxiomQuirks(newAxiomQuirks: Set<Quirky>): Wonder {
        return new Wonder(this.wonderName, this.description, this.sizeQuirk, this.axiom, this.rank, this.flavor, this.additionalQuirks, newAxiomQuirks);
    }

    /**
     * Calculate the wonder's core modifier.
     */
    public getCoreModifier(): number {
        if (this.additionalQuirks === undefined) {
            return this.sizeQuirk.getUsageModifier();
        }

        const quirks = new Set(this.additionalQuirks);
        quirks.add(this.sizeQuirk);

        return Utils.calculateUsageModifier(quirks);
    }
}

export default Wonder;