const len = 100;

export default [
  {
    columns: {
      x: Array(len).fill().map((_, i) => i),
      y0: Array(len).fill().map((_, i) => i ** (Math.random() / 2)),
      y1: Array(len).fill().map((_, i) => Math.exp(i / 8)),
      y2: Array(len).fill().map((_, i) => i + Math.random()),
    },
    types: { y0: 'line', y1: 'line', y2: 'line', x: 'x' },
    names: { y0: 'gross', y1: 'e', y2: 'market', x: 'time' },
    colors: { y0: '#3DC23F', y1: '#F34C44', y2: '#0044FF' },
  },
];
