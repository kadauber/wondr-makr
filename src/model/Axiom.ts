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
        ["Object Controller"],
        ["Force Controller"],
        ["Mind Controller"],
        ["Wealth and the Market Controller", "Crowd Controller", "Mover of People and Things", "Political Dominator", "Weather Controller", "Probability Manipulator"],
        ["Identity Controller"]
    ]);
    public static readonly EXELIXI = new Axiom("exe", "Exelixi", [
        ["Basic Repair, Healing, and Curing", "Life Support"],
        ["Mechanical Upgrade"],
        ["Biological Upgrade"],
        ["Regenerator", "Replacement Limb"],
        ["Resurrecter and Life Extender"]
    ]);
    public static readonly KATASTROFI = new Axiom("kat", "Katastrofi", [
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"]
    ]);
    public static readonly METAPTROPI = new Axiom("met", "Metaptropi", [
        ["Appearance Changer"],
        ["Substance Changer", "Illusion Generator"],
        ["Grower / Shrinker"],
        ["Shape Changer"],
        ["Irrational Transformer"]
    ]);
    public static readonly PROSTASIA = new Axiom("pro", "Prostasia", [
        ["Armor"],
        ["Armor"],
        ["Armor"],
        ["Armor"],
        ["Armor"]
    ]);
    public static readonly SKAFOI = new Axiom("ska", "Skafoi", [
        ["Car", "Boat", "Bouncer"],
        ["Plane", "Submarine", "Mole Machine"],
        ["Spaceship", "Super-submarine"],
        ["Teleporter", "Lightspeed Vehicle", "Dimensional Transporter"],
        ["Temporal Distortor", "Time Machine"]
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