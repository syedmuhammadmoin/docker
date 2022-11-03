import {FormGroup} from '@angular/forms';
import {Injector} from '@angular/core';
import {DocType, Permissions} from './AppEnum';
import {CREDIT_NOTE, DEBIT_NOTE, JOURNAL_ENTRY, PAYMENT} from './AppRoutes';
import {IRaGridProperties} from './components/interfaces/ra-grid-properties.interface';
import {ServiceInjectorLocal} from './service-injector-local';

export abstract class AppComponentBase extends ServiceInjectorLocal {
  currentDate = new Date()
  public permissions = Permissions
  public raGridProperties?: Partial<IRaGridProperties>;

  constructor(injector: Injector) {
    super(injector)
  }

  public transformDate(date: Date, format: string) {
    if (date == null) return null
    format = (format || this.decodeService.setUser(this.decodeService.decode(this.decodeService.getToken())).dateFormat || 'MMM d, y')
    return this.datePipe.transform(date, format);
  }
  // For checking validation message
  public logValidationErrors(formGroup: FormGroup, formErrors: any, validationMessages?: any): void {

    Object.keys(formGroup.controls).forEach((Key: string) => {
      const abstractControl = formGroup.get(Key);
      formErrors[Key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '' || abstractControl.untouched)) {
        const messages = validationMessages[Key] || {[Key]: ''};
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            formErrors[Key] += messages[errorKey] + ' ';
          }
        }
      }
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl, formErrors);
      }
    });
  }

  public valueFormatter(value: any, sign?: '-ve' | '+ve') {
    value = +value || 0
    let convertedValue = 0
    const transformData = (data) => {
      return data.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }
    try {
      convertedValue = Number(value);
      if (sign === '+ve' || Math.sign(convertedValue) !== -1) {
        return transformData(convertedValue)
      } else if (sign === '-ve' || Math.sign(convertedValue) === -1) {
        return '(' + transformData(Math.abs(convertedValue)) + ')'
      }
    } catch (error) {
      return error
    }
  }
  public valueFormatterAmount(value: any, sign?: '-ve' | '+ve') {
    const result = this.valueFormatter(value, sign);
    return ((this.decodeService.getUser().currency || 'PKR') + ' ' + result)
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  redirectionHelper(docType: DocType, id): string {
    let url = '/';
    switch (docType) {
      case DocType.JournalEntry:
        url = url.concat(JOURNAL_ENTRY.ID_BASED_ROUTE('details', id));
        return;
      case DocType.Payment:
        url = PAYMENT.CONDITIONAL_ROUTE('voucher') + PAYMENT.ID_BASED_ROUTE('details', id)
        return;
      case DocType.Receipt:
        url = PAYMENT.CONDITIONAL_ROUTE('receipt') + PAYMENT.ID_BASED_ROUTE('details', id)
        return;
      case DocType.CreditNote:
        url = url.concat(CREDIT_NOTE.ID_BASED_ROUTE('details', id))
        return;
      case DocType.DebitNote:
        url = url.concat(DEBIT_NOTE.ID_BASED_ROUTE('details', id))
        return;
    }
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  calculateTotal(res: any, ...keys): any {
    const objectToReturn = {}
    keys.forEach((key) => {
      res.map((item) => {
        if (objectToReturn[key]) {
          objectToReturn[key] += item[key]
        } else {
          objectToReturn[key] = item[key]
        }
      })
    })
    return objectToReturn
  }

}
