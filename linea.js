// jshint esversion: 6
class Linea {
  constructor(tipo, colrow, cant) {
    this.tipo = tipo;
    this.colrow = colrow;
    this.cant = cant;
    this.inicios = []; //referidos a islas negras
    this.fines = [];
    this.tamaños = [];
    this.mayor = -1; //inicio con un valor imposible
    this.mayorindice = -1;

    // this.iniciosb = []; //referidos a islas blancas
    // this.finesb = [];
    // this.tamañosb = [];
  }

  completar() {
    let aux = inifintam(this.tipo, this.colrow, 1); //islas negras
    this.inicios = aux.ini;
    this.fines = aux.fin;
    this.tamaños = aux.tam;

    for (let i = 0; i < this.tamaños.length; i++) {
      if (this.tamaños[i] > this.mayor) {
        this.mayor = this.tamaños[i];
        this.mayorindice = i;
      }
    }

    // aux = inifintam(this.tipo, this.colrow, 2); //islas blancas
    // this.inicios = aux.ini;
    // this.fines = aux.fin;
    // this.tamaños = aux.tam;
  }
}
