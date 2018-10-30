// jshint esversion: 6
class Data {
  constructor(escala, i, j, k, value) {
    this.escala = escala; //
    this.i = i; //0 = columna, 1 = fila
    this.j = j; //nro de columna o fila
    this.k = k; //posicion dentro de data (0 comienza arriba o a la izquierda)
    this.value = value; //Valor (nro) de la casilla de data
    this.completado = 0; //Para pintar con verde los que ya terminé o
    //con rojo si hay error (por defecto empieza gris xq no esta completado)
    if (this.i) { //si entra es un dato de las filas (va a la izq de la pintura)
      let diff = data[this.i][this.j].length - this.k;
      this.x = (mayorrow - diff) * this.escala;
      this.y = offsety + this.escala * this.j;
    } else { //si entra aca va arriba de la pintura
      this.x = offsetx + this.escala * this.j;
      let diff = data[this.i][this.j].length - this.k;
      this.y = (mayorcol - diff) * this.escala;
    }
  }

  show() { //mostrar los datos de la pintura
    if (this.completado == 0) //sin completar ni con errores
      fill(0);
    else if (this.completado == 1) //completado
      fill(0, 255, 0);
    else if (this.completado == 2) //error
      fill(255, 0, 0);
    stroke(255);
    rect(this.x, this.y, this.escala, this.escala);
    fill(255);
    textSize(this.escala * 0.5);
    textAlign(CENTER, CENTER);
    text(this.value, this.x + this.escala / 2, this.y + this.escala / 2);
  }
}
