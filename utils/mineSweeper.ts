export default class MinesField {
  rows: FieldRow[] = [];
  ROWS: number;
  COLS: number;
  mines: number;

  constructor(rows: number, cols: number, mines: number) {
    this.mines = mines;
    this.ROWS = rows;
    this.COLS = cols;
    for (let i = 0; i < this.ROWS; i++) {
      const ceils = [];
      for (let j = 0; j < this.COLS; j++) ceils.push(new FieldCeil(0));
      this.rows.push(new FieldRow(ceils));
    }
  }

  startGame(ceil: FieldCeil) {
    console.log(this.setRandomMines);
    this?.setRandomMines(ceil);
    this?.setValues();
    this?.setAdjacent();
    ceil.open();
  }

  // Set mines after the user clicks on the first ceil
  setRandomMines(firstCeil: FieldCeil) {
    let m = this.mines;
    while (m >= 0) {
      const randomRow = Math.floor(Math.random() * this.ROWS);
      const randomCol = Math.floor(Math.random() * this.COLS);
      const ceil = this.rows?.[randomRow]?.ceils?.[randomCol];
      if (ceil.value === 0 && ceil != firstCeil) {
        ceil.value = -1;
        m--;
      }
    }
  }

  // The value of the current ceil
  setValues() {
    for (let i = 0; i < this.ROWS; i++) {
      for (let j = 0; j < this.COLS; j++) {
        if (this.rows[i].ceils[j].value === -1) continue;
        let next = 0;
        // right
        if (this.rows?.[i]?.ceils[j + 1]?.value === -1) next++;
        // left
        if (this.rows?.[i]?.ceils[j - 1]?.value === -1) next++;
        // top
        if (this.rows?.[i + 1]?.ceils[j]?.value === -1) next++;
        // topLeft
        if (this.rows?.[i + 1]?.ceils[j - 1]?.value === -1) next++;
        // topRight
        if (this.rows?.[i + 1]?.ceils[j + 1]?.value === -1) next++;
        // bottom
        if (this.rows?.[i - 1]?.ceils[j]?.value === -1) next++;
        // bottomLeft
        if (this.rows?.[i - 1]?.ceils[j - 1]?.value === -1) next++;
        // bottomRight
        if (this.rows?.[i - 1]?.ceils[j + 1]?.value === -1) next++;
        this.rows[i].ceils[j].value = next;
      }
    }
  }
  //   Set the values of the adjacent ceils
  setAdjacent() {
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.rows[i].ceils.length; j++) {
        let t: FieldCeil | undefined;
        let tr: FieldCeil | undefined;
        let tl: FieldCeil | undefined;
        let b: FieldCeil | undefined;
        let br: FieldCeil | undefined;
        let bl: FieldCeil | undefined;
        let r: FieldCeil | undefined;
        let l: FieldCeil | undefined;
        this.rows[i].ceils[j].setPosition(i, j);
        //right
        if (this.rows?.[i]?.ceils?.[j + 1]) r = this.rows?.[i]?.ceils[j + 1];
        // left
        if (this.rows?.[i]?.ceils?.[j - 1]) l = this.rows?.[i]?.ceils[j - 1];
        // top
        if (this.rows?.[i - 1]?.ceils?.[j]) t = this.rows?.[i - 1]?.ceils[j];
        // topLeft
        if (this.rows?.[i - 1]?.ceils?.[j - 1])
          tl = this.rows?.[i - 1]?.ceils[j - 1];
        // topRight
        if (this.rows?.[i - 1]?.ceils?.[j + 1])
          tr = this.rows?.[i - 1]?.ceils[j + 1];
        // bottom
        if (this.rows?.[i + 1]?.ceils?.[j]) b = this.rows?.[i + 1]?.ceils[j];
        // bottomLeft
        if (this.rows?.[i + 1]?.ceils?.[j - 1])
          bl = this.rows?.[i + 1]?.ceils[j - 1];
        // bottomRight
        if (this.rows?.[i + 1]?.ceils?.[j + 1])
          br = this.rows?.[i + 1]?.ceils?.[j + 1];

        this.rows[i].ceils[j].addAdjacent({
          t,
          tr,
          tl,
          l,
          r,
          b,
          br,
          bl,
        });
      }
    }
  }
}
export class FieldRow {
  ceils: FieldCeil[];
  constructor(ceils: FieldCeil[]) {
    this.ceils = ceils;
  }
}
export class FieldCeil {
  public value = 0;
  isOpen = false;
  row?: number;
  col?: number;
  t?: FieldCeil;
  tr?: FieldCeil;
  tl?: FieldCeil;
  b?: FieldCeil;
  bl?: FieldCeil;
  br?: FieldCeil;
  l?: FieldCeil;
  r?: FieldCeil;

  constructor(value: number) {
    this.value = value;
  }

  setPosition(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
  addAdjacent(adjacent: Adjacent) {
    const { t, tr, tl, b, bl, br, l, r } = adjacent;
    this.t = t;
    this.tr = tr;
    this.tl = tl;
    this.b = b;
    this.bl = bl;
    this.br = br;
    this.l = l;
    this.r = r;
  }

  open() {
    if (this.isOpen) return;
    this.isOpen = true;
    if (this.value !== 0) return;

    this.tr?.open();
    this.tl?.open();
    this.t?.open();
    this.r?.open();
    this.b?.open();
    this.bl?.open();
    this.br?.open();

    // this.openNear();
  }

  openNear() {
    let ceil: FieldCeil | undefined = this.l;
    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.l;
      } else break;
    }
    ceil = this.r;
    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.r;
      } else break;
    }
    ceil = this.t;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.t;
      } else break;
    }

    ceil = this.b;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.b;
      } else break;
    }

    ceil = this.tr;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.tr;
      } else break;
    }
    ceil = this.tl;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.tl;
      } else break;
    }
    ceil = this.bl;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.bl;
      } else break;
    }
    ceil = this.br;

    while (ceil) {
      if (ceil && ceil.value !== -1) {
        ceil.isOpen = true;
        ceil = ceil.br;
      } else break;
    }
  }
  close() {
    this.isOpen = false;
  }
}

type Adjacent = {
  t?: FieldCeil;
  tr?: FieldCeil;
  tl?: FieldCeil;
  b?: FieldCeil;
  bl?: FieldCeil;
  br?: FieldCeil;
  l?: FieldCeil;
  r?: FieldCeil;
};
