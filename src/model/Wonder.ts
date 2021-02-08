import Utils from "../Utils";
import Axiom from "./Axiom";
import BaseQuirk from "./BaseQuirk";
import Flavor from "./Flavor";
import QuirkTemplate from "./QuirkTemplate";
import Quirky from "./Quirky";

class Wonder {
    private _wonderName: string;
    private _creatorName: string;
    private _description: string;
    private _sizeQuirk: BaseQuirk;
    private _axiom?: Axiom;
    private _rank?: number;
    private _flavor?: Flavor;
    private _additionalQuirks?: Set<Quirky>;
    private _axiomQuirks?: Set<Quirky>;

    private constructor(wonderName: string, creatorName: string, description: string, sizeQuirk: BaseQuirk, axiom?: Axiom, rank?: number, flavor?: Flavor, additionalQuirks?: Set<Quirky>, axiomQuirks?: Set<Quirky>) {
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

    private getQuirkFromSetByTemplateID(templateID: string, quirkSet: Set<Quirky>): Quirky | undefined {
        for (const quirk of Array.from(quirkSet)) {
            if ("template" in quirk && (quirk as BaseQuirk).getTemplateID() === templateID) {
                return quirk;
            }
        }
        return undefined;
    }

    private getQuirkByTemplateID(templateID: string): Quirky | undefined {
        if (this._additionalQuirks !== undefined) {
            const additionalQuirk = this.getQuirkFromSetByTemplateID(templateID, this._additionalQuirks);
            if (additionalQuirk !== undefined) {
                return additionalQuirk;
            }
        }

        if (this._axiomQuirks !== undefined) {
            const axiomQuirk = this.getQuirkFromSetByTemplateID(templateID, this._axiomQuirks);
            if (axiomQuirk !== undefined) {
                return axiomQuirk;
            }
        }

        return undefined;
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

    public get size(): number | undefined {
        const sizeInput = this._sizeQuirk.getCustomNumberValue("sizeinput");
        return sizeInput === undefined ? undefined : parseInt(sizeInput);
    }

    public get durability(): number | undefined {
        const isFragile = this.getQuirkByTemplateID(QuirkTemplate.FRAGILE.id) !== undefined;

        if (this.size === undefined) {
            return undefined;
        } else if (isFragile || this.size === 0) {
            return 0;
        } else if (this.size <= 2) {
            return 1;
        } else if (this.size <= 8) {
            return 2;
        } else if (this.size <= 15) {
            return 3;
        } else if (this.size <= 25) {
            return 4;
        } else {
            return 5;
        }
    }

    public get structure(): number | undefined {
        if (this.size === undefined || this.durability === undefined) {
            return undefined;
        } else {
            return this.size + this.durability;
        }
    }

    public get axiom(): Axiom | undefined {
        return this._axiom;
    }

    public get rank(): number | undefined {
        return this._rank;
    }

    public get flavor(): Flavor | undefined {
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
    public updateBasicProperties(newName: string, newCreatorName: string, newDescription: string, newAxiom?: Axiom, newRank?: number, newFlavor?: Flavor): Wonder {
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

    /**
     * Calculate how long it will take to build the wonder.
     */
    public getTimeToBuild(): string {
        if (this.size === undefined) {
            return "Unknown time";
        }

        const timeSteps = [
            "One Turn",
            "One Minute",
            "One Hour",
            "One Day",
            "One Week",
            "One Month",
            "One Year",
            "One Decade",
            "One Century",
            "One Millennium",
            "10,000 Years",
            "100,000 Years",
            "1 Million Years"
        ];

        let baseTimeStep: number = 3;
        if (this.size <= 5) {
            baseTimeStep = 3;
        } else if (this.size <= 10) {
            baseTimeStep = 4;
        } else if (this.size <= 15) {
            baseTimeStep = 5;
        } else if (this.size <= 20) {
            baseTimeStep = 6;
        } else if (this.size <= 25) {
            baseTimeStep = 7;
        } else if (this.size <= 30) {
            baseTimeStep = 8;
        } else {
            baseTimeStep = 9;
        }

        return timeSteps[baseTimeStep]
    }

}

export default Wonder;