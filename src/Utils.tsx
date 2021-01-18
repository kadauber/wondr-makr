import Quirky from "./model/Quirky";

class Utils {
    public static renderUsageModifier(usageModifier: number, withParens: boolean = true): React.ReactNode {
        let usageModifierString = "";
        if (usageModifier === 0) {
            usageModifierString = "+0";
        } else if (usageModifier < 0) {
            usageModifierString = usageModifier.toString();
        } else {
            usageModifierString = `+${usageModifier}`;
        }

        const usageModNode = <span className="tracked">{usageModifierString}</span>

        return withParens ? <>({usageModNode})</> : usageModNode;
    }

    public static calculateUsageModifier(quirks: Set<Quirky>): number {
        let usageModifier = 0;
        quirks.forEach(quirk => {
            usageModifier += quirk.getUsageModifier();
        });
        return usageModifier;
    }
}

export default Utils;