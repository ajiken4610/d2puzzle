export enum GridState {
  X = -1,
  NONE,
  O,
}

function* RowIterator(
  puzzle: PuzzleData,
  data: GridState[],
  dimLength: number[],
  axis: number
) {
  const dimLengthNoAxis = dimLength.slice();
  dimLengthNoAxis.splice(axis, 1);
  const loopCount = data.length / dimLength[axis];
  for (var i = 0; i < loopCount; i++) {
    const ret = Array(dimLength[axis]);
    const query = Array(dimLengthNoAxis.length);
    let reminder = i;
    for (var k = 0; k < dimLengthNoAxis.length; k++) {
      const currentReminder = reminder % dimLengthNoAxis[k];
      reminder = (reminder - currentReminder) / dimLengthNoAxis[k];
      query[k] = currentReminder;
    }
    query.splice(axis, 0, 0);
    for (var j = 0; j < dimLength[axis]; j++) {
      query[axis] = j;
      ret[j] = puzzle.getAt(...query);
    }
    yield ret;
  }
}

export class PuzzleData {
  data: GridState[];
  dimLength: number[];
  rowNumbers: number[][][];
  constructor(...dimLength: number[]) {
    this.data = Array(dimLength.reduce((mul, val) => mul * val));
    this.data.fill(0);
    // デバッグ用
    //this.data = this.data.map((_, index) => index);
    this.dimLength = dimLength;
    this.rowNumbers = Array(dimLength.length);
    for (var i = 0; i < dimLength.length; i++) {
      this.rowNumbers[i] = Array(this.data.length / dimLength[i]);
      this.rowNumbers[i].fill([]);
    }
  }
  getIndexAt(...coord: number[]) {
    let index = 0;
    let mul = 1;
    for (var i = 0; i < this.dimLength.length; i++) {
      //console.log(coord[i]);
      index += coord[i] * mul;
      mul *= this.dimLength[i];
    }
    return index;
  }
  getAt(...coord: number[]) {
    return this.data[this.getIndexAt(...coord)];
  }
  setAt(val: GridState, ...coord: number[]) {
    this.data[this.getIndexAt(...coord)] = val;
  }
  getRows(axis = 0) {
    return RowIterator(this, this.data, this.dimLength, axis);
  }
  setRowNumberAt(val: number[], axis: number, ...coord: number[]) {
    const dimLengthNoAxis = this.dimLength.slice();
    dimLengthNoAxis.splice(axis, 1);
    let index = 0;
    let mul = 1;
    for (var i = 0; i < dimLengthNoAxis.length; i++) {
      //console.log(coord[i]);
      index += coord[i] * mul;
      mul *= dimLengthNoAxis[i];
    }
    this.rowNumbers[axis][index] = val;
  }
}

export interface BlockSpan {
  length: number;
  end: number;
}

export class PuzzleSolver {}
