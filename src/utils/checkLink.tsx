export const checkLink = (
    currentTitle: string,
    replacementText: string,
    isLink: boolean
) => {
    // Normalize strings by removing non-breaking spaces and trimming
    const normalizeString = (str: string) => {
        return str.replace(/\u00A0/g, '').trim();
    };

    const normalizedCurrentTitle = normalizeString(currentTitle);
    const normalizedReplacementText = normalizeString(replacementText);

    // Determine if the div should be clickable
    const isClickable = isLink && normalizedReplacementText === normalizedCurrentTitle;

    // Construct the URL
    const url = `https://${replacementText.trim()}`;

    const handleClick = () => {
        if (isClickable) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return {
        normalizedCurrentTitle,
        normalizedReplacementText,
        isClickable,
        handleClick
    };
};
