import Flavor from "./Flavor";
import QuirkTemplate from "./QuirkTemplate";

export type FlavorList = [Flavor[], Flavor[], Flavor[], Flavor[], Flavor[]];

abstract class Axiom {
    public readonly id: string;
    public readonly displayName: string;
    private readonly flavors: FlavorList;
    public readonly quirkTemplates: QuirkTemplate[];

    protected constructor(id: string, displayName: string, flavorList: FlavorList, quirkTemplates: QuirkTemplate[]) {
        this.id = id;
        this.displayName = displayName;
        this.flavors = flavorList;
        this.quirkTemplates = quirkTemplates;
    }

    /**
     * Get the flavors a wonder can be based on its rank.
     * @param rank The one-indexed rank of the wonder
     */
    public getFlavors(rank: number): Flavor[] {
        return this.flavors[rank - 1];
    }
}

export default Axiom;