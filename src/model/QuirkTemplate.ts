import BaseQuirk from "./BaseQuirk";

export type QuirkTemplateOptionGroup = {
    id: string;
    defaultOptionID: string;
    quirkOptions: QuirkTemplateOption[];
}

export type QuirkTemplateOption = {
    id: string;
    displayName: string;
    usageModifier: number;
}

export type QuirkTemplateCustomNumberInput = {
    id: string;
    label: string;
    defaultValue: number;
}

class QuirkTemplate {
    public static readonly BASILISK_EFFECT = new QuirkTemplate(
        "basilisk",
        "Basilisk Method",
        () => `The wonder only affects a creature that can see and that look at the wonder when it is used.`,
        2
    );

    public static readonly CHARGE_UP_TIME = new QuirkTemplate(
        "chargeuptime",
        "Charge-up Time",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
            const duration = optionSelections?.get("chargeuptimeduration")?.displayName ?? "extra time";
            return `The wonder takes ${duration} to charge before use.`;
        },
        0,
        [
            {
                id: "chargeuptimeduration",
                defaultOptionID: "chargeuptime3turns",
                quirkOptions: [
                    {
                        id: "chargeuptime3turns",
                        displayName: "3 turns",
                        usageModifier: 1
                    },
                    {
                        id: "chargeuptime30seconds",
                        displayName: "30 seconds",
                        usageModifier: 2
                    },
                    {
                        id: "chargeuptime5minutes",
                        displayName: "5 minutes",
                        usageModifier: 3
                    },
                    {
                        id: "chargeuptime20minutes",
                        displayName: "20 minutes",
                        usageModifier: 4
                    },
                    {
                        id: "chargeuptime1hour",
                        displayName: "1 hour",
                        usageModifier: 5
                    },
                    {
                        id: "chargeuptime6hours",
                        displayName: "6 hours",
                        usageModifier: 6
                    },
                    {
                        id: "chargeuptime1day",
                        displayName: "1 day",
                        usageModifier: 7
                    }]
            }
        ]
    );

    public static readonly COLLAPSIBLE = new QuirkTemplate(
        "collapsible",
        "Collapsible",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
            const collapsedSize = customNumberInputValues?.get("collapsiblecollapsedsize") ?? 0;
            return `The wonder can be shrunk to size ${collapsedSize} when not in use.`
        },
        0,
        undefined,
        [{ id: "collapsiblecollapsedsize", label: "Size when collapsed:", defaultValue: 2 }]
    );

    public static readonly CONCEALED = new QuirkTemplate(
        "concealed",
        "Concealed",
        () => `The wonder appears as something it is not: a lightning projector looks like a fire extinguisher, while a suit of Prostasia armor resembles a long coat. The wonder will probably still reveal itself when deployed (that lightning projector still vomits annihilating plasma rather than spitting out fire retardant gel), but to a cursory analysis (anything but opening the wonder up or trying to use it) it resembles something other than what it is. Even a genius is limited by the bounds of common sense here: a flying machine might be made to look like a sports car or a scanner to look like a pocket-watch, but not vice-versa. This concealment does make it more difficult for a genius to recognize the wonder as an artifact of mad science.`,
        -1
    );

    public static readonly FRAGILE = new QuirkTemplate(
        "fragile",
        "Fragile",
        () => `The wonder is extremely delicate. It has no Durability and any amount of damage destroys it. An attack against the wonder's bearer (a person carrying it, a vehicle in which it is located, etc.) that yields five or more successes also destroys the wonder. The destroyed wonder causes one die of Bashing damage per rank to its holder (if anyone) when destroyed. Wonders of Katastrofi cause two dice of damage per rank of the most dangerous damage type they can cause. Fragile wonders look fragile―glass beakers, delicate clockwork eggs, volatiles suspended in a magnetic field―unless the creating genius has one or more dots in Metaptropi and chooses to make it appear more robust.`,
        1
    );

    public static readonly GRAFTED = new QuirkTemplate(
        "grafted",
        "Grafted",
        () => `A grafted wonder is an obvious and non-removable modification to the genius or another person, such as bestial claws or a weaponized mechanical arm. If this modification can be hidden under clothing or otherwise concealed, this grants a +1 bonus. If the modification cannot be hidden, it becomes a +2 bonus. (A wonder that looks entirely normal, such as with the "normal-looking" variable, grants no bonus. Wonders can only be grafted onto people, or perhaps regular animals―they are usually inflicted on Beholden. (Grafting a wonder to a mere mortal triggers Havoc.) A wonder cannot be "grafted" onto another wonder; instead use the "Integral" Variable.`,
        2,
        [
            {
                id: "graftedconcealability",
                defaultOptionID: "graftedcannotbehidden",
                quirkOptions: [
                    {
                        id: "graftedcannotbehidden",
                        displayName: "Cannot be hidden",
                        usageModifier: 0
                    },
                    {
                        id: "graftedconcealable",
                        displayName: "Concealable",
                        usageModifier: -1
                    }
                ]
            }
        ]
    );

    public static readonly IN_PILL_FORM = new QuirkTemplate(
        "inpillform",
        "In Pill Form",
        () => `A wonder in "pill form" is single-use, but it can be consumed or otherwise used by anyone at any time. The genius can spend the Mania early, placing it in the pill while specifying the intended purpose of the Mania, and after that the first person to use it gains the effect. If the wonder requires a roll, the roll is made when the wonder is consumed, using the genius' abilities at the time of construction. This variable allows others to use a wonder as a kind of "one-shot burst." Anyone can use a wonder in pill form, even mere mortals, and by the time they use it, it's already destroyed, meaning that its use cannot trigger Havoc. In general, wonders in pill form are immune to Havoc unless a mere mortal tries to tamper with or analyze one.`,
        0
    );

    public static readonly INTEGRAL = new QuirkTemplate(
        "integral",
        "Integral",
        () => `An integral wonder is a wonder contained within another wonder and that cannot be separated from it. A flying machine's flame gun, an environment suit's built-in communicator, or the acidic claws of a vat-grown automaton are all integral wonders. Integral wonders require bound Mania just like any other wonder.An integral wonder cannot be removed from the main wonder. A wonder cannot be integral to a wonder that already possesses this variable; one cannot produce "nested dolls" of integral wonders. If two or more wonders are merely attached to one-another and cannot be separated, the genius can select one primary wonder, and the rest are integral to that wonder. A genius can install an integral wonder in another genius' wonder.`,
        1
    );

    public static readonly INTERNALIZED = new QuirkTemplate(
        "internalized",
        "Internalized",
        () => "An internalized wonder exists inside a person's or creature's body or mind. Deployable cat-like claws, eyes replaced with night-vision cameras (but still looking like normal eyes), or mental alterations that allow for telekinesis are all examples of internalized wonders. They offer no bonus, and they must be Size 0 in order to fit inside the human body. Internalized wonders often require assistance to place in a genius' body.",
        0
    );

    public static readonly LIMITED_USES = new QuirkTemplate(
        "limiteduses",
        "Limited Uses",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
            const numberOfUses = optionSelections?.get("limitedusesusecount")?.id === "limitedusesequaltoinspiration" ? "uses equal to Inspiration" : "one use";
            const isReloadableSelection = optionSelections?.get("limitedusescanbereloaded");
            const isReloadable = `${isReloadableSelection?.id === "limitedusescanbereloaded" ? "can" : "cannot"} be reloaded/recharged`;
            return `This wonder has ${numberOfUses}. It ${isReloadable}.`;
        },
        0,
        [
            {
                id: "limitedusesusecount",
                defaultOptionID: "limitedusesequaltoinspiration",
                quirkOptions: [
                    {
                        id: "limitedusesequaltoinspiration",
                        displayName: "Uses equal to Inspiration",
                        usageModifier: 1
                    },
                    {
                        id: "limitedusesoneuse",
                        displayName: "One use",
                        usageModifier: 2
                    }
                ]
            },
            {
                id: "limitedusesreloadability",
                defaultOptionID: "limitedusescanbereloaded",
                quirkOptions: [
                    {
                        id: "limitedusescanbereloaded",
                        displayName: "Can be reloaded/recharged",
                        usageModifier: 0
                    },
                    {
                        id: "limitedusesshortterm",
                        displayName: "Short-term",
                        usageModifier: 1
                    }
                ]
            }
        ]
    );

    public static readonly MANIA_COST = new QuirkTemplate(
        "maniacost",
        "Mania Cost",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => {
            const maniaCostMod = customNumberInputValues?.get("maniacostmod") ?? 0;
            const moreLess = maniaCostMod < 0 ? "less" : "more";
            return `The wonder costs ${Math.abs(maniaCostMod)} ${moreLess} mania to use.`
        },
        0,
        undefined,
        [{ id: "maniacostmod", label: "Mania Cost Mod:", defaultValue: 0 }]
    );

    public static readonly NORMAL_LOOKING = new QuirkTemplate(
        "normallooking",
        "Normal-Looking",
        () => `The wonder looks like a normal object of its type. Without this Variable, wonders have a distinct "mad science" look to them. Even a simple Katastrofic knife does not look like a regular bayonet: it might possess an unusual metallic hue, an unlikely shape, or have a big battery bolted onto the side. Vehicles look, at best, as normal as Doc Brown's DeLorean in Back to the Future, and usually look like nothing that should be driving down a suburban road. These items call out for poking and prodding, which may trigger Havoc. This variable makes a wonder look like a normal specimen of its genus: a Katastrofi-based ray gun might look pretty much like a modern automatic pistol, while a supersonic rocket-craft that can travel into other realities resembles a normal airliner, perhaps of slightly unusual make, but recognizable as "some kind of jet" rather than "some sort of whacked-out mad science invention." An Apokalypsi scanner looks like a digital thermometer or radar display rather than some crazy analysis unit covered in blinking lights that keeps shouting "Danger! Danger!" Wonders with no natural analog, such as Metaptropi transmuter, gain a more respectable and mundane look: an Epikrato controller or hologram machine might resemble some kind of metal detector or an unfamiliar wrist-mounted device, and can blend in well enough to be dismissed as some kind of gadget rather than something obviously weird.`,
        0
    );

    public static readonly RESILIENT = new QuirkTemplate(
        "resilient",
        "Resilient",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputs?: Map<string, number>) => {
            const rankCount = customNumberInputs?.get("resilientrankcount") ?? 0;
            return `This wonder gets ${rankCount * 3} extra dice on Havoc checks.`;
        },
        0,
        undefined,
        [{ id: "resilientrankcount", label: "Ranks in resilience:", defaultValue: 0 }]
    );

    public static readonly SIZE = new QuirkTemplate(
        "size",
        "Size",
        () => "Bigger wonders get bonuses, smaller wonders get penalties. Unless you're a Progenitor, in which case you have traded being a good person for making very small things.",
        0,
        undefined,
        [{ id: "sizeinput", label: "Size:", defaultValue: 2 }]
    );

    public static readonly SLOW_RELOAD = new QuirkTemplate(
        "slowreload",
        "Slow Reload",
        (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputs?: Map<string, number>) => {
            const reloadDuration = optionSelections?.get("slowreloadduration")?.displayName ?? "extra time";
            const autoManually = optionSelections?.get("slowreloadmethod")?.id === "slowreloadautomatic" ? "automatically" : "manually";
            return `This wonder takes ${reloadDuration} to reload. It reloads ${autoManually}.`
        },
        0,
        [
            {
                id: "slowreloadduration",
                defaultOptionID: "slowreload1turn",
                quirkOptions: [
                    {
                        id: "slowreload1turn",
                        displayName: "1 turn",
                        usageModifier: 1
                    },
                    {
                        id: "slowreload10minusinspiration",
                        displayName: "10 minus Inspiration turns (minimum 2)",
                        usageModifier: 2
                    },
                    {
                        id: "slowreload30seconds",
                        displayName: "30 seconds",
                        usageModifier: 3
                    },
                    {
                        id: "slowreload5minutes",
                        displayName: "5 minutes",
                        usageModifier: 4
                    },
                    {
                        id: "slowreload20minutes",
                        displayName: "20 minutes",
                        usageModifier: 5
                    },
                    {
                        id: "slowreload1hour",
                        displayName: "1 hour",
                        usageModifier: 6
                    },
                    {
                        id: "slowreload6hours",
                        displayName: "6 hours",
                        usageModifier: 7
                    },
                    {
                        id: "slowreload1day",
                        displayName: "1 day",
                        usageModifier: 8
                    }
                ]
            },
            {
                id: "slowreloadmethod",
                defaultOptionID: "slowreloadmanual",
                quirkOptions: [
                    {
                        id: "slowreloadmanual",
                        displayName: "Manual",
                        usageModifier: 0
                    },
                    {
                        id: "slowreloadautomatic",
                        displayName: "Automatic",
                        usageModifier: -1
                    }
                ]
            }
        ]
    );

    public static readonly UNIVERSAL_ADDITIONAL_QUIRK_TEMPLATES: QuirkTemplate[] = [
        QuirkTemplate.BASILISK_EFFECT,
        QuirkTemplate.CHARGE_UP_TIME,
        QuirkTemplate.COLLAPSIBLE,
        QuirkTemplate.CONCEALED,
        QuirkTemplate.FRAGILE,
        QuirkTemplate.GRAFTED,
        QuirkTemplate.IN_PILL_FORM,
        QuirkTemplate.INTEGRAL,
        QuirkTemplate.INTERNALIZED,
        QuirkTemplate.LIMITED_USES,
        QuirkTemplate.MANIA_COST,
        QuirkTemplate.NORMAL_LOOKING,
        QuirkTemplate.RESILIENT,
        QuirkTemplate.SLOW_RELOAD
    ];

    public readonly id: string;
    public readonly displayName: string;
    public readonly getEffect: (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputs?: Map<string, number>) => string;
    public readonly baseUsageModifier: number; // numerical modifier the quirk gives when using the wonder
    // Lists of options the Genius can use to change the quirk's usage modifier.
    public readonly optionGroups?: QuirkTemplateOptionGroup[];
    // Additional number inputs to modify aspects of the quirk
    public readonly customNumberInputs?: QuirkTemplateCustomNumberInput[];

    private constructor(
        id: string,
        displayName: string,
        getEffect: (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputs?: Map<string, number>) => string,
        baseUsageModifier: number,
        optionGroups?: QuirkTemplateOptionGroup[],
        customNumberInputs?: QuirkTemplateCustomNumberInput[]
    ) {
        this.id = id;
        this.displayName = displayName;
        this.getEffect = getEffect;
        this.baseUsageModifier = baseUsageModifier;
        this.optionGroups = optionGroups;
        this.customNumberInputs = customNumberInputs;
    }

    public static createQuirkTemplate(
        id: string,
        displayName: string,
        getEffect: (optionSelections?: Map<string, QuirkTemplateOption>, customNumberInputValues?: Map<string, number>) => string,
        baseUsageModifier: number,
        optionGroups?: QuirkTemplateOptionGroup[],
        customNumberInputs?: QuirkTemplateCustomNumberInput[]
    ) {
        return new QuirkTemplate(id, displayName, getEffect, baseUsageModifier, optionGroups, customNumberInputs);
    }

    /**
     * Get the quirk template's modifier from its selected options
     * @param optionSelections Map from option group ID to the selected option
     */
    public getOptionsModifier(optionSelections?: Map<string, QuirkTemplateOption>): number {
        let optionsModifier = 0;

        if (optionSelections !== undefined && this.optionGroups !== undefined) {
            optionSelections.forEach((option) => {
                optionsModifier += option?.usageModifier;
            });
        }

        return optionsModifier;
    }

    public static generateQuirks(
        selectedQuirkTemplates: Set<QuirkTemplate>,
        selectedQuirkOptions: Map<string, Map<string, QuirkTemplateOption>>,
        quirkCustomNumberInputValues: Map<string, Map<string, number>>
    ): Set<BaseQuirk> {
        const quirks = new Set<BaseQuirk>();

        // Create quirks from checkboxes
        selectedQuirkTemplates.forEach((template: QuirkTemplate) => {
            const options = selectedQuirkOptions.get(template.id);
            const numberInputValues = quirkCustomNumberInputValues.get(template.id);
            const quirk = BaseQuirk.createQuirkFromTemplate(template, options, numberInputValues);
            quirks.add(quirk);
        });

        return quirks;
    }
}

export default QuirkTemplate;