import Utils from "../Utils";
import Axiom from "./Axiom";
import BaseQuirk from "./BaseQuirk";
import QuirkTemplate from "./QuirkTemplate";
import Quirky from "./Quirky";

class Wonder {
    private _wonderName: string;
    private _creatorName: string;
    private _description: string;
    private _sizeQuirk: BaseQuirk;
    private _axiom?: Axiom;
    private _rank?: number;
    private _flavor?: string;
    private _additionalQuirks?: Set<Quirky>;
    private _axiomQuirks?: Set<Quirky>;

    private constructor(wonderName: string, creatorName: string, description: string, sizeQuirk: BaseQuirk, axiom?: Axiom, rank?: number, flavor?: string, additionalQuirks?: Set<Quirky>, axiomQuirks?: Set<Quirky>) {
        this._wonderName = wonderName;
        this._creatorName = creatorName;
        this._description = description;
        this._sizeQuirk = sizeQuirk;
        this._axiom = axiom;
        this._rank = rank;
        this._flavor = flavor;
        this._additionalQuirks = new Set(additionalQuirks);
        this._axiomQuirks = new Set(axiomQuirks);
    }

    public get wonderName(): string {
        return this._wonderName;
    }

    public get creatorName(): string {
        return this._creatorName;
    }

    public get description(): string {
        return this._description;
    }

    public get sizeQuirk(): BaseQuirk {
        return this._sizeQuirk;
    }

    public get axiom(): Axiom | undefined {
        return this._axiom;
    }

    public get rank(): number | undefined {
        return this._rank;
    }

    public get flavor(): string | undefined {
        return this._flavor;
    }

    public get additionalQuirks(): Set<Quirky> | undefined {
        return this._additionalQuirks;
    }

    public get axiomQuirks(): Set<Quirky> | undefined {
        return this._axiomQuirks;
    }

    /**
     * Create a new empty wonder.
     */
    public static createWonder(): Wonder {
        const sizeQuirk = BaseQuirk.createQuirkFromTemplate(QuirkTemplate.SIZE);
        return new Wonder("", "", "", sizeQuirk);
    }

    private cloneWonder(): Wonder {
        return new Wonder(this._wonderName, this._creatorName, this._description, this._sizeQuirk, this._axiom, this._rank, this._flavor, this._additionalQuirks, this._axiomQuirks);
    }

    /**
     * Create a new Wonder with updated name, description, axiom, rank, and flavor.
     * @param newName 
     * @param newDescription 
     * @param newAxiom 
     * @param newRank 
     * @param newFlavor 
     */
    public updateBasicProperties(newName: string, newCreatorName: string, newDescription: string, newAxiom?: Axiom, newRank?: number, newFlavor?: string): Wonder {
        const newWonder = this.cloneWonder();
        newWonder._wonderName = newName;
        newWonder._creatorName = newCreatorName;
        newWonder._description = newDescription;
        newWonder._axiom = newAxiom;
        newWonder._rank = newRank;
        newWonder._flavor = newFlavor;
        return newWonder;
    }

    /**
     * Create a new Wonder with updated quirks.
     * @param newSizeQuirk
     * @param newQuirks 
     */
    public updateAdditionalQuirks(newSizeQuirk: BaseQuirk, newAdditionalQuirks: Set<Quirky>): Wonder {
        const newWonder = this.cloneWonder();
        newWonder._sizeQuirk = newSizeQuirk;
        newWonder._additionalQuirks = newAdditionalQuirks;
        return newWonder;
    }

    /**
     * Create a new Wonder with updated axiom quirks.
     */
    public updateAxiomQuirks(newAxiomQuirks: Set<Quirky>): Wonder {
        const newWonder = this.cloneWonder();
        newWonder._axiomQuirks = newAxiomQuirks;
        return newWonder;
    }

    /**
     * Calculate the wonder's core modifier.
     */
    public getCoreModifier(): number {
        let coreModifier = this._sizeQuirk.getUsageModifier();
        if (this._additionalQuirks !== undefined) {
            coreModifier += Utils.calculateUsageModifier(this._additionalQuirks);
        }

        if (this._axiomQuirks !== undefined) {
            coreModifier += Utils.calculateUsageModifier(this._axiomQuirks);
        }

        return coreModifier;
    }
}

export default Wonder;