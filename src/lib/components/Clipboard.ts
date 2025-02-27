export async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        // Optionally add some visual feedback that it was copied
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}