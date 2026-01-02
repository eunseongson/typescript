export const durationMsToTimeString = (durationMs: number): string => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

export const formatDateString = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}