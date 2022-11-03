import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {IProduct} from "../../../pages/profiling/product/model/IProduct";
import {Observable} from "rxjs";
import {ProductService} from "../../../pages/profiling/product/service/product.service";

@Injectable()
export class ProductResolverService implements Resolve<IProduct[]>{

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProduct[]> | Promise<IProduct[]> | IProduct[] {
    return //this.productService.getProducts();
  }
}
