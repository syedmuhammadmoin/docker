import {Injectable} from '@angular/core';
import jwt_decode from 'jwt-decode'
import {User} from "../../core/auth";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DecodeTokenService {

  //private tokenToReturn: any = {userId: '', email: '', name: '', roles: [], claims: []};
  private tokenToReturn: any = {
    userId: '',
    email: '',
    name: '',
    roles: [],
    permissions: [],
    tokenExpiration: 0,
    dateFormat: ''
  };
  private decodedToken: any

  constructor() {
  }


  decode(token: string): any {
    if (!token) {
      return null;
    }
    try {
      this.decodedToken = jwt_decode(token);
      if (this.decodedToken) {
        this.tokenToReturn.email = this.decodedToken?.Email;
        this.tokenToReturn.tokenExpiration = this.decodedToken['refreshTokenExpiry']
        this.tokenToReturn.name = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ?? null;
        this.tokenToReturn.permissions = this.decodedToken?.Permission
        const roles = this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? null;
        this.tokenToReturn.roles = roles !== null ? roles.toString().split(',') : [];
        this.tokenToReturn.userId = this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ?? null;
        this.tokenToReturn.Organization = +this.decodedToken?.Organization;
        this.tokenToReturn.dateFormat = this.decodedToken['DateFormat'];
        this.tokenToReturn.currency = this.decodedToken['Currency'];
        return this.tokenToReturn;
      }
    } catch (e) {
      console.error('token error', e);
      return null;
    }
  }

  setUser(decodedToken: any) {
    const model = new User();

    if (!decodedToken) {
      return model;
    }

    try {
      model.username = decodedToken.name
      model.email = decodedToken.email;
      model.roles = decodedToken.roles;
      model.id = decodedToken.userId;
      model.fullname = decodedToken.name.split('@')[0];
      model.permissions = decodedToken.permissions
      model.organization = decodedToken.Organization
      model.tokenExpiry = this.getTokenExpirationDate();
      model.dateFormat = decodedToken.dateFormat
      model.currency = decodedToken.currency
      model.orgId = decodedToken.Organization
    } catch (e) {
      console.error(e)
    }
    return model
  }

  private getTokenExpirationDate(token?: string): Date {
    token = token ?? this.getToken()
    const decoded = this.decode(token);

    if (!decoded && decoded.tokenExpiration === undefined) return null;

    const date = new Date(decoded.tokenExpiration);
    // date.setUTCSeconds(decoded.tokenExpiration);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    token = token ?? this.getToken();

    if (!token) return true;

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) return true;
    return !(date.valueOf() > new Date().valueOf());
  }

  getToken(): any {
    let token = null;
    try {
      token = localStorage.getItem(environment.authTokenKey);
    } catch (err) {
      console.error(err);
    }
    return token;
  }

  getUser(): User {
    return this.setUser(this.decode(this.getToken())) as User
  }
}
