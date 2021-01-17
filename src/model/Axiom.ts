import QuirkTemplate from "./QuirkTemplate";

type FlavorList = [string[], string[], string[], string[], string[]];

class Axiom {
    public static readonly APOCALYPSI = new Axiom("apo", "Apocalypsi", [
        ["Scanner / Communicator"],
        ["Direct Scanner", "Mind Reader", "Telepathy Device", "Universal Translator"],
        ["Area Scanner", "Area Mental Scanner",],
        ["Possibility / Probability", "Extradimensional Scanner", "Extradimensional Communicator"],
        ["Everything Detector"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "activescanner",
            "Active Scanner",
            () => { return "Increases the scanner's range by three steps." },
            -1,
            [{
                id: "activescannercanswitch",
                defaultOptionID: "activescanneronly",
                quirkOptions: [
                    {
                        id: "activescanneronly",
                        displayName: "Active only",
                        usageModifier: 0
                    },
                    {
                        id: "activescannerorpassive",
                        displayName: "Can switch between active and passive",
                        usageModifier: -1
                    }
                ]
            }]
        ),
        QuirkTemplate.createQuirkTemplate(
            "onemediumcommunicator",
            "One-Medium Communicator",
            () => "The communicator only transmits via one medium. audio, still pictures, text data, or video",
            1,
            [
                {
                    id: "onemedium",
                    defaultOptionID: "onemediumaudio",
                    quirkOptions: [
                        {
                            id: "onemediumaudio",
                            displayName: "Audio",
                            usageModifier: 0
                        },
                        {
                            id: "onemediumpictures",
                            displayName: "Still pictures",
                            usageModifier: 0
                        },
                        {
                            id: "onemediumtext",
                            displayName: "Text data",
                            usageModifier: 0
                        },
                        {
                            id: "onemediumvideo",
                            displayName: "Video",
                            usageModifier: 0
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "goggles",
            "Goggles",
            () => "They allow for a constant flow of data while the wearer views the environment.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "landline",
            "Land Line",
            () => "The device must be plugged in to function",
            0,
            [
                {
                    id: "landlineextensioncord",
                    defaultOptionID: "landlinenoextensioncord",
                    quirkOptions: [
                        {
                            id: "landlinenoextensioncord",
                            displayName: "No extension cord",
                            usageModifier: +2
                        },
                        {
                            id: "landlinehasextensioncord",
                            displayName: "Extension cord",
                            usageModifier: +1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "narrowfocus",
            "Narrow Focus",
            () => "The device only picks up on one type of thing in its area",
            0,
            [
                {
                    id: "narrowfocustype",
                    defaultOptionID: "narrowfocusoccult",
                    quirkOptions: [
                        {
                            id: "narrowfocusoccult",
                            displayName: "Occult phenomena",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusphysical",
                            displayName: "Physical phenomena",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusenergetic",
                            displayName: "Energetic phenomena",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusbiological",
                            displayName: "Biological phenomena",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusnightvision",
                            displayName: "Night vision",
                            usageModifier: 2
                        },
                        {
                            id: "narrowfocusscrying",
                            displayName: "Scrying",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocustracker",
                            displayName: "Long distance tracking",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocustime",
                            displayName: "Looks through time",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusdimensions",
                            displayName: "Looks across dimensions",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusprobability",
                            displayName: "Probability only",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusprobabilitytype",
                            displayName: "One type of probability",
                            usageModifier: 2
                        },
                        {
                            id: "narrowfocusprognosticator",
                            displayName: "Prognosticator",
                            usageModifier: 1
                        },
                        {
                            id: "narrowfocusuniversaltranslator",
                            displayName: "Universal Translator",
                            usageModifier: 2
                        },
                        {
                            id: "narrowfocusonesense",
                            displayName: "Uses one sense to scan",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "onboardstorage",
            "Onboard Storage",
            () => "The wonder can store the information it collects.",
            0
        )
    ]);
    public static readonly AUTOMATA = new Axiom("aut", "Automata", [
        [],
        [],
        [],
        [],
        []
    ], [

    ]);
    public static readonly EPIKRATO = new Axiom("epi", "Epikrato", [
        ["Object Controller"],
        ["Force Controller"],
        ["Mind Controller"],
        ["Wealth and the Market Controller", "Crowd Controller", "Mover of People and Things", "Political Dominator", "Weather Controller", "Probability Manipulator"],
        ["Identity Controller"]
    ], [

    ]);
    public static readonly EXELIXI = new Axiom("exe", "Exelixi", [
        ["Basic Repair, Healing, and Curing", "Life Support"],
        ["Mechanical Upgrade"],
        ["Biological Upgrade"],
        ["Regenerator", "Replacement Limb"],
        ["Resurrecter and Life Extender"]
    ], []);
    public static readonly KATASTROFI = new Axiom("kat", "Katastrofi", [
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"]
    ], []);
    public static readonly METAPTROPI = new Axiom("met", "Metaptropi", [
        ["Appearance Changer"],
        ["Substance Changer", "Illusion Generator"],
        ["Grower / Shrinker"],
        ["Shape Changer"],
        ["Irrational Transformer"]
    ], []);
    public static readonly PROSTASIA = new Axiom("pro", "Prostasia", [
        ["Armor"],
        ["Armor"],
        ["Armor"],
        ["Armor"],
        ["Armor"]
    ], []);
    public static readonly SKAFOI = new Axiom("ska", "Skafoi", [
        ["Car", "Boat", "Bouncer"],
        ["Plane", "Submarine", "Mole Machine"],
        ["Spaceship", "Super-submarine"],
        ["Teleporter", "Lightspeed Vehicle", "Dimensional Transporter"],
        ["Temporal Distortor", "Time Machine"]
    ], []);

    public readonly id: string;
    public readonly displayName: string;
    private readonly flavors: FlavorList;
    public readonly quirkTemplates: QuirkTemplate[];

    private constructor(id: string, displayName: string, flavorList: FlavorList, quirkTemplates: QuirkTemplate[]) {
        this.id = id;
        this.displayName = displayName;
        this.flavors = flavorList;
        this.quirkTemplates = quirkTemplates;
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