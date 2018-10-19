// jshint esversion: 6
class Linea {
  constructor(tipo, colrow, cant) {
    this.tipo = tipo;
    this.colrow = colrow;
    this.cant = cant;
    this.iniciosn = []; //referidos a islas negras
    this.finesn = [];
    this.tamañosn = [];

    // this.iniciosb = []; //referidos a islas blancas
    // this.finesb = [];
    // this.tamañosb = [];
  }

  completar() {
    let aux = inifintam(this.tipo, this.colrow, 1); //islas negras
    this.inicios = aux.ini;
    this.fines = aux.fin;
    this.tamaños = aux.tam;

    // aux = inifintam(this.tipo, this.colrow, 2); //islas blancas
    // this.inicios = aux.ini;
    // this.fines = aux.fin;
    // this.tamaños = aux.tam;
  }
}
