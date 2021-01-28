import QuirkTemplate, { QuirkTemplateOption } from "./QuirkTemplate";

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
        QuirkTemplate.createQuirkTemplate(
            "epikratoray",
            "Epikrato Ray",
            () => "Shoots a ray that costs one point of Mania to activate for a scene and requires a Wits + Firearms + Katastrofi check to hit. Usage modifier only applies to targets ten or more feet away that are not the user.",
            3
        ),
        QuirkTemplate.createQuirkTemplate(
            "invisibleeffect",
            "Invisible Effect",
            () => "Does not produce light or sound when activated.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "longrange",
            "Long Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => `This wonder's range is multiplied by ${customNumberInputValues?.get("longrangeranks")}`,
            0,
            undefined,
            [
                {
                    id: "longrangeranks",
                    label: "Ranks in long range",
                    defaultValue: 0
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "manyminds",
            "Many Minds",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const manyMindsRank = customNumberInputValues?.get("manymindsrank") ?? 0;
                const manyMindsRadius = 5 * (2 ** (manyMindsRank - 1));
                return `This wonder can control minds within ${manyMindsRadius} feet of it.`;
            },
            0,
            undefined,
            [
                {
                    id: "manymindsrank",
                    defaultValue: 0,
                    label: "Ranks in Many Minds"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "norange",
            "No Range",
            () => "The Epikrato wonder has basically no range.",
            2
        ),
        QuirkTemplate.createQuirkTemplate(
            "onepurposemanipulator",
            "One-Purpose Manipulator",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                return `This wonder only...`;
            },
            0,
            [
                {
                    id: "purpose",
                    defaultOptionID: "onementaleffect",
                    quirkOptions: [
                        {
                            id: "onementaleffect",
                            displayName: "One mental effect",
                            usageModifier: 1
                        },
                        {
                            id: "onephysicaleffect",
                            displayName: "One physical effect",
                            usageModifier: 1
                        },
                        {
                            id: "consciousnessmanipulation",
                            displayName: "Rank-5 consciousness manipulation",
                            usageModifier: 1
                        },
                        {
                            id: "animals",
                            displayName: "Controls animals",
                            usageModifier: 1
                        },
                        {
                            id: "oneanimal",
                            displayName: "Controls one type of animal",
                            usageModifier: 2
                        },
                        {
                            id: "humans",
                            displayName: "Controls humans",
                            usageModifier: 1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "weathermanipulation",
            "Weather Manipulation",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const weather = optionSelections?.get("weathertype") ?? "weather in one way.";
                return `This wonder only ${weather}.`;
            },
            0,
            [
                {
                    id: "weathertype",
                    defaultOptionID: "temperature",
                    quirkOptions: [
                        {
                            id: "temperature",
                            displayName: "Temperature",
                            usageModifier: 1
                        },
                        {
                            id: "precipitation",
                            displayName: "Precipitation",
                            usageModifier: 1
                        },
                        {
                            id: "wind",
                            displayName: "Wind",
                            usageModifier: 1
                        },
                        {
                            id: "stormmachine",
                            displayName: "Storm Machine",
                            usageModifier: 2
                        },
                        {
                            id: "pacifier",
                            displayName: "Pacifier",
                            usageModifier: 2
                        },
                        {
                            id: "heater",
                            displayName: "Heater",
                            usageModifier: 2
                        },
                        {
                            id: "chiller",
                            displayName: "Chiller",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        )
    ]);
    public static readonly EXELIXI = new Axiom("exe", "Exelixi", [
        ["Basic Repair, Healing, and Curing", "Life Support"],
        ["Mechanical Upgrade"],
        ["Biological Upgrade"],
        ["Regenerator", "Replacement Limb"],
        ["Resurrecter and Life Extender"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "autonomousregenerator",
            "Autonomous Regenerator",
            () => "The wonder does not need to be attached to the subject in order to cause regeneration-based effects",
            -2
        ),
        QuirkTemplate.createQuirkTemplate(
            "exelixiray",
            "Exelixi Ray",
            () => "",
            3
        ),
        QuirkTemplate.createQuirkTemplate(
            "flexibleupgrade",
            "Flexible Upgrage",
            () => "This wonder for any physical effect. It requires an Intelligence + Medicine check to activate and use properly.",
            0,
            [
                {
                    id: "effectfield",
                    defaultOptionID: "any",
                    quirkOptions: [
                        {
                            id: "any",
                            displayName: "Any upgrade",
                            usageModifier: 0
                        },
                        {
                            id: "physical",
                            displayName: "Physical attributes and merits",
                            usageModifier: 1
                        },
                        {
                            id: "mental",
                            displayName: "Mental attributes and merits",
                            usageModifier: 1
                        },
                        {
                            id: "social",
                            displayName: "Social attributes and appropriate merits",
                            usageModifier: 1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "focusedrestoration",
            "Focused Restoration",
            () => "This wonder can only be used to heal or repair one general type of device.",
            1
        ),
        QuirkTemplate.createQuirkTemplate(
            "focusedmechanicalupgrade",
            "Focused Mechanical Upgrade",
            () => "This wonder only works on one type of device or can only provide one type of bonus.",
            0,
            [
                {
                    id: "focustype",
                    defaultOptionID: "onedevicetype",
                    quirkOptions: [
                        {
                            id: "onedevicetype",
                            displayName: "One type of device",
                            usageModifier: 1
                        },
                        {
                            id: "onebonustype",
                            displayName: "One type of bonus",
                            usageModifier: 1
                        },
                        {
                            id: "onebonustypetoonedevicetype",
                            displayName: "One type of bonus to one type of device",
                            usageModifier: 1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "greatereffectonly",
            "Greater Effect Only",
            () => "",
            0,
            [
                {
                    id: "effecttype",
                    defaultOptionID: "rankeffects",
                    quirkOptions: [
                        {
                            id: "rankeffects",
                            displayName: "Only most powerful rank effects",
                            usageModifier: 1
                        },
                        {
                            id: "oneeffect",
                            displayName: "Only one effect",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "increasedrangeexelixi",
            "Increased Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const increasedRangeRanks = customNumberInputValues?.get("increasedrangerank") ?? 0;
                const range = 10 * (2 ** (increasedRangeRanks - 1));
                return `This wonder has a range of ${range} feet.`;
            },
            0,
            undefined,
            [
                {
                    id: "increasedrangerank",
                    defaultValue: 0,
                    label: "Ranks of increased range"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "monitoredregeneration",
            "Monitored Regeneration",
            () => "Someone must attend this wonder or it will shut down and fail.",
            0,
            [
                {
                    id: "monitoringfrequency",
                    defaultOptionID: "tenminutesperhour",
                    quirkOptions: [
                        {
                            id: "tenminutesperhour",
                            displayName: "Ten minutes every hour",
                            usageModifier: 1
                        },
                        {
                            id: "alltimes",
                            displayName: "At all times",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "sarcophagus",
            "Sarcophagus",
            () => "Halves the healing or upgrading cost of anything located within. Cannot have any range.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "selfonlyexelixi",
            "Self Only",
            () => "This wonder can only affect the Genius who created it.",
            1
        )
    ]);
    public static readonly KATASTROFI = new Axiom("kat", "Katastrofi", [
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"],
        ["Weapon"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "adjustedrange",
            "Adjusted Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const adjustment = customNumberInputValues?.get("rangeadjustment");
                if (adjustment === undefined) {
                    return "This weapon's range has not been adjusted.";
                }
                const upOrDown = adjustment < 0 ? "decreased" : "increased";
                const numberOfSteps = Math.abs(adjustment);
                return `This weapon's range has been ${upOrDown} by ${numberOfSteps} steps.`
            },
            0,
            undefined,
            [
                {
                    id: "rangeadjustment",
                    defaultValue: 0,
                    label: "Steps adjusted"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "armorpiercing",
            "Armor Piercing",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const ranks = customNumberInputValues?.get("armorpiercingranks") ?? 0;
                return `This wonder pierces ${ranks * 3} points of Armor.`;
            },
            0,
            undefined,
            [
                {
                    id: "armorpiercingranks",
                    defaultValue: 0,
                    label: "Armor Piercing Ranks"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "artillery",
            "Artillery",
            () => "This wonder can target things over the horizon.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "attributedamage",
            "Attribute Damage",
            () => "Instead of removing health levels, this weapon removes dots in an Attribute.",
            0,
            [
                {
                    id: "attribute",
                    defaultOptionID: "Intelligence",
                    quirkOptions: [
                        {
                            id: "intelligence",
                            displayName: "Intelligence",
                            usageModifier: 0
                        },
                        {
                            id: "wits",
                            displayName: "Wits",
                            usageModifier: 0
                        },
                        {
                            id: "resolve",
                            displayName: "Resolve",
                            usageModifier: 0
                        },
                        {
                            id: "strength",
                            displayName: "Strength",
                            usageModifier: 0
                        },
                        {
                            id: "dexterity",
                            displayName: "Dexterity",
                            usageModifier: 0
                        },
                        {
                            id: "stamina",
                            displayName: "Stamina",
                            usageModifier: 0
                        },
                        {
                            id: "presence",
                            displayName: "Presence",
                            usageModifier: 0
                        },
                        {
                            id: "manipulation",
                            displayName: "Manipulation",
                            usageModifier: 0
                        },
                        {
                            id: "composure",
                            displayName: "Composure",
                            usageModifier: 0
                        },
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "autofire",
            "Autofire",
            () => "This wonder is capable of automatic fire.",
            -1,
            [
                {
                    id: "burstlength",
                    defaultOptionID: "short",
                    quirkOptions: [
                        {
                            id: "short",
                            displayName: "Short Burst",
                            usageModifier: 0
                        },
                        {
                            id: "medium",
                            displayName: "Medium Burst",
                            usageModifier: 0
                        },
                        {
                            id: "long",
                            displayName: "Long Burst",
                            usageModifier: 0
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "bleeding",
            "Bleeding",
            () => "This wonder causes continuing damage to creatures with blood or some other means of fluid life-support, and it cannot be stopped by diving into water.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "blinding",
            "Blinding",
            () => "This weapon can damage or remove one of the target's senses.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "continuingdamage",
            "Continuing Damage",
            () => "This weapon continues to cause damage after the initial attack has concluded.",
            0,
            [
                {
                    id: "stopswithwater",
                    defaultOptionID: "stopswithwater",
                    quirkOptions: [
                        {
                            id: "stopswithwater",
                            displayName: "Stops when immersed in water",
                            usageModifier: -1
                        },
                        {
                            id: "doesnotstopwithwater",
                            displayName: "Does not stop when immersed in water",
                            usageModifier: -2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "defensive",
            "Defensive",
            () => "Grants a +1 bonus to Defense when wielded.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "disintegration",
            "Disintegration",
            () => "Enemies are wiped from the face of reality rather than merely killed.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "explosiveweapon",
            "Explosive Weapon",
            () => "It explodes.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "explosiveaccuracy",
            "Explosive Accuracy",
            () => "An explosive weapon can convert one point of explosive force into two points of regular damage.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "extradimensionalattack",
            "Extradimensional Attack",
            () => "The weapon's attack can strike targets in other realities as well as this one.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "goodbalanceandweight",
            "Good Balance and Weight",
            () => "Reduces the minimum strength needed to wield the weapon.",
            0,
            undefined,
            [
                {
                    id: "goodbalanceandweightranks",
                    label: "Good Balance and Weight Ranks",
                    defaultValue: 0
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "immobilizingattack",
            "Immobilizing Attack",
            () => "Some or all of the wonder's damage is converted into a \"grapple\" attack against the target",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "knockdown",
            "Knockdown",
            () => "The weapon knocks a target on their butt.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "lingeringareadamage",
            "Lingering Area Damage",
            () => "Explosive effects linger for a time.",
            0,
            [
                {
                    id: "duration",
                    defaultOptionID: "turns",
                    quirkOptions: [
                        {
                            id: "turns",
                            displayName: "Turns",
                            usageModifier: -1
                        },
                        {
                            id: "minutes",
                            displayName: "Minutes",
                            usageModifier: -2
                        },
                        {
                            id: "hours",
                            displayName: "Hours",
                            usageModifier: -3
                        },
                        {
                            id: "days",
                            displayName: "Days",
                            usageModifier: -4
                        },
                        {
                            id: "weeks",
                            displayName: "Weeks",
                            usageModifier: -5
                        }
                    ]
                },
                {
                    id: "isbreathingrequired",
                    defaultOptionID: "breathingrequired",
                    quirkOptions: [
                        {
                            id: "breathingrequired",
                            displayName: "Must be breathed",
                            usageModifier: 0
                        },
                        {
                            id: "nobreathingrequired",
                            displayName: "Harms without being breathed",
                            usageModifier: -1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "meleeweapon",
            "Melee Weapon",
            () => "Limited to close range.",
            1
        ),
        QuirkTemplate.createQuirkTemplate(
            "novisibleeffect",
            "No Visible Effect",
            () => "Has no visible effect.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "onlyagainstcertainmaterials",
            "Only Against Certain Materials",
            () => "The wonder only damages certain materials.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "orbitalgun",
            "Orbital Gun",
            () => "This variable allows a wonder to damage extremely large vehicles, wonders, and fortresses more effectively, at the expense of not being very accurate against smaller targets.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "railgun",
            "Railgun",
            () => "This variable allows a wonder to damage large vehicles and wonders more effectively, at the expense of not being very accurate against smaller targets.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "returning",
            "Returning",
            () => "The weapon returns to its user automatically after it is thrown.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "thrownweapon",
            "Thrown Weapon",
            () => "The wonder is intended to be thrown.",
            0,
            [
                {
                    id: "hasmaniacost",
                    defaultOptionID: "nomaniacost",
                    quirkOptions: [
                        {
                            id: "nomaniacost",
                            displayName: "No Mania cost",
                            usageModifier: 0
                        },
                        {
                            id: "hasmaniacost",
                            displayName: "Has Mania cost",
                            usageModifier: 1
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "variabledamage",
            "Variable Damage",
            () => "The wonder's damage can be dialed down to lower damage or \"overcharged\".",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "variableexplosion",
            "Variable Explosion",
            () => "The weapon's blast area can be dialed down to any degree.",
            -1
        )
    ]);
    public static readonly METAPTROPI = new Axiom("met", "Metaptropi", [
        ["Appearance Changer"],
        ["Substance Changer", "Illusion Generator"],
        ["Grower / Shrinker"],
        ["Shape Changer"],
        ["Irrational Transformer"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "attachedtransformation",
            "Attached Transformation",
            () => "In order for the subject to remain transformed, the wonder must remain attached to it.",
            1
        ),
        QuirkTemplate.createQuirkTemplate(
            "increasedrangemetaptropi",
            "Increased Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const increasedRangeRanks = customNumberInputValues?.get("increasedrangerank") ?? 0;
                const range = 10 * (2 ** (increasedRangeRanks - 1));
                return `This wonder has a range of ${range} feet.`;
            },
            0,
            undefined,
            [
                {
                    id: "increasedrangerank",
                    defaultValue: 0,
                    label: "Ranks of increased range"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "limitedillusions",
            "Limited Illusions",
            () => "The wonder can only create a certain type of illusion",
            0,
            [
                {
                    id: "illusiontype",
                    defaultOptionID: "audioonly",
                    quirkOptions: [
                        {
                            id: "audioonly",
                            displayName: "Audio",
                            usageModifier: 2
                        },
                        {
                            id: "2dimages",
                            displayName: "2D Images",
                            usageModifier: 2
                        },
                        {
                            id: "limitedrange",
                            displayName: "Limited range of illusions",
                            usageModifier: 1
                        },
                        {
                            id: "onlyone",
                            displayName: "Only one illusion",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "metaptropiray",
            "Metaptropi Ray",
            () => "Instead of producing an emanation that automatically hits nearby targets, the wonder shoots forth a ray.",
            3
        ),
        QuirkTemplate.createQuirkTemplate(
            "selfonlymetaptropi",
            "Self Only",
            () => "This wonder can only affect the Genius who created it.",
            1
        ),
        QuirkTemplate.createQuirkTemplate(
            "specifictransformation",
            "Specific Transformation",
            () => "Only provides a specific transformation",
            0,
            [
                {
                    id: "transformation",
                    defaultOptionID: "intoform",
                    quirkOptions: [
                        {
                            id: "intoform",
                            displayName: "Into one form",
                            usageModifier: 2
                        },
                        {
                            id: "outofform",
                            displayName: "Out of one form",
                            usageModifier: 1
                        },
                        {
                            id: "intoformoutofform",
                            displayName: "Out of one form into one form",
                            usageModifier: 3
                        },
                        {
                            id: "onetransmutation",
                            displayName: "One transmutation",
                            usageModifier: 1
                        },
                        {
                            id: "size",
                            displayName: "Changes Size",
                            usageModifier: 1
                        },
                        {
                            id: "grows",
                            displayName: "Grows",
                            usageModifier: 2
                        },
                        {
                            id: "shrinks",
                            displayName: "Shrinks",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "transmutationbooth",
            "Transmutation Booth",
            () => "Changes anything within the device, and the cost does not increase based on the Size of the target.",
            0
        )
    ]);
    public static readonly PROSTASIA = new Axiom("pro", "Prostasia", [
        ["Personal Armor", "Immunization or Vaccine"],
        ["External Armor", "Data Security", "Lockbox", "Architecture"],
        ["Mental Shield", "Morphic Shield", "Occult Shield"],
        ["Dimensional Shield"],
        ["Impenetrabox"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "ablativearmor",
            "Ablative Armor",
            () => "",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "ballisticgeneralrating",
            "Ballistic/General Rating",
            () => "Defense against ballistic damage is raised or lowered by one, and defense against general damage is raised or lowered by one.",
            0,
            [
                {
                    id: "boostballisticorgeneral",
                    defaultOptionID: "boostballistic",
                    quirkOptions: [
                        {
                            id: "boostballistic",
                            displayName: "Boost defense against ballistic damage",
                            usageModifier: 0
                        },
                        {
                            id: "boostgeneral",
                            displayName: "Boost defense against general damage",
                            usageModifier: 0
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "barrier",
            "Barrier",
            () => "The wonder can blocks people and objects, rather than just attacks. The shield's armor rating is reduced by one.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "bulletproof",
            "Bulletproof",
            () => "All ballistic Lethal or Aggravated damage is converted to Bashing.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "cage",
            "Cage",
            () => "The device is turned \"inside out,\" trapping people or things inside rather than protecting them.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "expandable",
            "Expandable",
            () => "The genius' shielding can be extended dynamically to protect others.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "heavyarmor",
            "Heavy Armor",
            () => "The armor incurs a -2 penalty to Move and a -1 penalty to Defense and has a minimum Strength requirement equal to the wonder's rank.",
            1
        ),
        QuirkTemplate.createQuirkTemplate(
            "invulnerable",
            "Invulnerable",
            () => "The Prostasia armor ignores the Armor Piercing quality of any mundane attack. It also ignores five points of automatic damage (from explosive force attacks, railguns, etc.) from any source.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "limitedprotection",
            "Limited Protection",
            () => "The wonder only protects against one type of attack.",
            2
        ),
        QuirkTemplate.createQuirkTemplate(
            "opaquetoair",
            "Opaque to Air",
            () => "Air cannot pass through the wonder.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "reflection",
            "Reflection",
            () => "Any ranged attack that does not hit the target (no successes) bounces back to strike the attacker.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "targeteddeflection",
            "Targeted Deflection",
            () => "The user can use an action to deflect attacks, protecting themself for Dexterity + Weaponry + Armor.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "vest",
            "Vest",
            () => "The armor is only a vest, breastplate, or something else that can fit under a bulky jacket.",
            -1
        )
    ]);
    public static readonly SKAFOI = new Axiom("ska", "Skafoi", [
        ["Car", "Boat", "Bouncer"],
        ["Plane", "Submarine", "Mole Machine"],
        ["Spaceship", "Super-submarine"],
        ["Teleporter", "Lightspeed Vehicle", "Dimensional Transporter"],
        ["Temporal Distortor", "Time Machine"]
    ], [
        QuirkTemplate.createQuirkTemplate(
            "clinging",
            "Clinging",
            () => "The vehicle can cling to surfaces.",
            -2
        ),
        QuirkTemplate.createQuirkTemplate(
            "exposedcanopy",
            "Exposed Canopy",
            () => "The wonder's driver and occupants are exposed.",
            0,
            [
                {
                    id: "exposure",
                    defaultOptionID: "jeep",
                    quirkOptions: [
                        {
                            id: "jeep",
                            displayName: "-1 cover, Jeep-style",
                            usageModifier: 1
                        },
                        {
                            id: "convertible",
                            displayName: "-2 cover, convertible-style",
                            usageModifier: 2
                        },
                        {
                            id: "motorcycle",
                            displayName: "-3 cover, motorcycle-style",
                            usageModifier: 3
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "extremeacceleration",
            "Extreme Acceleration",
            () => "Gotta go fast, but faster",
            0,
            [
                {
                    id: "acceleration",
                    defaultOptionID: "safespeed",
                    quirkOptions: [
                        {
                            id: "safespeed",
                            displayName: "Acceleration = Safe Speed",
                            usageModifier: -1
                        },
                        {
                            id: "maxspeed",
                            displayName: "Acceleration = Max Speed",
                            usageModifier: -2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "hovering",
            "Hovering",
            () => "The vehicle can hover.",
            -2
        ),
        QuirkTemplate.createQuirkTemplate(
            "increasedbouncingrange",
            "Increased Bounding Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const increasedRangeRanks = customNumberInputValues?.get("increasedbouncingrangerank") ?? 0;
                const range = 10 * (2 ** (increasedRangeRanks - 1));
                return `This wonder's bouncing range is ${range} feet. To bounce, roll Dexterity + Athletics - ${increasedRangeRanks - 1}.`;
            },
            0,
            undefined,
            [
                {
                    id: "increasedbouncingrangerank",
                    defaultValue: 0,
                    label: "Ranks of increased range"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "increasedrangeskafoi",
            "Increased Range",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const increasedRangeRanks = customNumberInputValues?.get("increasedrangerank") ?? 0;
                const range = 10 * (2 ** (increasedRangeRanks - 1));
                return `This wonder has a range of ${range} feet.`;
            },
            0,
            undefined,
            [
                {
                    id: "increasedrangerank",
                    defaultValue: 0,
                    label: "Ranks of increased range"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "legsinsteadofwheels",
            "Legs Instead of Wheels",
            () => "The vehicle can maneuver over difficult and hilly terrain that would stop a wheeled vehicle, and its Acceleration equals its Safe Speed. It can jump.",
            -5
        ),
        QuirkTemplate.createQuirkTemplate(
            "maniacalspeedboost",
            "Maniacal Speed Boost",
            () => "Spending a point of Mania increases the vehicle's Safe Speed by 20%.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "offroad",
            "Off-Road",
            () => "Ignore all penalties for difficult terrain.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "onelocationteleporter",
            "One Location Teleporter",
            () => "The teleporter only sends targets to one location. Only one Success is required to send a target to the location.",
            0
        ),
        QuirkTemplate.createQuirkTemplate(
            "remotecontrol",
            "Remote Control",
            () => "The wonder can be controlled from a distance.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "selfsealingmolemachine",
            "Self Sealing Mole Machine",
            () => "The mole machine seals the tunnel it leaves behind.",
            -1
        ),
        QuirkTemplate.createQuirkTemplate(
            "skafoiray",
            "Skafoi Ray",
            () => "Instead of transporting targets directly, the wonder shoots forth a ray.",
            3
        ),
        QuirkTemplate.createQuirkTemplate(
            "rails",
            "Rails",
            () => "The wonder has a fixed track or path. It cannot leave the track.",
            0,
            [
                {
                    id: "adjustablespeed",
                    defaultOptionID: "adjustble",
                    quirkOptions: [
                        {
                            id: "adjustable",
                            displayName: "Adjustable speed = Speed is doubled",
                            usageModifier: 0
                        },
                        {
                            id: "nonadjustable",
                            displayName: "Non-adjustible speed = Speed multiplied by 2.5",
                            usageModifier: 0
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "slowacceleration",
            "Slow Acceleration",
            () => "The wonder accelerates very slowly.",
            0,
            [
                {
                    id: "adjustment",
                    defaultOptionID: "quarter",
                    quirkOptions: [
                        {
                            id: "quarter",
                            displayName: "Accelerates at 25% of Safe Speed",
                            usageModifier: 1
                        },
                        {
                            id: "tenth",
                            displayName: "Accelerates at 10% of Safe Speed",
                            usageModifier: 2
                        }
                    ]
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "speedandhandling",
            "Speed and Handling",
            (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
                const handlingAdjustment = customNumberInputValues?.get("handlingadjustment") ?? 0;
                const speedAdjustment = -10 * handlingAdjustment;
                return `This wonder's Handling is adjusted by ${handlingAdjustment}, and its Safe Speed is adjusted by ${speedAdjustment}%.`;
            },
            0,
            undefined,
            [
                {
                    id: "handlingadjustment",
                    defaultValue: 0,
                    label: "Handling adjustment"
                }
            ]
        ),
        QuirkTemplate.createQuirkTemplate(
            "transporter",
            "Transporter",
            () => "The wonder transports targets, but doesn't go with them.",
            1
        )
  ]);

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