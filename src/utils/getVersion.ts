export const getMajorVersion = (version: string): string => {
    if (!version) return "";
    return version.split(".")[0];
};
