import Axiom, { FlavorList } from "../Axiom";
import QuirkTemplate, { QuirkTemplateOption } from "../QuirkTemplate";

class Exelixi extends Axiom {
    public static readonly ID = "exe";
    public static readonly DISPLAY_NAME = "Exelixi";

    public static readonly FLAVOR_LIST: FlavorList = [
        ["Basic Repair, Healing, and Curing", "Life Support"],
        ["Mechanical Upgrade"],
        ["Biological Upgrade"],
        ["Regenerator", "Replacement Limb"],
        ["Resurrecter and Life Extender"]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Exelixi.ID, Exelixi.DISPLAY_NAME, Exelixi.FLAVOR_LIST, Exelixi.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Exelixi();
    }
}

export default Exelixi;