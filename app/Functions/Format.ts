export function GetDayName(date: Date) : string {
    var dayWeekNumber = date.getDay();
    switch(dayWeekNumber)
    {
        case 0:
            return "Dimanche"
        case 1:
            return "Lundi"
        case 2:
            return "Mardi"
        case 3:
            return "Mercredi"
        case 4:
            return "Jeudi"
        case 5:
            return "Vendredi"
        case 6:
            return "Samedi"
        default:
            return "ERROR"
    }
}

export function GetDateWithDaysOffset(daysOffset: number) : Date {
    var date = new Date();
    date.setDate(date.getDate() + daysOffset)
    return date;
}