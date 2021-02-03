import Axiom, { FlavorList } from "../Axiom";
import Flavor from "../Flavor";
import QuirkTemplate from "../QuirkTemplate";

class Apocalypsi extends Axiom {
    public static readonly ID = "apo";
    public static readonly DISPLAY_NAME = "Apocalypsi";

    public static readonly FLAVORS = {
        SCANNER_COMMUNICATOR: Flavor.createFlavor("scanner", "Scanner / Communicator"),
        DIRECT_SCANNER: Flavor.createFlavor("directscanner", "Direct Scanner"),
        MIND_READER: Flavor.createFlavor("mindreader", "Mind Reader"),
        TELEPATHY_DEVICE: Flavor.createFlavor("telepathy", "Telepathy Device"),
        UNIVERSAL_TRANSLATOR: Flavor.createFlavor("universaltranslator", "Universal Translator"),
        AREA_SCANNER: Flavor.createFlavor("areascanner", "Area Scanner"),
        AREA_MENTAL_SCANNER: Flavor.createFlavor("areamentalscanner", "Area Mental Scanner"),
        POSSIBILITY_PROBABILITY: Flavor.createFlavor("possibilityprobability", "Possibility / Probability"),
        EXTRADIMENSIONAL_SCANNER: Flavor.createFlavor("extradimensionalscanner", "Extradimensional Scanner"),
        EXTRADIMENSIONAL_COMMUNICATOR: Flavor.createFlavor("extradimensionalcommunicator", "Extradimensional Communicator"),
        EVERYTHING_DETECTOR: Flavor.createFlavor("everythingdetector", "Everything Detector")
    }

    public static readonly FLAVOR_LIST: FlavorList = [
        [Apocalypsi.FLAVORS.SCANNER_COMMUNICATOR],
        [Apocalypsi.FLAVORS.DIRECT_SCANNER, Apocalypsi.FLAVORS.MIND_READER, Apocalypsi.FLAVORS.TELEPATHY_DEVICE, Apocalypsi.FLAVORS.UNIVERSAL_TRANSLATOR],
        [Apocalypsi.FLAVORS.AREA_SCANNER, Apocalypsi.FLAVORS.AREA_MENTAL_SCANNER],
        [Apocalypsi.FLAVORS.POSSIBILITY_PROBABILITY, Apocalypsi.FLAVORS.EXTRADIMENSIONAL_SCANNER, Apocalypsi.FLAVORS.EXTRADIMENSIONAL_COMMUNICATOR],
        [Apocalypsi.FLAVORS.EVERYTHING_DETECTOR]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Apocalypsi.ID, Apocalypsi.DISPLAY_NAME, Apocalypsi.FLAVOR_LIST, Apocalypsi.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Apocalypsi();
    }
}

export default Apocalypsi;