import Axiom, { FlavorList } from "../Axiom";
import QuirkTemplate from "../QuirkTemplate";

class Automata extends Axiom {
    public static readonly ID = "apo";
    public static readonly DISPLAY_NAME = "Automata";

    public static readonly FLAVOR_LIST: FlavorList = [
        [],
        [],
        [],
        [],
        []
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