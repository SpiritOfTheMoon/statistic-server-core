import { Period } from "../objects/enum";

export function getDate(period: Period, date: Date): Date {

    switch (period) {

    case Period.Day:
        date.setDate(new Date().getDay() - 1);
        break;
    case Period.Month:
        date.setMonth(new Date().getMonth() - 1);
        break;
    case Period.Year:
        date.setFullYear(new Date().getFullYear() - 1);
        break;
    
    }
    return date;

}
