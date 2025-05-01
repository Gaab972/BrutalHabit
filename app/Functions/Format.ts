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

export function GetMonthName(date: Date): string {
    var monthNumber = date.getMonth();
    switch(monthNumber)
    {
        case 0:
            return "Janvier"
        case 1:
            return "Février"
        case 2:
            return "Mars"
        case 3:
            return "Avril"
        case 4:
            return "Mai"
        case 5:
            return "Juin"
        case 6:
            return "Juillet"
        case 7:
            return "Août"
        case 8:
            return "Septembre"
        case 9:
            return "Octobre"
        case 10:
            return "Novembre"
        case 11:
            return "Décembre"
        default:
            return "ERROR"
    }
}

export function GetDateWithDaysOffset(daysOffset: number) : Date {
    var date = new Date();
    date.setDate(date.getDate() + daysOffset)
    return date;
}