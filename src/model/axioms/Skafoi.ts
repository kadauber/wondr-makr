import Axiom, { FlavorList } from "../Axiom";
import QuirkTemplate, { QuirkTemplateOption } from "../QuirkTemplate";

class Skafoi extends Axiom {
    public static readonly ID = "epi";
    public static readonly DISPLAY_NAME = "Skafoi";

    public static readonly FLAVOR_LIST: FlavorList = [
        ["Car", "Boat", "Bouncer"],
        ["Plane", "Submarine", "Mole Machine"],
        ["Spaceship", "Super-submarine"],
        ["Teleporter", "Lightspeed Vehicle", "Dimensional Transporter"],
        ["Temporal Distortor", "Time Machine"]
    ];

    public static readonly QUIRK_TEMPLATES: QuirkTemplate[] = [
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
    ];

    private constructor() {
        super(Skafoi.ID, Skafoi.DISPLAY_NAME, Skafoi.FLAVOR_LIST, Skafoi.QUIRK_TEMPLATES);
    }

    public static create() {
        return new Skafoi();
    }
}

export default Skafoi;