

export const getAxisID = (metric: string) => {
    if (metric.toLowerCase().endsWith('pressure')) {
        return 1
    } else if (metric.toLowerCase().endsWith('temp')) {
        return 2
    }
    return 0
}

export const unitAdder = (value: number): string => value >= 1000 ? `${value / 1000}K` : value.toString();

export const getTimeBefore = (minutes: number) => new Date(new Date().getTime() - minutes * 60000).getTime()

export const getTimeKey = (time: string) => {
    const hours = new Date(time).getHours() % 12 || 12;
    const minutes = new Date(time).getMinutes()
    const timeAt = `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`
    return timeAt
}

export const DURATION_IN_MINUTES = 30;

export const COLORS = ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600'];
