import Axiom, { FlavorList } from "../Axiom";
import Flavor from "../Flavor";
import QuirkTemplate from "../QuirkTemplate";

class Prostasia extends Axiom {
    public static readonly ID = "pro";
    public static readonly DISPLAY_NAME = "Prostasia";

    public static readonly FLAVORS = {
        PERSONAL_ARMOR: Flavor.createFlavor("personalarmor", "Personal Armor"),
        IMMUNIZATION: Flavor.createFlavor("immunization", "Immunization or Vaccine"),
        EXTERNAL_ARMOR: Flavor.createFlavor("extrenalarmor", "External Armor"),
        DATA_SECURITY: Flavor.createFlavor("datasecurity", "Data Security"),
        LOCKBOX: Flavor.createFlavor("lockbox", "Lockbox"),
        ARCHITECTURE: Flavor.createFlavor("architecture", "Architecture"),
        MENTAL_SHIELD: Flavor.createFlavor("mentalshield", "Mental Shield"),
        MORPHIC_SHIELD: Flavor.createFlavor("morphicshield", "Morphic Shield"),
        OCCULT_SHIELD: Flavor.createFlavor("occultshield", "Occult Shield"),
        DIMENSIONAL_SHIELD: Flavor.createFlavor("dimensionalshield", "Dimensional Shield"),
        IMPENETRABOX: Flavor.createFlavor("impenetrabox", "Impenetrabox")
    }

    public static readonly FLAVOR_LIST: FlavorList = [
        [Prostasia.FLAVORS.PERSONAL_ARMOR, Prostasia.FLAVORS.IMMUNIZATION],
        [Prostasia.FLAVORS.EXTERNAL_ARMOR, Prostasia.FLAVORS.DATA_SECURITY, Prostasia.FLAVORS.LOCKBOX, Prostasia.FLAVORS.ARCHITECTURE],
        [Prostasia.FLAVORS.MENTAL_SHIELD, Prostasia.FLAVORS.MORPHIC_SHIELD, Prostasia.FLAVORS.OCCULT_SHIELD],
        [Prostasia.FLAVORS.DIMENSIONAL_SHIELD],
        [Prostasia.FLAVORS.IMPENETRABOX]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Prostasia.ID, Prostasia.DISPLAY_NAME, Prostasia.FLAVOR_LIST, Prostasia.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Prostasia();
    }
}

export default Prostasia;