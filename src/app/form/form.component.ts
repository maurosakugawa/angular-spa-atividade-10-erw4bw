import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario, cidades } from '../usuario';
import { ServicoService } from '../servico.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  private cidades: string[];

  filtro: Observable<string[]>;

  constructor(private servico: ServicoService) { }

  private controle:FormGroup = new FormGroup({
    nome: new FormControl('',[Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*$")]),
    cidade: new FormControl ('',[Validators.pattern("^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]*$")]),
  });

  ngOnInit() {
  this.cidades = cidades;
  this.filtro = this.controle.get('cidade').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.cidades.filter(cidade => cidade.toLowerCase().includes(filterValue));
  }

  salvar(): boolean {
    let usuario: Usuario = new Usuario();
    usuario.nome = this.controle.value.nome;
    usuario.cidade = this.controle.value.cidade;
    this.servico.add(usuario);
    this.controle.reset();
    this.ngOnInit();
    return false;
  }


}