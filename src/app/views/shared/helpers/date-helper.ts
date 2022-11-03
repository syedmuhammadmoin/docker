import {DatePipe} from "@angular/common";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {
  constructor(private datePipe: DatePipe) {
  }

  transformDate(date: Date, format: string) {
    let formattedDate;
    if (date) {
      formattedDate = this.datePipe.transform(date, format);
    }
    return formattedDate ?? ''
  }
}
