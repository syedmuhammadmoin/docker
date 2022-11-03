import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DynamicColorChangeService {



  public global_color : BehaviorSubject<{}> = new BehaviorSubject<{}> ({
    bg_gradient_color_one : "rgba(0, 0, 0, 0.6)",
    bg_gradient_color_two : '#65c18c',
    bg_white :'#ffffff',
    primary_color :'#65c18c',
    secondary_color :'#141e27',
    input_filed_primary_color :'#808080',
    input_filed_background_color :'#f2f2f2',
    input_filed_border_color :'#d0d0d0',
    form_border_color :'rgba(101, 193, 140, 0.1)',
    test_shadow_color :'#9195a9',
    button_background_color :'rgba(101, 193, 140, 0.1)',
    light_gray_color :'#B5B5C3',
    title :'',
    login_title :'',
    login_cover_image :"url('assets/media/logos/edinfini-login-image.jpg')",
    site_logo :"url('assets/media/logos/LOGO-EDINFINI-HEADER.png')",
    dashboard_hight :'65px',
    dashboard_logo_width :'110px',
    dashboard_logo_hight :'80px',
    chart_color : ['#65c18c', '#65c18c', '#69a381', '#69a381'],
    site_title : 'EDINFINI',
    fav_icon : "assets/media/logos/EDINFINI-FAV-ICON.png",
    edinfini_true :false
  })

  // public edinfini : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  edinfini$ : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)

    // public bg_gradient_color_one : BehaviorSubject<any> = new BehaviorSubject<any>("rgba(0, 0, 0, 0.6)")
    // public bg_gradient_color_two : BehaviorSubject<any> = new BehaviorSubject<any>('#65c18c')
    // public bg_white : BehaviorSubject<any> = new BehaviorSubject<any>('#ffffff')
    // public primary_color : BehaviorSubject<any> = new BehaviorSubject<any>('#65c18c')
    // public secondary_color : BehaviorSubject<any> = new BehaviorSubject<any>('#141e27')
    // public input_filed_primary_color : BehaviorSubject<any> = new BehaviorSubject<any>('#808080')
    // public input_filed_background_color : BehaviorSubject<any> = new BehaviorSubject<any>('#f2f2f2')
    // public input_filed_border_color : BehaviorSubject<any> = new BehaviorSubject<any>('#d0d0d0')
    // public form_border_color : BehaviorSubject<any> = new BehaviorSubject<any>('rgba(101, 193, 140, 0.1)')
    // public test_shadow_color : BehaviorSubject<any> = new BehaviorSubject<any>('#9195a9')
    // public button_background_color : BehaviorSubject<any> = new BehaviorSubject<any>('rgba(101, 193, 140, 0.1)')
    // public light_gray_color : BehaviorSubject<any> = new BehaviorSubject<any>('#B5B5C3')
    // public title : BehaviorSubject<any> = new BehaviorSubject<any>('')
    // public login_title : BehaviorSubject<any> = new BehaviorSubject<any>('')
    // public login_cover_image : BehaviorSubject<any> = new BehaviorSubject<any>("url('assets/media/logos/edinfini-login-image.jpg')")
    // public site_logo : BehaviorSubject<any> = new BehaviorSubject<any>("url('assets/media/logos/LOGO-EDINFINI-HEADER.png')")
    // public dashboard_hight : BehaviorSubject<any> = new BehaviorSubject<any>('65px')
    // public dashboard_logo_width : BehaviorSubject<any> = new BehaviorSubject<any>('110px')
    // public dashboard_logo_hight : BehaviorSubject<any> = new BehaviorSubject<any>('80px')
    // public edinfini_true : BehaviorSubject<any> = new BehaviorSubject<any>(true)
    // public sbbu_true : BehaviorSubject<any> = new BehaviorSubject<any>(false)

  constructor() {
   }
}
