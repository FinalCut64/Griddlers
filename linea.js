// jshint esversion: 6
class Linea {
  constructor(tipo, colrow, cant) {
    this.tipo = tipo; //0 = gris, 1 = negra, 2 = blanca
    this.colrow = colrow; //De 0 a cols-1 o rows-1
    this.cant = cant; //cantidad de islas negras
    this.inicios = []; //referidos a islas negras
    this.fines = [];
    this.tamaños = [];
    this.ordenados = []; //de mayor a menor
    this.mayor = -1; //inicio con un valor imposible
    this.mayorindice = -1;
  }

  completar() {
    let aux = inifintam(this.tipo, this.colrow, 1); //islas negras
    let aux2 = inifintam(this.tipo, this.colrow, 1); //increible pero parece q tengo
    //q crear otro aux2 para poder hacer sort sin modificar aux.tam y this.tamaños

    this.inicios = aux.ini;
    this.fines = aux.fin;
    this.tamaños = aux.tam;

    this.ordenados = aux2.tam; //uso el aux2 para no modificar aux ni this.tamaños
    this.ordenados.sort(function(a, b) {
      return b - a; //de mayor a menor
    });

    for (let i = 0; i < this.tamaños.length; i++) {
      if (this.tamaños[i] > this.mayor) {
        this.mayor = this.tamaños[i];
        this.mayorindice = i;
      }
    }
  }
}
