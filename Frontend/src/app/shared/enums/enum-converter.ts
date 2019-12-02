import { Months } from './months.enum';

export class EnumConverter {


    public static ConvertMonthsEnumToArray(): any[] {
        let months = [];
        let monthsEnum = Months;
        Object.keys(Months).map((key:any) => {
            if (!Number(key)) {
                months.push({ label: key, value: monthsEnum[key] })
                return months;
            }
        }
        );
        return months;
    }
}