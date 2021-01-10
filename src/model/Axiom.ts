export class Flavor {

}

type FlavorList = [string[], string[], string[], string[], string[]];

class Axiom {
    public static readonly APOCALYPSI = new Axiom("apo", "Apocalypsi", [
        ["Scanner / Communicator"],
        ["Direct Scanner", "Mind Reader", "Telepathy Device", "Universal Translator"],
        ["Area Scanner", "Area Mental Scanner", ],
        ["Possibility / Probability", "Extradimensional Scanner", "Extradimensional Communicator"],
        ["Everything Detector"]
    ]);
    public static readonly AUTOMATA = new Axiom("aut", "Automata", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly EPIKRATO = new Axiom("epi", "Epikrato", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly EXELIXI = new Axiom("exe", "Exelixi", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly KATASTROFI = new Axiom("kat", "Katastrofi", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly METAPTROPI = new Axiom("met", "Metaptropi", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly PROSTASIA = new Axiom("pro", "Prostasia", [
        [],
        [],
        [],
        [],
        []
    ]);
    public static readonly SKAFOI = new Axiom("ska", "Skafoi", [
        [],
        [],
        [],
        [],
        []
    ]);

    public readonly id: string;
    public readonly displayName: string;
    private readonly flavors: FlavorList;

    private constructor(id: string, displayName: string, flavorList: FlavorList) {
        this.id = id;
        this.displayName = displayName;
        this.flavors = flavorList;
    }

    /**
     * Get the flavors a wonder can be based on its rank.
     * @param rank The one-indexed rank of the wonder
     */
    public getFlavors(rank: number): string[] {
        return this.flavors[rank - 1];
    }
}

export default Axiom;