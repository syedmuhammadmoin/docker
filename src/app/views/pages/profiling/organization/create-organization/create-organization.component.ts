import {FormGroup, Validators} from '@angular/forms';
import {IOrganization} from '../model/IOrganization';
import {IState} from 'src/app/views/shared/models/state';
import {ICity} from 'src/app/views/shared/models/city';
import {ICountry} from 'src/app/views/shared/models/country';
import {CscService} from 'src/app/views/shared/csc.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AppComponentBase} from 'src/app/views/shared/app-component-base';
import {Component, Inject, Injector, OnInit, Optional} from '@angular/core';
import {finalize, take} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {IsReloadRequired} from '../../store/profiling.action';
import {OrganizationState} from '../store/organization.state';
import {NgxsCustomService} from 'src/app/views/shared/services/ngxs-service/ngxs-custom.service';
import {IApiResponse} from 'src/app/views/shared/IApiResponse';
import {DecodeTokenService} from '../../../../shared/decode-token.service';
import {AuthenticationService} from "../../../auth/service/authentication.service";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'kt-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.scss'],
  providers: [NgxsCustomService]
})

export class CreateOrganizationComponent extends AppComponentBase implements OnInit {

  currency = [
    {
      name: 'US Dollar',
      symbol: '$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'USD',
      namePlural: 'US dollars'
    },
    {
      name: 'Canadian Dollar',
      symbol: 'CA$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'CAD',
      namePlural: 'Canadian dollars'
    },
    {
      name: 'Euro',
      symbol: '€',
      symbolNative: '€',
      decimalDigits: 2,
      rounding: 0,
      code: 'EUR',
      namePlural: 'euros'
    },
    {
      name: 'United Arab Emirates Dirham',
      symbol: 'AED',
      symbolNative: 'د.إ.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'AED',
      namePlural: 'UAE dirhams'
    },
    {
      name: 'Afghan Afghani',
      symbol: 'Af',
      symbolNative: '؋',
      decimalDigits: 0,
      rounding: 0,
      code: 'AFN',
      namePlural: 'Afghan Afghanis'
    },
    {
      name: 'Albanian Lek',
      symbol: 'ALL',
      symbolNative: 'Lek',
      decimalDigits: 0,
      rounding: 0,
      code: 'ALL',
      namePlural: 'Albanian lekë'
    },
    {
      name: 'Armenian Dram',
      symbol: 'AMD',
      symbolNative: 'դր.',
      decimalDigits: 0,
      rounding: 0,
      code: 'AMD',
      namePlural: 'Armenian drams'
    },
    {
      name: 'Argentine Peso',
      symbol: 'AR$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'ARS',
      namePlural: 'Argentine pesos'
    },
    {
      name: 'Australian Dollar',
      symbol: 'AU$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'AUD',
      namePlural: 'Australian dollars'
    },
    {
      name: 'Azerbaijani Manat',
      symbol: 'man.',
      symbolNative: 'ман.',
      decimalDigits: 2,
      rounding: 0,
      code: 'AZN',
      namePlural: 'Azerbaijani manats'
    },
    {
      name: 'Bosnia-Herzegovina Convertible Mark',
      symbol: 'KM',
      symbolNative: 'KM',
      decimalDigits: 2,
      rounding: 0,
      code: 'BAM',
      namePlural: 'Bosnia-Herzegovina convertible marks'
    },
    {
      name: 'Bangladeshi Taka',
      symbol: 'Tk',
      symbolNative: '৳',
      decimalDigits: 2,
      rounding: 0,
      code: 'BDT',
      namePlural: 'Bangladeshi takas'
    },
    {
      name: 'Bulgarian Lev',
      symbol: 'BGN',
      symbolNative: 'лв.',
      decimalDigits: 2,
      rounding: 0,
      code: 'BGN',
      namePlural: 'Bulgarian leva'
    },
    {
      name: 'Bahraini Dinar',
      symbol: 'BD',
      symbolNative: 'د.ب.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'BHD',
      namePlural: 'Bahraini dinars'
    },
    {
      name: 'Burundian Franc',
      symbol: 'FBu',
      symbolNative: 'FBu',
      decimalDigits: 0,
      rounding: 0,
      code: 'BIF',
      namePlural: 'Burundian francs'
    },
    {
      name: 'Brunei Dollar',
      symbol: 'BN$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'BND',
      namePlural: 'Brunei dollars'
    },
    {
      name: 'Bolivian Boliviano',
      symbol: 'Bs',
      symbolNative: 'Bs',
      decimalDigits: 2,
      rounding: 0,
      code: 'BOB',
      namePlural: 'Bolivian bolivianos'
    },
    {
      name: 'Brazilian Real',
      symbol: 'R$',
      symbolNative: 'R$',
      decimalDigits: 2,
      rounding: 0,
      code: 'BRL',
      namePlural: 'Brazilian reals'
    },
    {
      name: 'Botswanan Pula',
      symbol: 'BWP',
      symbolNative: 'P',
      decimalDigits: 2,
      rounding: 0,
      code: 'BWP',
      namePlural: 'Botswanan pulas'
    },
    {
      name: 'Belarusian Ruble',
      symbol: 'Br',
      symbolNative: 'руб.',
      decimalDigits: 2,
      rounding: 0,
      code: 'BYN',
      namePlural: 'Belarusian rubles'
    },
    {
      name: 'Belize Dollar',
      symbol: 'BZ$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'BZD',
      namePlural: 'Belize dollars'
    },
    {
      name: 'Congolese Franc',
      symbol: 'CDF',
      symbolNative: 'FrCD',
      decimalDigits: 2,
      rounding: 0,
      code: 'CDF',
      namePlural: 'Congolese francs'
    },
    {
      name: 'Swiss Franc',
      symbol: 'CHF',
      symbolNative: 'CHF',
      decimalDigits: 2,
      rounding: 0.05,
      code: 'CHF',
      namePlural: 'Swiss francs'
    },
    {
      name: 'Chilean Peso',
      symbol: 'CL$',
      symbolNative: '$',
      decimalDigits: 0,
      rounding: 0,
      code: 'CLP',
      namePlural: 'Chilean pesos'
    },
    {
      name: 'Chinese Yuan',
      symbol: 'CN¥',
      symbolNative: 'CN¥',
      decimalDigits: 2,
      rounding: 0,
      code: 'CNY',
      namePlural: 'Chinese yuan'
    },
    {
      name: 'Colombian Peso',
      symbol: 'CO$',
      symbolNative: '$',
      decimalDigits: 0,
      rounding: 0,
      code: 'COP',
      namePlural: 'Colombian pesos'
    },
    {
      name: 'Costa Rican Colón',
      symbol: '₡',
      symbolNative: '₡',
      decimalDigits: 0,
      rounding: 0,
      code: 'CRC',
      namePlural: 'Costa Rican colóns'
    },
    {
      name: 'Cape Verdean Escudo',
      symbol: 'CV$',
      symbolNative: 'CV$',
      decimalDigits: 2,
      rounding: 0,
      code: 'CVE',
      namePlural: 'Cape Verdean escudos'
    },
    {
      name: 'Czech Republic Koruna',
      symbol: 'Kč',
      symbolNative: 'Kč',
      decimalDigits: 2,
      rounding: 0,
      code: 'CZK',
      namePlural: 'Czech Republic korunas'
    },
    {
      name: 'Djiboutian Franc',
      symbol: 'Fdj',
      symbolNative: 'Fdj',
      decimalDigits: 0,
      rounding: 0,
      code: 'DJF',
      namePlural: 'Djiboutian francs'
    },
    {
      name: 'Danish Krone',
      symbol: 'Dkr',
      symbolNative: 'kr',
      decimalDigits: 2,
      rounding: 0,
      code: 'DKK',
      namePlural: 'Danish kroner'
    },
    {
      name: 'Dominican Peso',
      symbol: 'RD$',
      symbolNative: 'RD$',
      decimalDigits: 2,
      rounding: 0,
      code: 'DOP',
      namePlural: 'Dominican pesos'
    },
    {
      name: 'Algerian Dinar',
      symbol: 'DA',
      symbolNative: 'د.ج.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'DZD',
      namePlural: 'Algerian dinars'
    },
    {
      name: 'Estonian Kroon',
      symbol: 'Ekr',
      symbolNative: 'kr',
      decimalDigits: 2,
      rounding: 0,
      code: 'EEK',
      namePlural: 'Estonian kroons'
    },
    {
      name: 'Egyptian Pound',
      symbol: 'EGP',
      symbolNative: 'ج.م.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'EGP',
      namePlural: 'Egyptian pounds'
    },
    {
      name: 'Eritrean Nakfa',
      symbol: 'Nfk',
      symbolNative: 'Nfk',
      decimalDigits: 2,
      rounding: 0,
      code: 'ERN',
      namePlural: 'Eritrean nakfas'
    },
    {
      name: 'Ethiopian Birr',
      symbol: 'Br',
      symbolNative: 'Br',
      decimalDigits: 2,
      rounding: 0,
      code: 'ETB',
      namePlural: 'Ethiopian birrs'
    },
    {
      name: 'British Pound Sterling',
      symbol: '£',
      symbolNative: '£',
      decimalDigits: 2,
      rounding: 0,
      code: 'GBP',
      namePlural: 'British pounds sterling'
    },
    {
      name: 'Georgian Lari',
      symbol: 'GEL',
      symbolNative: 'GEL',
      decimalDigits: 2,
      rounding: 0,
      code: 'GEL',
      namePlural: 'Georgian laris'
    },
    {
      name: 'Ghanaian Cedi',
      symbol: 'GH₵',
      symbolNative: 'GH₵',
      decimalDigits: 2,
      rounding: 0,
      code: 'GHS',
      namePlural: 'Ghanaian cedis'
    },
    {
      name: 'Guinean Franc',
      symbol: 'FG',
      symbolNative: 'FG',
      decimalDigits: 0,
      rounding: 0,
      code: 'GNF',
      namePlural: 'Guinean francs'
    },
    {
      name: 'Guatemalan Quetzal',
      symbol: 'GTQ',
      symbolNative: 'Q',
      decimalDigits: 2,
      rounding: 0,
      code: 'GTQ',
      namePlural: 'Guatemalan quetzals'
    },
    {
      name: 'Hong Kong Dollar',
      symbol: 'HK$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'HKD',
      namePlural: 'Hong Kong dollars'
    },
    {
      name: 'Honduran Lempira',
      symbol: 'HNL',
      symbolNative: 'L',
      decimalDigits: 2,
      rounding: 0,
      code: 'HNL',
      namePlural: 'Honduran lempiras'
    },
    {
      name: 'Croatian Kuna',
      symbol: 'kn',
      symbolNative: 'kn',
      decimalDigits: 2,
      rounding: 0,
      code: 'HRK',
      namePlural: 'Croatian kunas'
    },
    {
      name: 'Hungarian Forint',
      symbol: 'Ft',
      symbolNative: 'Ft',
      decimalDigits: 0,
      rounding: 0,
      code: 'HUF',
      namePlural: 'Hungarian forints'
    },
    {
      name: 'Indonesian Rupiah',
      symbol: 'Rp',
      symbolNative: 'Rp',
      decimalDigits: 0,
      rounding: 0,
      code: 'IDR',
      namePlural: 'Indonesian rupiahs'
    },
    {
      name: 'Israeli New Sheqel',
      symbol: '₪',
      symbolNative: '₪',
      decimalDigits: 2,
      rounding: 0,
      code: 'ILS',
      namePlural: 'Israeli new sheqels'
    },
    {
      name: 'Indian Rupee',
      symbol: '₹',
      symbolNative: 'টকা',
      decimalDigits: 2,
      rounding: 0,
      code: 'INR',
      namePlural: 'Indian rupees'
    },
    {
      name: 'Iraqi Dinar',
      symbol: 'IQD',
      symbolNative: 'د.ع.‏',
      decimalDigits: 0,
      rounding: 0,
      code: 'IQD',
      namePlural: 'Iraqi dinars'
    },
    {
      name: 'Iranian Rial',
      symbol: 'IRR',
      symbolNative: '﷼',
      decimalDigits: 0,
      rounding: 0,
      code: 'IRR',
      namePlural: 'Iranian rials'
    },
    {
      name: 'Icelandic Króna',
      symbol: 'Ikr',
      symbolNative: 'kr',
      decimalDigits: 0,
      rounding: 0,
      code: 'ISK',
      namePlural: 'Icelandic krónur'
    },
    {
      name: 'Jamaican Dollar',
      symbol: 'J$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'JMD',
      namePlural: 'Jamaican dollars'
    },
    {
      name: 'Jordanian Dinar',
      symbol: 'JD',
      symbolNative: 'د.أ.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'JOD',
      namePlural: 'Jordanian dinars'
    },
    {
      name: 'Japanese Yen',
      symbol: '¥',
      symbolNative: '￥',
      decimalDigits: 0,
      rounding: 0,
      code: 'JPY',
      namePlural: 'Japanese yen'
    },
    {
      name: 'Kenyan Shilling',
      symbol: 'Ksh',
      symbolNative: 'Ksh',
      decimalDigits: 2,
      rounding: 0,
      code: 'KES',
      namePlural: 'Kenyan shillings'
    },
    {
      name: 'Cambodian Riel',
      symbol: 'KHR',
      symbolNative: '៛',
      decimalDigits: 2,
      rounding: 0,
      code: 'KHR',
      namePlural: 'Cambodian riels'
    },
    {
      name: 'Comorian Franc',
      symbol: 'CF',
      symbolNative: 'FC',
      decimalDigits: 0,
      rounding: 0,
      code: 'KMF',
      namePlural: 'Comorian francs'
    },
    {
      name: 'South Korean Won',
      symbol: '₩',
      symbolNative: '₩',
      decimalDigits: 0,
      rounding: 0,
      code: 'KRW',
      namePlural: 'South Korean won'
    },
    {
      name: 'Kuwaiti Dinar',
      symbol: 'KD',
      symbolNative: 'د.ك.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'KWD',
      namePlural: 'Kuwaiti dinars'
    },
    {
      name: 'Kazakhstani Tenge',
      symbol: 'KZT',
      symbolNative: 'тңг.',
      decimalDigits: 2,
      rounding: 0,
      code: 'KZT',
      namePlural: 'Kazakhstani tenges'
    },
    {
      name: 'Lebanese Pound',
      symbol: 'LB£',
      symbolNative: 'ل.ل.‏',
      decimalDigits: 0,
      rounding: 0,
      code: 'LBP',
      namePlural: 'Lebanese pounds'
    },
    {
      name: 'Sri Lankan Rupee',
      symbol: 'SLRs',
      symbolNative: 'SL Re',
      decimalDigits: 2,
      rounding: 0,
      code: 'LKR',
      namePlural: 'Sri Lankan rupees'
    },
    {
      name: 'Lithuanian Litas',
      symbol: 'Lt',
      symbolNative: 'Lt',
      decimalDigits: 2,
      rounding: 0,
      code: 'LTL',
      namePlural: 'Lithuanian litai'
    },
    {
      name: 'Latvian Lats',
      symbol: 'Ls',
      symbolNative: 'Ls',
      decimalDigits: 2,
      rounding: 0,
      code: 'LVL',
      namePlural: 'Latvian lati'
    },
    {
      name: 'Libyan Dinar',
      symbol: 'LD',
      symbolNative: 'د.ل.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'LYD',
      namePlural: 'Libyan dinars'
    },
    {
      name: 'Moroccan Dirham',
      symbol: 'MAD',
      symbolNative: 'د.م.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'MAD',
      namePlural: 'Moroccan dirhams'
    },
    {
      name: 'Moldovan Leu',
      symbol: 'MDL',
      symbolNative: 'MDL',
      decimalDigits: 2,
      rounding: 0,
      code: 'MDL',
      namePlural: 'Moldovan lei'
    },
    {
      name: 'Malagasy Ariary',
      symbol: 'MGA',
      symbolNative: 'MGA',
      decimalDigits: 0,
      rounding: 0,
      code: 'MGA',
      namePlural: 'Malagasy Ariaries'
    },
    {
      name: 'Macedonian Denar',
      symbol: 'MKD',
      symbolNative: 'MKD',
      decimalDigits: 2,
      rounding: 0,
      code: 'MKD',
      namePlural: 'Macedonian denari'
    },
    {
      name: 'Myanma Kyat',
      symbol: 'MMK',
      symbolNative: 'K',
      decimalDigits: 0,
      rounding: 0,
      code: 'MMK',
      namePlural: 'Myanma kyats'
    },
    {
      name: 'Macanese Pataca',
      symbol: 'MOP$',
      symbolNative: 'MOP$',
      decimalDigits: 2,
      rounding: 0,
      code: 'MOP',
      namePlural: 'Macanese patacas'
    },
    {
      name: 'Mauritian Rupee',
      symbol: 'MURs',
      symbolNative: 'MURs',
      decimalDigits: 0,
      rounding: 0,
      code: 'MUR',
      namePlural: 'Mauritian rupees'
    },
    {
      name: 'Mexican Peso',
      symbol: 'MX$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'MXN',
      namePlural: 'Mexican pesos'
    },
    {
      name: 'Malaysian Ringgit',
      symbol: 'RM',
      symbolNative: 'RM',
      decimalDigits: 2,
      rounding: 0,
      code: 'MYR',
      namePlural: 'Malaysian ringgits'
    },
    {
      name: 'Mozambican Metical',
      symbol: 'MTn',
      symbolNative: 'MTn',
      decimalDigits: 2,
      rounding: 0,
      code: 'MZN',
      namePlural: 'Mozambican meticals'
    },
    {
      name: 'Namibian Dollar',
      symbol: 'N$',
      symbolNative: 'N$',
      decimalDigits: 2,
      rounding: 0,
      code: 'NAD',
      namePlural: 'Namibian dollars'
    },
    {
      name: 'Nigerian Naira',
      symbol: '₦',
      symbolNative: '₦',
      decimalDigits: 2,
      rounding: 0,
      code: 'NGN',
      namePlural: 'Nigerian nairas'
    },
    {
      name: 'Nicaraguan Córdoba',
      symbol: 'C$',
      symbolNative: 'C$',
      decimalDigits: 2,
      rounding: 0,
      code: 'NIO',
      namePlural: 'Nicaraguan córdobas'
    },
    {
      name: 'Norwegian Krone',
      symbol: 'Nkr',
      symbolNative: 'kr',
      decimalDigits: 2,
      rounding: 0,
      code: 'NOK',
      namePlural: 'Norwegian kroner'
    },
    {
      name: 'Nepalese Rupee',
      symbol: 'NPRs',
      symbolNative: 'नेरू',
      decimalDigits: 2,
      rounding: 0,
      code: 'NPR',
      namePlural: 'Nepalese rupees'
    },
    {
      name: 'New Zealand Dollar',
      symbol: 'NZ$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'NZD',
      namePlural: 'New Zealand dollars'
    },
    {
      name: 'Omani Rial',
      symbol: 'OMR',
      symbolNative: 'ر.ع.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'OMR',
      namePlural: 'Omani rials'
    },
    {
      name: 'Panamanian Balboa',
      symbol: 'B/.',
      symbolNative: 'B/.',
      decimalDigits: 2,
      rounding: 0,
      code: 'PAB',
      namePlural: 'Panamanian balboas'
    },
    {
      name: 'Peruvian Nuevo Sol',
      symbol: 'S/.',
      symbolNative: 'S/.',
      decimalDigits: 2,
      rounding: 0,
      code: 'PEN',
      namePlural: 'Peruvian nuevos soles'
    },
    {
      name: 'Philippine Peso',
      symbol: '₱',
      symbolNative: '₱',
      decimalDigits: 2,
      rounding: 0,
      code: 'PHP',
      namePlural: 'Philippine pesos'
    },
    {
      name: 'Pakistani Rupee',
      symbol: 'PKRs',
      symbolNative: '₨',
      decimalDigits: 0,
      rounding: 0,
      code: 'PKR',
      namePlural: 'Pakistani rupees'
    },
    {
      name: 'Polish Zloty',
      symbol: 'zł',
      symbolNative: 'zł',
      decimalDigits: 2,
      rounding: 0,
      code: 'PLN',
      namePlural: 'Polish zlotys'
    },
    {
      name: 'Paraguayan Guarani',
      symbol: '₲',
      symbolNative: '₲',
      decimalDigits: 0,
      rounding: 0,
      code: 'PYG',
      namePlural: 'Paraguayan guaranis'
    },
    {
      name: 'Qatari Rial',
      symbol: 'QR',
      symbolNative: 'ر.ق.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'QAR',
      namePlural: 'Qatari rials'
    },
    {
      name: 'Romanian Leu',
      symbol: 'RON',
      symbolNative: 'RON',
      decimalDigits: 2,
      rounding: 0,
      code: 'RON',
      namePlural: 'Romanian lei'
    },
    {
      name: 'Serbian Dinar',
      symbol: 'din.',
      symbolNative: 'дин.',
      decimalDigits: 0,
      rounding: 0,
      code: 'RSD',
      namePlural: 'Serbian dinars'
    },
    {
      name: 'Russian Ruble',
      symbol: 'RUB',
      symbolNative: '₽.',
      decimalDigits: 2,
      rounding: 0,
      code: 'RUB',
      namePlural: 'Russian rubles'
    },
    {
      name: 'Rwandan Franc',
      symbol: 'RWF',
      symbolNative: 'FR',
      decimalDigits: 0,
      rounding: 0,
      code: 'RWF',
      namePlural: 'Rwandan francs'
    },
    {
      name: 'Saudi Riyal',
      symbol: 'SR',
      symbolNative: 'ر.س.‏',
      decimalDigits: 2,
      rounding: 0,
      code: 'SAR',
      namePlural: 'Saudi riyals'
    },
    {
      name: 'Sudanese Pound',
      symbol: 'SDG',
      symbolNative: 'SDG',
      decimalDigits: 2,
      rounding: 0,
      code: 'SDG',
      namePlural: 'Sudanese pounds'
    },
    {
      name: 'Swedish Krona',
      symbol: 'Skr',
      symbolNative: 'kr',
      decimalDigits: 2,
      rounding: 0,
      code: 'SEK',
      namePlural: 'Swedish kronor'
    },
    {
      name: 'Singapore Dollar',
      symbol: 'S$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'SGD',
      namePlural: 'Singapore dollars'
    },
    {
      name: 'Somali Shilling',
      symbol: 'Ssh',
      symbolNative: 'Ssh',
      decimalDigits: 0,
      rounding: 0,
      code: 'SOS',
      namePlural: 'Somali shillings'
    },
    {
      name: 'Syrian Pound',
      symbol: 'SY£',
      symbolNative: 'ل.س.‏',
      decimalDigits: 0,
      rounding: 0,
      code: 'SYP',
      namePlural: 'Syrian pounds'
    },
    {
      name: 'Thai Baht',
      symbol: '฿',
      symbolNative: '฿',
      decimalDigits: 2,
      rounding: 0,
      code: 'THB',
      namePlural: 'Thai baht'
    },
    {
      name: 'Tunisian Dinar',
      symbol: 'DT',
      symbolNative: 'د.ت.‏',
      decimalDigits: 3,
      rounding: 0,
      code: 'TND',
      namePlural: 'Tunisian dinars'
    },
    {
      name: 'Tongan Paʻanga',
      symbol: 'T$',
      symbolNative: 'T$',
      decimalDigits: 2,
      rounding: 0,
      code: 'TOP',
      namePlural: 'Tongan paʻanga'
    },
    {
      name: 'Turkish Lira',
      symbol: 'TL',
      symbolNative: 'TL',
      decimalDigits: 2,
      rounding: 0,
      code: 'TRY',
      namePlural: 'Turkish Lira'
    },
    {
      name: 'Trinidad and Tobago Dollar',
      symbol: 'TT$',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'TTD',
      namePlural: 'Trinidad and Tobago dollars'
    },
    {
      name: 'New Taiwan Dollar',
      symbol: 'NT$',
      symbolNative: 'NT$',
      decimalDigits: 2,
      rounding: 0,
      code: 'TWD',
      namePlural: 'New Taiwan dollars'
    },
    {
      name: 'Tanzanian Shilling',
      symbol: 'TSh',
      symbolNative: 'TSh',
      decimalDigits: 0,
      rounding: 0,
      code: 'TZS',
      namePlural: 'Tanzanian shillings'
    },
    {
      name: 'Ukrainian Hryvnia',
      symbol: '₴',
      symbolNative: '₴',
      decimalDigits: 2,
      rounding: 0,
      code: 'UAH',
      namePlural: 'Ukrainian hryvnias'
    },
    {
      name: 'Ugandan Shilling',
      symbol: 'USh',
      symbolNative: 'USh',
      decimalDigits: 0,
      rounding: 0,
      code: 'UGX',
      namePlural: 'Ugandan shillings'
    },
    {
      name: 'Uruguayan Peso',
      symbol: '$U',
      symbolNative: '$',
      decimalDigits: 2,
      rounding: 0,
      code: 'UYU',
      namePlural: 'Uruguayan pesos'
    },
    {
      name: 'Uzbekistan Som',
      symbol: 'UZS',
      symbolNative: 'UZS',
      decimalDigits: 0,
      rounding: 0,
      code: 'UZS',
      namePlural: 'Uzbekistan som'
    },
    {
      name: 'Venezuelan Bolívar',
      symbol: 'Bs.F.',
      symbolNative: 'Bs.F.',
      decimalDigits: 2,
      rounding: 0,
      code: 'VEF',
      namePlural: 'Venezuelan bolívars'
    },
    {
      name: 'Vietnamese Dong',
      symbol: '₫',
      symbolNative: '₫',
      decimalDigits: 0,
      rounding: 0,
      code: 'VND',
      namePlural: 'Vietnamese dong'
    },
    {
      name: 'CFA Franc BEAC',
      symbol: 'FCFA',
      symbolNative: 'FCFA',
      decimalDigits: 0,
      rounding: 0,
      code: 'XAF',
      namePlural: 'CFA francs BEAC'
    },
    {
      name: 'CFA Franc BCEAO',
      symbol: 'CFA',
      symbolNative: 'CFA',
      decimalDigits: 0,
      rounding: 0,
      code: 'XOF',
      namePlural: 'CFA francs BCEAO'
    },
    {
      name: 'Yemeni Rial',
      symbol: 'YR',
      symbolNative: 'ر.ي.‏',
      decimalDigits: 0,
      rounding: 0,
      code: 'YER',
      namePlural: 'Yemeni rials'
    },
    {
      name: 'South African Rand',
      symbol: 'R',
      symbolNative: 'R',
      decimalDigits: 2,
      rounding: 0,
      code: 'ZAR',
      namePlural: 'South African rand'
    },
    {
      name: 'Zambian Kwacha',
      symbol: 'ZK',
      symbolNative: 'ZK',
      decimalDigits: 0,
      rounding: 0,
      code: 'ZMK',
      namePlural: 'Zambian kwachas'
    },
    {
      name: 'Zimbabwean Dollar',
      symbol: 'ZWL$',
      symbolNative: 'ZWL$',
      decimalDigits: 0,
      rounding: 0,
      code: 'ZWL',
      namePlural: 'Zimbabwean Dollar'
    }
  ]

  formName = 'Create'

  // busy Loading
  isLoading: boolean

  // Variable for Organization form
  organizationForm: FormGroup;

  // Organization Model
  organization: IOrganization;

  // country , state and city list
  countryList: ICountry[] = [];
  stateList: IState[] = [];
  cityList: ICity[] = [];

  // for optionList dropdown
  stateList2: Subject<IState[]> = new Subject<IState[]>();
  cityList2: Subject<ICity[]> = new Subject<ICity[]>();

  validationMessages = {
    name: {
      required: 'Name is required.',
    },
    phone: {
      pattern: 'Only numeric values are allowed.',
    },
    fax: {
      pattern: 'Only numeric values are allowed.',
    },
    website: {
      pattern: 'Website pattern is not correct.'
    },
  };

  formErrors = {
    name: '',
    country: '',
    state: '',
    city: '',
    phone: '',
    fax: '',
    website: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    public ngxsService: NgxsCustomService,
    private cscService: CscService,
    private authService: AuthenticationService,
    private decodeTokenService: DecodeTokenService,
    @Optional() @Inject(MAT_DIALOG_DATA) private _id: number,
    public dialogRef: MatDialogRef<CreateOrganizationComponent>,
    injector: Injector) {
    super(injector);
  }

  ngOnInit() {
    const websitePattern = '((https?://)?||www.)?([\\a-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    this.organizationForm = this.fb.group({
      name: ['', [this.vs.TEXT({special: 0})]],
      country: [null],
      state: [null],
      city: [null],
      phone: ['', Validators.pattern(/([0-9]+)$/)],
      address: ['', this.vs.TEXT({required: 0})],
      fax: ['', Validators.pattern(/([0-9]+)$/)],
      email: [''], // [Validators.required, Validators.email]
      website: ['', [Validators.pattern(websitePattern)]], // [Validators.required,Validators.pattern(websitePattern)]
      industry: [''],
      legalStatus: [''],
      incomeTaxId: [''],
      gstRegistrationNo: [''],
      startDate: [''],
      endDate: [''],
      currency: ['']
    });

    this.getCountryList();

    if (this._id) {
      this.formName = 'Edit'
      this.isLoading = true;
      this.getOrganization(this._id);
    } else {
      this.organization = {
        id: null,
        name: '',
        country: '',
        state: '',
        city: '',
        phone: null,
        fax: '',
        email: '',
        website: '',
        address: '',
        industry: '',
        legalStatus: '',
        incomeTaxId: '',
        gstRegistrationNo: '',
        fiscalYearStart: null,
        fiscalYearEnd: null,
        currency: null
      };
    }
  }


  getOrganization(id: number) {
    this.ngxsService.organizationService.getOrganization(id)
      .subscribe(
        (organization: IApiResponse<IOrganization>) => {
          this.isLoading = false;
          this.editOrganization(organization.result)
          this.organization = organization.result
        },
        (err) => {

        }
      );
  }


  getCountryList() {
    this.cscService.getCountries().subscribe((data: ICountry[]) => {
      this.countryList = data;
    });
  }

  getStateLists(id: number) {
    this.cscService.getStates(id).subscribe((data: IState[]) => {
      this.stateList = data;
      this.stateList2.next(this.stateList)
    });
  }


  onChangeCountry(countryId: number) {
    if (countryId) {
      this.getStateLists(parseInt(countryId.toString()));
      this.stateList2.next(this.stateList)
    }
  }

  onChangeState(stateId: number) {
    if (stateId) {
      this.cscService.getCities(parseInt(stateId.toString())).subscribe(
        (data: ICity[]) => {
          this.cityList = data
          this.cityList2.next(this.cityList)
        });
    }
  }

  // edit organization
  editOrganization(organization: IOrganization) {
    organization.country ? this.onChangeCountry(this.countryList.find(c => c.name == organization.country).id) : console.log('false')
    organization.state ? this.onChangeState(this.stateList.find(c => c.name == organization.state).id) : console.log('false')

    this.organizationForm.patchValue({
      id: organization.id,
      name: organization.name,
      country: organization.country ? this.countryList.find(c => c.name == organization.country).id : null,
      state: organization.state ? this.stateList.find(c => c.name == organization.state).id : null,
      city: organization.city ? this.cityList.find(c => c.name == organization.city).id : null,
      phone: organization.phone,
      address: organization.address,
      fax: organization.fax,
      email: organization.email,
      website: organization.website,
      industry: organization.industry,
      legalStatus: organization.legalStatus,
      incomeTaxId: organization.incomeTaxId,
      gstRegistrationNo: organization.gstRegistrationNo,
      startDate: new Date(organization.fiscalYearStart),
      endDate: new Date(organization.fiscalYearEnd),
      currency: organization.currency,
    });
  }

  async onSubmit() {
    this.organizationForm.markAllAsTouched();
    if (this.organizationForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.mapFormValueToClientModel();
    if (this.organization.id) {
      await this.ngxsService.organizationService.updateOrganization(this.organization).toPromise()
      const response = await this.authService.refreshToken().toPromise();
      if (response.isSuccess) {
        localStorage.setItem(environment.authTokenKey, response.result.token);
        window.location.reload();
      }
      /*.pipe(
        take(1),
        // finalize(() => this.isLoading = false)
      )*/
      /*.subscribe(() => {
          this.authService.refreshToken().subscribe((res) => {
            if (res.isSuccess) {
              localStorage.setItem(environment.authTokenKey, res.result.token);
              window.location.reload();
            }
          })
          /!*this.authService.getApplicationToken(this.decodeTokenService.getUser().orgId)
            .subscribe((res) => {
              if (res.isSuccess) {
                localStorage.setItem(environment.authTokenKey, res.result.token);
                this.toastService.success('Updated Successfully', 'Organization')
                window.location.reload();
                this.onCloseDialog();
              }
            })*!/
        }
        /!*this.ngxsService.store.dispatch(new IsReloadRequired(OrganizationState, true))
        this.toastService.success('Updated Successfully', 'Organization')
        this.onCloseDialog();*!/
      )*/
    } else {
      delete this.organization.id;
      this.ngxsService.organizationService.addOrganization(this.organization)
        .pipe(
          take(1),
          finalize(() => this.isLoading = false))
        .subscribe(() => {
            this.ngxsService.store.dispatch(new IsReloadRequired(OrganizationState, true));
            this.toastService.success('Created Successfully', 'Organization')
            this.onCloseDialog();
          }
        );
    }
  }

  mapFormValueToClientModel() {

    const country = this.organizationForm.value.country;
    const state = this.organizationForm.value.country
    const city = this.organizationForm.value.city

    this.organization.name = this.organizationForm.value.name;
    this.organization.country = country ? this.countryList.find(c => c.id == this.organizationForm.value.country).name : null;
    this.organization.state = state ? this.stateList.find(c => c.id == this.organizationForm.value.state).name : null;
    this.organization.city = city ? this.cityList.find(c => c.id == this.organizationForm.value.city).name : null;
    this.organization.phone = this.organizationForm.value.phone;
    this.organization.fax = this.organizationForm.value.fax;
    this.organization.email = this.organizationForm.value.email;
    this.organization.address = this.organizationForm.value.address;
    this.organization.website = this.organizationForm.value.website;
    this.organization.industry = this.organizationForm.value.industry;
    this.organization.legalStatus = this.organizationForm.value.legalStatus;
    this.organization.incomeTaxId = this.organizationForm.value.incomeTaxId;
    this.organization.gstRegistrationNo = this.organizationForm.value.gstRegistrationNo;
    this.organization.fiscalYearStart = this.transformDate(this.organizationForm.value.startDate, 'yyyy-MM-dd');
    this.organization.fiscalYearEnd = this.transformDate(this.organizationForm.value.endDate, 'yyyy-MM-dd');
    this.organization.currency = this.organizationForm.value.currency || 'PKR';
  }

  // Dialogue close function
  onCloseDialog(): void {
    this.dialogRef.close();
  }
}


