import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contato } from '../contato/contato';

@Injectable({
  providedIn: 'root'
})

export class ContatoResolverGuard implements Resolve<Contato> {

  API = environment.API;
  
  constructor(private http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Contato> {
    if (route.params && route.params['id']) {        
        return this.http.get<Contato>(`${this.API}Contato/Obter/${route.params['id']}`).pipe(take(1),tap(console.log));
    }
    return of({
      id:0,
      nome:"",
      telefone:""
    });
  }
}
