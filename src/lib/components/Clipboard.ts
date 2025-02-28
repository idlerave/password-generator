export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        console.log("Copied to clipboard successfully.")
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}