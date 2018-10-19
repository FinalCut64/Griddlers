// jshint esversion: 6
function iniciar() {
  imagen = dat.img;
  let selec = 0;
  let pos = 0;
  let cant = 0;
  let pycoma = 0;
  let flag = 0;

  //obtener la cant de columnas y filas de la imagen y almacenarlas en cols y rows respectivamente
  for (let i = 0; i < imagen.length; i++) {
    if (imagen[i] === ';' || pycoma) {
      pycoma = 1;
      if (imagen[i] === ',') {
        rows += 1;
      }
    } else if (imagen[i] === ',') {
      cols += 1;
    }
  }

  /////////////////////////////////////
  data[0] = []; //crear la primera dimension de la estructura data [2][cols/rows][cant de datos]
  data[1] = [];
  for (let i = 0; i < cols; i++) {
    data[0][i] = [];
  }

  for (let j = 0; j < rows; j++) {
    data[1][j] = [];
  }

  //leer toda la imagen y volcarla en la estroctura data[][][]que recién armé
  for (let i = 0; i < imagen.length; i++) {
    if (imagen[i] === ' ') {
      cant += 1;
      flag = 0;
    } else if (imagen[i] === ',') {
      pos += 1;
      cant = 0;
      flag = 0;
    } else if (imagen[i] === ';') {
      selec = 1;
      pos = 0;
      cant = 0;
      flag = 0;
    } else { //acá entra solo si es un número el q se leyó
      if (flag) { //si llegan dos nros seguidos
        data[selec][pos][cant] = int(data[selec][pos][cant]) * 10 + int(imagen[i]);
        flag = 0;
      } else {
        data[selec][pos][cant] = int(imagen[i]);
        flag = 1;
      }
    }
  }

  ///////////////////////////////////////////////////////////////////////
  //ahora quiero crear dinámicamente los números q estan almacenados en data
  for (let i = 0; i < data[0].length; i++) {
    mayorcol = max(mayorcol, data[0][i].length);
  }

  for (let i = 0; i < data[1].length; i++) {
    mayorrow = max(mayorrow, data[1][i].length);
  }

  //auto ajustar el tamaño de las casillas a la ventana según la cant de columnas y filas
  escala = min(width / (cols + mayorrow), height / (rows + mayorcol)) * 0.9;
  offsetx = mayorrow * escala;
  offsety = mayorcol * escala;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      for (let k = 0; k < data[i][j].length; k++) {
        data[i][j][k] = new Data(escala, i, j, k, data[i][j][k]);
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////
  //crear el tablero con todas las casillas inicialmente en gris
  for (let i = 0; i < cols; i++) {
    pic[i] = [];
    for (let j = 0; j < rows; j++) {
      pic[i][j] = new Casilla(escala, i, j);
    }
  }

  ////////////////////////////////////////////////////////////////////////

}
