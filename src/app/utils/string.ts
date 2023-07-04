const combineStrings = (strings: (string | false | null | undefined)[], separator = ' ') =>
  strings.filter((s) => !!s).join(separator);

export const StringUtils = {
  combineStrings,
};
