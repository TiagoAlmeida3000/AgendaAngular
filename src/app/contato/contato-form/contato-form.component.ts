import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { Contato } from '../contato';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato-form',
  templateUrl: './contato-form.component.html',
  styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {


  contato: Contato = new Contato();
  title: string = 'Novo contato'

  constructor(
    private http : HttpClient,
    private activatedRoute : ActivatedRoute,
    private router: Router,
    private contatoServise : ContatoService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if(id){
        this.contatoServise.getById(parseInt(id)).subscribe(contato =>{
        this.contato = contato;
        this.title = "Alterando contato";
      });
    }
  }

  submit() {
    this.contatoServise.save(this.contato).subscribe(contato =>{
      this.router.navigate(['contatos']);
    });
  }

}
