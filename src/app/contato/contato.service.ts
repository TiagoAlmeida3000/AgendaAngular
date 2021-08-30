import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Contato } from './contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  userId : any;
  user : any
  id : any

  constructor(private http: HttpClient,  private activatedRoute : ActivatedRoute,) { }


get usuario() {
    let usuario_json = localStorage.getItem("id");
    this.user = usuario_json;
    console.log("User" + this.user)
    return this.user;
}

  getUserId(id : any){
    this.userId = id
    this.id = localStorage.setItem('id', this.userId);
  }


  getAll(){
    return this.http.get<Contato[]>(`${environment.API}Contato`).pipe(tap(console.log))
  }

  getById(id:number){
    return this.http.get<Contato>(`${environment.API}Contato/Obter/${id}`);
  }

  save(contato: Contato){
    const contatoBody = {
      Id : contato.Id,
      Nome: contato.Nome,
      Telefone: contato.Telefone,
      UserId : this.usuario
    }


    console.log(contatoBody)
      return this.http.post<Contato>(`${environment.API}Contato`, contatoBody).pipe(tap(console.log));
   

    }

  delete(contato : Contato){
    return this.http.post<Contato>(`${environment.API}Contato/Deletar`, contato)
  }
}
