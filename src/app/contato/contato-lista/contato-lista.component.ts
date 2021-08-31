import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Contato } from '../contato';
import { delay, map, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contato-lista',
  templateUrl: './contato-lista.component.html',
  styleUrls: ['./contato-lista.component.css']
})
export class ContatoListaComponent implements OnInit {

  contatos$! : any;
  contatoSelecionado! : Contato
  URLAPI = environment.API;

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private modalService: BsModalService) { }

  get headers(): HttpHeaders {
    return new HttpHeaders().set('content-type', 'application/json');
  }

  user: any;
  get usuario() {
    let usuario_json = localStorage.getItem("id");
    this.user = usuario_json;
    return this.user;
  }

  ngOnInit(): void {
    this.listarContatos();
  }

  listarContatos(){ 
       this.http.get(this.URLAPI + "Contato").pipe().subscribe(contato =>{
          this.contatos$ = contato;
    });
  }

  editar(id : number){
    this.router.navigate(['/editar', id], { relativeTo: this.route });
  }

  deletar(contato: any){
    this.contatoSelecionado = contato
    this.deleteModalRef = this.modalService.show(this.deleteModal,{class: 'modal-sm'});
  }

  confirmDelete(){
    return this.http.post<Contato>(this.URLAPI + "Contato/Deletar", this.contatoSelecionado).pipe(take(1)).subscribe(
      success => {
        this.listarContatos()
        this.deleteModalRef.hide();
      },
      error =>console.log(error));
  }

  declineDelete(){
    this.deleteModalRef.hide()
  }

}
