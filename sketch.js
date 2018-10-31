// jshint esversion: 6
let imagen = [];
let dat;
let pic = [];
let cols = 1;
let rows = 1;
let escala;
let data = [];
let offsetx;
let offsety;
let mayorcol = 0;
let mayorrow = 0;
let ultima = 0;

function preload() {
  dat = loadJSON('imagenes.json');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
  iniciar();
}

function draw() {
  background(250);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      pic[i][j].show(); //i es la coordenada x en la grilla y j es la y
    }
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      for (let k = 0; k < data[i][j].length; k++) {
        data[i][j][k].show();
      }
    }
  }

  if (terminamos()) {
    if (ultima)
      noLoop();
    ultima = true;
  }

  resolver();
}

function mousePressed() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      pic[i][j].clicked();
    }
  }

  // prevent default
  return false;
}

function resolver() {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      for (let k = 0; k < data[i][j].length; k++) {
        datasimple(i, j, k);

        //espaciosblancos();
      }

      if (analizalinea(i, j) == 1) {
        llenarblancas(i, j);
      }

    }
  }
}

function keyPressed() {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      let linea = listalinea(i, j);
      for (let k = 0; k < linea.cant; k++) {
        let result = isislacompleta(linea, k);
        delimitaisla(linea, k);
      }
      // let dt = datatoarray(data[i][j]);
      // dt = sortarray(dt);
      // for (let k = 0; k < linea.cant; k++) {
      //   if (linea.ordenados[k] == dt[k]) {
      //   }
      // }
    }
  }
}

//coloca en blanco las casillas que delimitan una isla completa
function delimitaisla(linea, indice) {
  let ini = linea.inicios[indice] - 1; //casilla previa a inicio de isla
  let fin = linea.fines[indice] + 1; //casilla posterior a fin de isla
  //primero chequeamos si la isla esta pegada a los bordes
  if (linea.tipo) { //tipo fila
    if (ini < 0 && fin >= cols) //se da solo si es una linea llena de casillas negras
      return; //nada que hacer
    if (ini < 0) { //isla contra el borde inferior (completa por inicio)
      pic[fin][linea.colrow].tipo = 2; //pongo en blanco casilla fin
      return;
    }
    if (fin >= cols) { //isla contra el borde superior (completa por fin)
      pic[ini][linea.colrow].tipo = 2; //pongo en blanco casilla ini
      return;
    }
  }else { //tipo columna
    if (ini < 0 && fin >= rows) //se da solo si es una linea llena de casillas negras
      return; //nada que hacer
    if (ini < 0) { //isla contra el borde inferior (completa por inicio)
      pic[linea.colrow][fin].tipo = 2; //pongo en blanco casilla fin
      return;
    }
    if (fin >= rows) { //isla contra el borde superior (completa por fin)
      pic[linea.colrow][ini].tipo = 2; //pongo en blanco casilla ini
      return;
    }
  }

  //aca la isla no está rodeada por ningun borde. Puedo completar sin problemas
  //tanto la casilla ini como fin
  if (linea.tipo) {
    pic[ini][linea.colrow].tipo = 2; //pongo en blanco casilla ini
    pic[fin][linea.colrow].tipo = 2; //pongo en blanco casilla fin
  }else {
    pic[linea.colrow][ini].tipo = 2;
    pic[linea.colrow][fin].tipo = 2;
  }
}

//recibe un objeto linea y la posicion de la isla a considerar
//devuelve 0 si la isla esta incompleta por ambos extremos, 1 si esta completa
//2 si esta completa por inicio y 3 si esta completa por fin
function isislacompleta(linea, indice) {
  let ini = linea.inicios[indice] - 1; //casilla previa a inicio de isla
  let fin = linea.fines[indice] + 1; //casilla posterior a fin de isla
  //primero chequeamos si la isla esta pegada a los bordes
  if (linea.tipo) { //tipo fila
    if (ini < 0 && fin >= cols) //se da solo si es una linea llena de casillas negras
      return 1;
    if (ini < 0) //isla contra el borde inferior (completa por inicio)
      return 2;
    if (fin >= cols) //isla contra el borde superior (completa por fin)
      return 3;
  }else { //tipo columna
    if (ini < 0 && fin >= rows)
      return 1;
    if (ini < 0)
      return 2;
    if (fin >= rows)
      return 3;
  }

  //aca sabemos que la isla no esta pegada a un borde
  if (linea.tipo) { //tipo fila
    if (pic[ini][linea.colrow].tipo != 2 && pic[fin][linea.colrow].tipo != 2)
      return 0;
    if (pic[ini][linea.colrow].tipo == 2 && pic[fin][linea.colrow].tipo == 2)
      return 1;
    if (pic[ini][linea.colrow].tipo == 2 && pic[fin][linea.colrow].tipo != 2)
      return 2;
    if (pic[ini][linea.colrow].tipo != 2 && pic[fin][linea.colrow].tipo == 2)
      return 3;
  }else { //tipo columna
    if (pic[linea.colrow][ini].tipo != 2 && pic[linea.colrow][fin].tipo != 2)
      return 0;
    if (pic[linea.colrow][ini].tipo == 2 && pic[linea.colrow][fin].tipo == 2)
      return 1;
    if (pic[linea.colrow][ini].tipo == 2 && pic[linea.colrow][fin].tipo != 2)
      return 2;
    if (pic[linea.colrow][ini].tipo != 2 && pic[linea.colrow][fin].tipo == 2)
      return 3;
  }
}

//convierte el objeto data de una linea en un array
function datatoarray(dataobj) {
  let array = [dataobj.length];
  for (let k = 0; k < dataobj.length; k++) {
    array[k] = dataobj[k].value;
  }
  return array;
}

//ordena de mayor a menor los elementos de un array
function sortarray(array) {
  array.sort(function(a, b) {
    return b - a; //de mayor a menor
  });
  return array;
}

//llena toda la linea de casillas blancas excepto las que estan pintadas negras
function llenarblancas(a, colrow) {
  if (a) { //x fila
    for (let i = 0; i < cols; i++) {
      if (pic[i][colrow].tipo == 0)
        pic[i][colrow].tipo = 2;
    }
  } else { //por columna
    for (let i = 0; i < rows; i++) {
      if (pic[colrow][i].tipo == 0)
        pic[colrow][i].tipo = 2;
    }
  }
}

function datasimple(i, j, k) {
  let count1 = 0;
  let count2;
  if (i) {
    count2 = cols - 1;
  } else {
    count2 = rows - 1;
  }

  for (let z = 0; z < k; z++) {
    count1 += data[i][j][z].value;
    count1 += 1; //espacio en blanco obligatorio entre 2 bloques
  }

  for (let z = data[i][j].length - 1; z > k; z--) {
    count2 -= data[i][j][z].value;
    count2 -= 1; //espacio en blanco obligatorio entre 2 bloques
  }

  //chequear superposición
  let aux1 = [];
  let aux2 = [];
  if (i) {
    for (let z = 0; z < cols; z++) {
      aux1[z] = 0;
      aux2[z] = 0;
    }
  } else {
    for (let z = 0; z < rows; z++) {
      aux1[z] = 0;
      aux2[z] = 0;
    }
  }

  for (let z = count1; z < count1 + data[i][j][k].value; z++) {
    aux1[z] = 1;
  }

  for (let z = count2; z > count2 - data[i][j][k].value; z--) {
    aux2[z] = 1;
  }

  for (let z = 0; z < aux1.length; z++) {
    if (aux1[z] && aux2[z]) {
      if (i) {
        pic[z][j].tipo = 1;
      } else {
        pic[j][z].tipo = 1;
      }
    }
  }
}

//indica si se terminó de resolver la pintura, por lo que no hay nada más que hacer
function terminamos() {
  let terminado = true; //asumimos que hemos terminado
  for (let i = 0; i < rows; i++) {
    if (analizalinea(1, i) != 1) { //si una fila falta completar (o tiene error) no hemos terminado
      terminado = false;
    }
  }

  for (let j = 0; j < cols; j++) {
    if (analizalinea(0, j) != 1) { //si una col falta completar (o tiene error) no hemos terminado
      terminado = false;
    }
  }

  return terminado; //si completamos todas las filas y columnas entonces terminamos
}

//indica si la linea actual ya se completó o tiene algun error
//0=incompleta, 1=completa, 2=error
function analizalinea(a, colrow) {
  let total = 0; //cant de casillas que se deben pintar según data[][][]
  let pintadas = 0;

  for (let i = 0; i < data[a][colrow].length; i++) {
    total += data[a][colrow][i].value;
  }

  pintadas = cantnegrasinline(a, colrow); //cant de casillas pintadas hasta ahora en la linea
  if (pintadas < total) { //si hay menos pintadas q en data entonces no está completa
    actualizacolordata(a, colrow, 0); //que cambie los valores para pintar casillas de data
    return 0;	//linea incompleta
  }

  if (pintadas > total) { //si hay mas pintadas q en data entonces hay error
    actualizacolordata(a, colrow, 2);
    return 2;	//error
  }

  if (pintadas == total) { //si se cumple entonces analizamos bien la linea
    if (cantislas(a, colrow, 1) != data[a][colrow].length) { //es correcta la cant de islas?
      actualizacolordata(a, colrow, 2);
      return 2; //error
    }

    //ahora se que la cant de islas es correcta, falta ver si el orden está bien
    if (pintadas != 0) { //me aseguro q haya al menos una isla pintada, sino ya está
      let linea = listalinea(a, colrow);
      for (let i = 0; i < data[a][colrow].length; i++) {
        if (linea.tamaños[i] != data[a][colrow][i].value) { //si un tamaño de isla no es = que data
          actualizacolordata(a, colrow, 2); //error
          return 2;
        }
      }
    }



    //si se llega aca, la linea esta completa
    actualizacolordata(a, colrow, 1);
    return 1;
  }
}

//a=0 para col, a=1 para fila, estado=0 incompleto, =1 completo, =2 error
function actualizacolordata(a, colrow, estado) {
  for (let i = 0; i < data[a][colrow].length; i++) {
    data[a][colrow][i].completado = estado; //cambia el estado de completado
  }
}

//devuelve arrays (en un objeto) inicio fin y tamaño de islas en la linea especificada por colrow
//y del color especificado por colr 0=gris; 1=negro; 2=blanco. a=0 x cols; a=1 x filas
function inifintam(a, colrow, colr) {
  let cant = cantislas(a, colrow, colr); //obtengo la cant de islas total
  if (cant == 0) { //si no hay islas en la linea retornamos 0
    return 0;
  }

  let estruct = {
    ini: [cant], //inicializo los arreglos con tantos indices como cant de islas
    fin: [cant],
    tam: [cant],
  };
  let mark = 0;
  let indice = 0;
  if (a) {
    for (let i = 0; i < cols; i += indice) {
      indice = tamañoisla(a, colrow, i, colr);
      if (indice) {
        estruct.ini[mark] = i;
        estruct.fin[mark] = i + indice - 1;
        estruct.tam[mark] = indice;
        mark++;
      } else { //si no había isla paso a la siguiente
        indice = 1;
      }
    }
  } else {
    for (let i = 0; i < rows; i += indice) {
      indice = tamañoisla(a, colrow, i, colr);
      if (indice) {
        estruct.ini[mark] = i;
        estruct.fin[mark] = i + indice - 1;
        estruct.tam[mark] = indice;
        mark++;
      } else { //si no había isla paso a la siguiente
        indice = 1;
      }
    }
  }

  return estruct;
}

//devuelve la cantidad de islas que hay en la columna (a=0) o fila (a=1) especificada
//y con el color especificado colr 0=gris, 1=negro, 2=blanco
function cantislas(a, colrow, colr) {
  let cant = 0;
  let indice = 0;

  if (a) { //miro filas
    for (let i = 0; i < cols; i += indice) {
      indice = tamañoisla(a, colrow, i, colr);
      if (indice) {
        cant++;
      } else {
        indice = 1;
      }
    }
  } else { //columnas
    for (let i = 0; i < rows; i += indice) {
      indice = tamañoisla(a, colrow, i, colr);
      if (indice) {
        cant++;
      } else {
        indice = 1;
      }
    }
  }

  return cant;
}

//devuelve el tamaño de la isla pintada gris (colr=0), negra (colr=1)
//o blanca (colr=2) en la colrow especificada
//y posición (indice) dada. a=0 x columnas y a=1 x filas
function tamañoisla(a, colrow, indice, colr) {
  let cant = 0;
  if (a) { //indice va entre 0 y (cols - 1), colrow va entre 0 y (rows - 1)
    if (pic[indice][colrow].tipo != colr)
      return cant; //si la casilla no está pintada de negro la isla es de tamaño 0
    for (let i = indice; i < cols; i++) {
      if (pic[i][colrow].tipo == colr) {
        cant++;  //si la casilla está pintada del color que me interesa incremento el contador
      } else { //si no, ya terminé de buscar en esta direccion
        break;
      }
    }

    for (let i = indice - 1; i >= 0; i--) { //miro las casillas en la otra direccion
      if (pic[i][colrow].tipo == colr) {
        cant++;
      } else {
        break;
      }
    }
  } else {  //colrow va entre 0 y (cols - 1), indice va entre 0 y (rows - 1)
    if (pic[colrow][indice].tipo != colr)
      return cant;
    for (let i = indice; i < rows; i++) {
      if (pic[colrow][i].tipo == colr) {
        cant++;
      } else { //si no, ya terminé de buscar en esta direccion
        break;
      }
    }

    for (let i = indice - 1; i >= 0; i--) { //miro las casillas en la otra direccion
      if (pic[colrow][i].tipo == colr) {
        cant++;
      } else {
        break;
      }
    }
  }

  return cant;
}

//devuelve la cantidad total de casillas ya marcadas como negras en la
//linea indicada por colrow. a=0 columna, a=1 fila
function cantnegrasinline(a, colrow) {
  let cant = 0;
  if (a) {
    for (let i = 0; i < cols; i++) {
      if (pic[i][colrow].tipo == 1)
        cant++;
    }
  } else {
    for (let i = 0; i < rows; i++) {
      if (pic[colrow][i].tipo == 1)
        cant++;
    }
  }

  return cant;
}

//devuelve la cantidad total de casillas ya marcadas como blancas en la
//linea indicada por colrow. a=0 columna, a=1 fila
function cantblancasinline(a, colrow) {
  let cant = 0;
  if (a) {
    for (let i = 0; i < cols; i++) {
      if (pic[i][colrow].tipo == 2)
        cant++;
    }
  } else {
    for (let i = 0; i < rows; i++) {
      if (pic[colrow][i].tipo == 2)
        cant++;
    }
  }

  return cant;
}
