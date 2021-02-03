import Axiom, { FlavorList } from "../Axiom";
import Flavor from "../Flavor";
import QuirkTemplate, { QuirkTemplateOption } from "../QuirkTemplate";

class Katastrofi extends Axiom {
    public static readonly ID = "kat";
    public static readonly DISPLAY_NAME = "Katastrofi";

    public static readonly FLAVORS = {
        WEAPON_1: Flavor.createFlavor("weapon1", "Weapon"),
        WEAPON_2: Flavor.createFlavor("weapon2", "Weapon"),
        WEAPON_3: Flavor.createFlavor("weapon3", "Weapon"),
        WEAPON_4: Flavor.createFlavor("weapon4", "Weapon"),
        WEAPON_5: Flavor.createFlavor("weapon5", "Weapon")
    }

    public static readonly FLAVOR_LIST: FlavorList = [
        [Katastrofi.FLAVORS.WEAPON_1],
        [Katastrofi.FLAVORS.WEAPON_2],
        [Katastrofi.FLAVORS.WEAPON_3],
        [Katastrofi.FLAVORS.WEAPON_4],
        [Katastrofi.FLAVORS.WEAPON_5]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Katastrofi.ID, Katastrofi.DISPLAY_NAME, Katastrofi.FLAVOR_LIST, Katastrofi.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Katastrofi();
    }
}

export default Katastrofi;