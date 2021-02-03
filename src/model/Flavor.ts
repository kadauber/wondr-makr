class Flavor {
    public readonly id: string;
    public readonly displayName: string;

    private constructor(id: string, displayName: string) {
        this.id = id;
        this.displayName = displayName;
    }

    public static createFlavor(id: string, displayName: string) {
        return new Flavor(id, displayName);
    }
}

export default Flavor;
