export function calculDDay(targetDate) {
    if(!targetDate) return null;

    const targetDateObject = new Date(targetDate);
    const today = new Date();

    targetDateObject.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = targetDateObject.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays < 0 ? "+" + Math.abs(diffDays) :
            diffDays > 0 ? "-" + diffDays :
            0;
}