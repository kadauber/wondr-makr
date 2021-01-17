import Quirk from "./model/Quirk";

class Utils {
    public static renderUsageModifier(usageModifier: number): React.ReactNode {
        let usageModifierString = "";
        if (usageModifier === 0) {
            usageModifierString = "+0";
        } else if (usageModifier < 0) {
            usageModifierString = usageModifier.toString();
        } else {
            usageModifierString = `+${usageModifier}`;
        }

        return <span className="tracked">{usageModifierString}</span>
    }

    public static calculateUsageModifier(quirks: Set<Quirk>): number {
        let usageModifier = 0;
        quirks.forEach(quirk => {
            usageModifier += quirk.getUsageModifier();
        });
        return usageModifier;
    }
}

export default Utils;