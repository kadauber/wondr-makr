import Axiom, { FlavorList } from "../Axiom";
import QuirkTemplate, { QuirkTemplateOption } from "../QuirkTemplate";

class Metaptropi extends Axiom {
    public static readonly ID = "met";
    public static readonly DISPLAY_NAME = "Metaptropi";

    public static readonly FLAVOR_LIST: FlavorList = [
        ["Appearance Changer"],
        ["Substance Changer", "Illusion Generator"],
        ["Grower / Shrinker"],
        ["Shape Changer"],
        ["Irrational Transformer"]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Metaptropi.ID, Metaptropi.DISPLAY_NAME, Metaptropi.FLAVOR_LIST, Metaptropi.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Metaptropi();
    }
}

export default Metaptropi;