import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  urlApi = environment.API;
  public mensagem!: string;
  
  constructor(private router: Router, private http: HttpClient) { }


  register(form: NgForm){
    const credentials = {
      'Nome' : form.value.Nome,
      'Email' : form.value.Email,
      'Senha' : form.value.Senha
    }

    const pass = {
      'Senha' : form.value.Senha,
      'CSenha' : form.value.CSenha
    }

    if(pass.Senha === pass.CSenha){
      this.mensagem = ""
      this.http.post(this.urlApi + 'user/register', credentials)
      .subscribe(response => {
        this.mensagem = "";
        this.router.navigate(["/login"]); 
      }, err => {
        this.mensagem = err.error;
      });
    }else{
      this.mensagem = "Senhas não são iguais"
    }
  }
}