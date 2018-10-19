// jshint esversion: 6
class Casilla {
  constructor(escala, col, row) {
    this.escala = escala;
    this.col = col;
    this.row = row;
    this.x = offsetx + this.col * this.escala;
    this.y = offsety + this.row * this.escala;
    this.tipo = 0; //inicio todas las casillas en el estado de desconocido
  }

  show() {
    if (this.tipo == 0) { // si no se sabe nada de la casilla se deja en color gris neutro
      fill(150);
    } else if (this.tipo == 1) { //tipo 1 es que se sabe que hay q pintarla
      fill(0);
    } else if (this.tipo == 2) { //tipo 2 es q se sabe que es blanca
      fill(255);
    }

    stroke(0);
    rect(this.x, this.y, this.escala, this.escala);
  }

  clicked() { //si se clickeó dentro de la casilla
    if (mouseX > this.x && mouseX < this.x + this.escala &&
      mouseY > this.y && mouseY < this.y + this.escala) {
      if (mouseButton === LEFT) {
        this.tipo = 1;
      }

      if (mouseButton === RIGHT) {
        this.tipo = 2;
      }

      if (mouseButton === CENTER) {
        this.tipo = 0;
      }
    }
  }
}
