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
}

export default Utils;