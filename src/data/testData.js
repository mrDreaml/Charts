const len = 200;

export default {
  columns: {
    x: Array(len).fill().map((_, i) => i),
    y0: Array(len).fill().map((_, i) => i * Math.random()),
    y1: Array(len).fill().map((_, i) => i * 2 * Math.random()),
    y2: Array(len).fill().map((_, i) => i + Math.random()),
  },
  types: {
    y0: 'line', y1: 'line', y2: 'line', x: 'x',
  },
  names: {
    y0: 'gross', y1: 'gross cost 2', y2: 'market', x: 'time',
  },
  colors: {y0: '#3DC23F', y1: '#F34C44', y2: '#004E00'},
};
