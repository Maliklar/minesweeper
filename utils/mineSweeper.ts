export default class MinesField {
  rows: FieldRow[] = [];
  array: Array<Array<number>>;

  create(min: MinesField) {
    return new MinesField(min.array.length, min.array[0].length, 20);
  }
  constructor(r: number, c: number, mines: number) {
    this.array = [];
    let m = mines;

    for (let i = 0; i < r; i++) {
      const row = [];
      for (let j = 0; j < c; j++) {
        let random = Math.random() < 0.14;
        let ceil = 0;
        if (random && m > 0) {
          m--;
          ceil = -1;
        }
        row.push(ceil);
      }
      this.array.push(row);
    }

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (this.array[i][j] === -1) continue;
        let next = 0;
        // right
        if (this.array?.[i]?.[j + 1] === -1) next++;
        // left
        if (this.array?.[i]?.[j - 1] === -1) next++;
        // top
        if (this.array?.[i + 1]?.[j] === -1) next++;
        // topLeft
        if (this.array?.[i + 1]?.[j - 1] === -1) next++;
        // topRight
        if (this.array?.[i + 1]?.[j + 1] === -1) next++;
        // bottom
        if (this.array?.[i - 1]?.[j] === -1) next++;
        // bottomLeft
        if (this.array?.[i - 1]?.[j - 1] === -1) next++;
        // bottomRight
        if (this.array?.[i - 1]?.[j + 1] === -1) next++;
        this.array[i][j] = next;
      }
    }

    for (let i = 0; i < this.array.length; i++) {
      const ceils = [];
      for (let j = 0; j < this.array[i].length; j++) {
        ceils.push(new FieldCeil(this.array[i][j]));
      }
      this.rows.push(new FieldRow(ceils));
    }

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

  print() {
    let s = "";
    for (let i = 0; i < this.array.length; i++) {
      s += "\n";
      for (let j = 0; j < this.array[i].length; j++) {
        if (this.array[i][j] >= 0) {
          s += " " + this.array[i][j] + " ";
        } else s += this.array[i][j] + " ";
      }
    }
    console.log(s);
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
