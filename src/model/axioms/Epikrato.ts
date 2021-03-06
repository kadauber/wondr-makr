import Axiom, { FlavorList } from "../Axiom";
import Flavor from "../Flavor";
import QuirkTemplate, { QuirkTemplateOption } from "../QuirkTemplate";

class Epikrato extends Axiom {
    public static readonly ID = "epi";
    public static readonly DISPLAY_NAME = "Epikrato";

    public static readonly FLAVORS = {
        CONTROLLER: Flavor.createFlavor("controller", "Controller"),
        FORCE_CONTROLLER: Flavor.createFlavor("forcecontroller", "Force Controller"),
        MIND_CONTROLLER: Flavor.createFlavor("mindcontroller", "Mind Controller"),
        WEALTH_CONTROLLER: Flavor.createFlavor("wealthcontroller", "Wealth and the Market Controller"),
        CROWD_CONTROLLER: Flavor.createFlavor("crowdcontroller", "Crowd Controller"),
        MOVEMENT_CONTROLLER: Flavor.createFlavor("movementcontroller", "Mover of People and Things"),
        POLITICAL_CONTROLLER: Flavor.createFlavor("politicalcontroller", "Political Dominator"),
        WEATHER_CONTROLLER: Flavor.createFlavor("weathercontroller", "Weather Controller"),
        PROBABILITY_CONTROLLER: Flavor.createFlavor("probabilitycontroller", "Probability Manipulator"),
        IDENTITY_CONTROLLER: Flavor.createFlavor("identitycontroller", "Identity Controller")
    }

    public static readonly FLAVOR_LIST: FlavorList = [
        [Epikrato.FLAVORS.CONTROLLER],
        [Epikrato.FLAVORS.FORCE_CONTROLLER],
        [Epikrato.FLAVORS.MIND_CONTROLLER],
        [
            Epikrato.FLAVORS.WEALTH_CONTROLLER,
            Epikrato.FLAVORS.CROWD_CONTROLLER,
            Epikrato.FLAVORS.MOVEMENT_CONTROLLER,
            Epikrato.FLAVORS.POLITICAL_CONTROLLER,
            Epikrato.FLAVORS.WEATHER_CONTROLLER,
            Epikrato.FLAVORS.PROBABILITY_CONTROLLER
        ],
        [Epikrato.FLAVORS.IDENTITY_CONTROLLER]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Epikrato.ID, Epikrato.DISPLAY_NAME, Epikrato.FLAVOR_LIST, Epikrato.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Epikrato();
    }
}

export default Epikrato;