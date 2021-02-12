import Axiom, { AxiomFlavorList } from "../Axiom";
import Flavor from "../Flavor";
import QuirkTemplate from "../QuirkTemplate";

class Automata extends Axiom {
    public static readonly ID = "aut";
    public static readonly DISPLAY_NAME = "Automata";

    public static readonly FLAVOR_LIST: AxiomFlavorList = [
        [Flavor.createFlavor("computer", "Computer")],
        [Flavor.createFlavor("zombie", "Zombie")],
        [Flavor.createFlavor("dog", "Dog")],
        [Flavor.createFlavor("person", "Person")],
        [Flavor.createFlavor("downfall", "Your Downfall")]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [];

    private constructor() {
        super(Automata.ID, Automata.DISPLAY_NAME, Automata.FLAVOR_LIST, Automata.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Automata();
    }
}

export default Automata;