import {Injectable} from '@angular/core';
import {User} from 'src/app/core/auth';
import {DecodeTokenService} from 'src/app/views/shared/decode-token.service';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthSingletonService {
  constructor(
    private decodeTokenService: DecodeTokenService,
    private toastService: ToastrService
  ) {
  }

  isLoggedIn(): boolean {
    let isExpired = true;
    let token;

    if (this.decodeTokenService.getToken()) {
      token = this.decodeTokenService.decode(this.decodeTokenService.getToken());
    }
    if (token) {
      isExpired = this.decodeTokenService.isTokenExpired();
    }
    if (isExpired) {
      // this.toastService.info('Please Login Again to Continue', 'Session expired!')
      localStorage.clear();
    }
    return !isExpired;
  }

  getCurrentUser(): User {
    let user
    if (this.decodeTokenService.getToken()) {
      user = this.decodeTokenService.setUser(
        this.decodeTokenService.decode(
          this.decodeTokenService.getToken()
        )
      );
    }
    return user;
  }

  getCurrentUserPermission(): string[] {
    let permission

    if (!this.getCurrentUser()) {
      return null;
    }
    try {
      permission = this.getCurrentUser().permissions
    } catch (err) {
      permission = false
    }
    return permission
  }
}
