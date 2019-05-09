import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { Usuario, cidades } from '../usuario';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit {
  private cidades: string[];
  private usuario: Usuario = new Usuario;
  private colunas: string[] = ['nome', 'cidade'];

  constructor(private servico: ServicoService) { }
  ngOnInit() {
    this.cidades = cidades;
   }
  salvar(): void {
    this.servico.add(this.usuario);
    this.usuario = new Usuario();
  }
}