export type QuirkOptionGroup = {
    id: string;
    defaultOptionID: string;
    quirkOptions: QuirkOption[];
}

export type QuirkOption = {
    id: string;
    displayName: string;
    usageModifier: number;
}

export type QuirkCustomNumberInput = {
    id: string;
    label: string;
    defaultValue: number;
}

export type QuirkCustomStringInput = {
    id: string;
    label: string;
    defaultValue: string;
}

class Quirk {
    public static readonly BASILISK_EFFECT = new Quirk(
        "basilisk",
        "Basilisk Method",
        () => `The wonder only affects a creature that can see and that look at the wonder when it is used.`,
        2
    );

    public static readonly CHARGE_UP_TIME = new Quirk(
        "chargeuptime",
        "Charge-up Time",
        () => "The wonder requires time to charge before it functions. Once the wonder charges up, it must be used by the end of the scene or the charge is lost. Once charged up it remains active for the duration of the scene. If the charge-up is manual, the genius' full attention is required to charge up a wonder with this variable, and the genius cannot take breaks while charging the wonder or he must start the charging again.",
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

    public static readonly COLLAPSIBLE = new Quirk(
        "collapsible",
        "Collapsible",
        () => "The wonder can be shrunk when not in use. How much the wonder shrinks depends on the genius' rank in Metaptropi. Expanding the wonder costs one point of Mania and occurs reflexively. Collapsing it has no cost and requires one action. The wonder must be expanded before it can be used.",
        0,
        undefined,
        { id: "collapsiblecollapsedsize", label: "Size when collapsed:", defaultValue: 2 }
    );

    public static readonly CONCEALED = new Quirk(
        "concealed",
        "Concealed",
        () => `The wonder appears as something it is not: a lightning projector looks like a fire extinguisher, while a suit of Prostasia armor resembles a long coat. The wonder will probably still reveal itself when deployed (that lightning projector still vomits annihilating plasma rather than spitting out fire retardant gel), but to a cursory analysis (anything but opening the wonder up or trying to use it) it resembles something other than what it is. Even a genius is limited by the bounds of common sense here: a flying machine might be made to look like a sports car or a scanner to look like a pocket-watch, but not vice-versa. This concealment does make it more difficult for a genius to recognize the wonder as an artifact of mad science.`,
        -1
    );

    public static readonly FRAGILE = new Quirk(
        "fragile",
        "Fragile",
        () => `The wonder is extremely delicate. It has no Durability and any amount of damage destroys it. An attack against the wonder's bearer (a person carrying it, a vehicle in which it is located, etc.) that yields five or more successes also destroys the wonder. The destroyed wonder causes one die of Bashing damage per rank to its holder (if anyone) when destroyed. Wonders of Katastrofi cause two dice of damage per rank of the most dangerous damage type they can cause. Fragile wonders look fragile―glass beakers, delicate clockwork eggs, volatiles suspended in a magnetic field―unless the creating genius has one or more dots in Metaptropi and chooses to make it appear more robust.`,
        1
    );

    public static readonly GRAFTED = new Quirk(
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

    public static readonly IN_PILL_FORM = new Quirk(
        "inpillform",
        "In Pill Form",
        () => `A wonder in "pill form" is single-use, but it can be consumed or otherwise used by anyone at any time. The genius can spend the Mania early, placing it in the pill while specifying the intended purpose of the Mania, and after that the first person to use it gains the effect. If the wonder requires a roll, the roll is made when the wonder is consumed, using the genius' abilities at the time of construction. This variable allows others to use a wonder as a kind of "one-shot burst." Anyone can use a wonder in pill form, even mere mortals, and by the time they use it, it's already destroyed, meaning that its use cannot trigger Havoc. In general, wonders in pill form are immune to Havoc unless a mere mortal tries to tamper with or analyze one.`,
        0
    );

    public static readonly INTEGRAL = new Quirk(
        "integral",
        "Integral",
        () => `An integral wonder is a wonder contained within another wonder and that cannot be separated from it. A flying machine's flame gun, an environment suit's built-in communicator, or the acidic claws of a vat-grown automaton are all integral wonders. Integral wonders require bound Mania just like any other wonder.An integral wonder cannot be removed from the main wonder. A wonder cannot be integral to a wonder that already possesses this variable; one cannot produce "nested dolls" of integral wonders. If two or more wonders are merely attached to one-another and cannot be separated, the genius can select one primary wonder, and the rest are integral to that wonder. A genius can install an integral wonder in another genius' wonder.`,
        1
    );

    public static readonly INTERNALIZED = new Quirk(
        "internalized",
        "Internalized",
        () => "An internalized wonder exists inside a person's or creature's body or mind. Deployable cat-like claws, eyes replaced with night-vision cameras (but still looking like normal eyes), or mental alterations that allow for telekinesis are all examples of internalized wonders. They offer no bonus, and they must be Size 0 in order to fit inside the human body. Internalized wonders often require assistance to place in a genius' body.",
        0
    );

    public static readonly LIMITED_USES = new Quirk(
        "limiteduses",
        "Limited Uses",
        () => `Some wonders are designed to be used once, or at most a handful of times. Limited-use wonders grant a general bonus depending on how many uses they have. A "use" is defined as a single activation of the device for one turn. A limited-use wonder can be reloaded or recharged by taking one minute per use and spending a number of points of Mania per use equal to the wonder's activation cost (minimum one point of Mania). A short-term wonder cannot be reloaded or recharged and is destroyed completely when empty.`,
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

    public static readonly MANIA_COST = new Quirk(
        "maniacost",
        "Mania Cost",
        () => `The cost for using wonders is listed in the individual Axiom descriptions. This amount can be modified up or down, to a minimum of no Mania. Every additional point of Mania required grants a +1 bonus. Every point of Mania cost removed incurs a -1 penalty. It's possible to give a wonder with no normal Mania cost (such as a scanning wonder of Apokalypsi) a Mania cost this way. Paying the Mania cost activates the wonder for one scene. An altered Mania cost affects the initial cost to activate the item and, if necessary, to "refuel" or "recharge" it. This includes the initial cost to activate vehicles, energy shields, and most weapons, a weapon's reloading cost (normally one point of Mania), and a vehicle's refueling cost for continual operation. This variable does not affect situations where the genius pays one or more points of Mania per level of Health, such as ablative armor and healing wonders of Exelixi, or where Mania points pay for points of transformation or enhancement, such as with many wonders of Metaptropi or Exelixi, or other situations where the genius converts Mania to points or perks selected from a list, such as most Epikrato-5 brain alteration. This variable also does not affect the Mania costs of general variable effects (such as "collapsible").`,
        0,
        undefined,
        { id: "maniacostmod", label: "Mania Cost Mod:", defaultValue: 0 }
    );

    public static readonly NORMAL_LOOKING = new Quirk(
        "normallooking",
        "Normal-Looking",
        () => `The wonder looks like a normal object of its type. Without this Variable, wonders have a distinct "mad science" look to them. Even a simple Katastrofic knife does not look like a regular bayonet: it might possess an unusual metallic hue, an unlikely shape, or have a big battery bolted onto the side. Vehicles look, at best, as normal as Doc Brown's DeLorean in Back to the Future, and usually look like nothing that should be driving down a suburban road. These items call out for poking and prodding, which may trigger Havoc. This variable makes a wonder look like a normal specimen of its genus: a Katastrofi-based ray gun might look pretty much like a modern automatic pistol, while a supersonic rocket-craft that can travel into other realities resembles a normal airliner, perhaps of slightly unusual make, but recognizable as "some kind of jet" rather than "some sort of whacked-out mad science invention." An Apokalypsi scanner looks like a digital thermometer or radar display rather than some crazy analysis unit covered in blinking lights that keeps shouting "Danger! Danger!" Wonders with no natural analog, such as Metaptropi transmuter, gain a more respectable and mundane look: an Epikrato controller or hologram machine might resemble some kind of metal detector or an unfamiliar wrist-mounted device, and can blend in well enough to be dismissed as some kind of gadget rather than something obviously weird.`,
        0
    );

    public static readonly PECULIAR_REQUIREMENT = new Quirk(
        "peculiarrequirement",
        "Peculiar Requirement",
        () => `Some wonders have unusual, unique environmental requirements for their operation. A Moon Hook (Skafoi 2) works much like a jet pack, except it "hooks" onto the Moon, so the genius must be able to see the Moon to use it. The Dog Howl Comm (Apokalypsi 1) is useful for transmitting information, but the message is transmitted by the howls of dogs, which means that there must be a direct line-of-dog between the wonder's user and its target (easy in most metropolitan areas, tricky in the mid-Atlantic). Similar peculiar requirements are about as inconvenient as a fault. A narrow selection of acceptable targets is never a peculiar requirement.`,
        1,
        undefined,
        undefined,
        { id: "peculiarrequirementdescription", label: "Describe peculiar requirement:", defaultValue: "" }
    );

    public static readonly RESILIENT = new Quirk(
        "resilient",
        "Resilient",
        () => "Wonders that are intended to be used close to mere mortals often employ this variable. Every -1 penalty to the wonder's Core Modifier grants three extra dice to Havoc checks.",
        0,
        undefined,
        { id: "resilientrankcount", label: "Ranks in resilience:", defaultValue: 0 }
    );

    public static readonly SIZE = new Quirk(
        "size",
        "Size",
        () => "Bigger wonders get bonuses, smaller wonders get penalties. Unless you're a Progenitor, in which case you have traded being a good person for making very small things.",
        0,
        undefined,
        { id: "sizeinput", label: "Size:", defaultValue: 2}
    );

    public static readonly SLOW_RELOAD = new Quirk(
        "slowreload",
        "Slow Reload",
        () => 'Some wonders require time to recharge after being used again. Wonders that duplicate old-fashioned muskets or ones that require extensive recalibration with every use employ this variable. A single "use" lasts for up to one turn. The genius must spend her turn reloading the wonder; it does not reload automatically. One-use wonders cannot benefit from this variable.',
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
                        displayName: "10 minus Inspiration turns, minimum 2",
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

    public static readonly UNIVERSAL_QUIRKS: Quirk[] = [
        Quirk.BASILISK_EFFECT,
        Quirk.CHARGE_UP_TIME,
        Quirk.COLLAPSIBLE,
        Quirk.CONCEALED,
        Quirk.FRAGILE,
        Quirk.GRAFTED,
        Quirk.IN_PILL_FORM,
        Quirk.INTEGRAL,
        Quirk.INTERNALIZED,
        Quirk.LIMITED_USES,
        Quirk.MANIA_COST,
        Quirk.NORMAL_LOOKING,
        Quirk.PECULIAR_REQUIREMENT,
        Quirk.RESILIENT,
        Quirk.SLOW_RELOAD
    ];

    public readonly id: string;
    public readonly displayName: string;
    public readonly getEffect: (customCoreModifierInput?: number, customStringInput?: string) => string;
    public readonly baseUsageModifier: number; // numerical modifier the quirk gives when using the wonder
    // Lists of options the Genius can use to change the quirk's usage modifier.
    public readonly optionGroups?: QuirkOptionGroup[];
    public readonly customNumberInput?: QuirkCustomNumberInput;
    public readonly customStringInput?: QuirkCustomStringInput;

    private constructor(
        id: string,
        displayName: string,
        getEffect: () => string,
        baseUsageModifier: number,
        optionGroups?: QuirkOptionGroup[],
        customNumberInput?: QuirkCustomNumberInput,
        customStringInput?: QuirkCustomStringInput
    ) {
        this.id = id;
        this.displayName = displayName;
        this.getEffect = getEffect;
        this.baseUsageModifier = baseUsageModifier;
        this.optionGroups = optionGroups;
        this.customNumberInput = customNumberInput;
        this.customStringInput = customStringInput;
    }

    private findOption(groupID: string, optionID: string): QuirkOption | undefined {
        return this.optionGroups?.find((optionGroup) => {
            return optionGroup.id === groupID;
        })?.quirkOptions.find((option) => {
            return option.id === optionID;
        });
    }

    /**
     * Get the quirk's usage modifier including additional modifiers from selected options
     * @param optionSelections Map from option group ID to the selected option
     */
    public getUsageModifier(optionSelections?: Map<string, string>, customUsageModifier?: number): number {
        let usageModifier = this.baseUsageModifier;

        if (optionSelections !== undefined && this.optionGroups !== undefined) {
            optionSelections.forEach((optionID, groupID) => {
                const option = this.findOption(groupID, optionID);

                if (option !== undefined) {
                    usageModifier += option?.usageModifier;
                }
            });
        }

        if (customUsageModifier !== undefined) {
            usageModifier += customUsageModifier;
        }

        return usageModifier;
    }
}

export default Quirk;