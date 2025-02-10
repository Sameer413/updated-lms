const groupBySection = (data: any[] | undefined | null): Record<string, any[]> => {
    if (!Array.isArray(data)) {
        console.error("Invalid data: Expected an array but received", data);
        return {}; // Return an empty object instead of throwing an error
    }

    return data.reduce<Record<string, any[]>>((acc, item) => {
        const section = item.sectionTitle || "Uncategorized"; // Handle missing section
        if (!acc[section]) {
            acc[section] = [];
        }
        acc[section].push(item);
        return acc;
    }, {});
};

export default groupBySection;