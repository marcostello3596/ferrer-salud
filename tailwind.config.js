/** Sistema visual "Precisión que cuida" — Ferrer Salud */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#102D40', 2: '#1A3B52', 3: '#24506C' },
        brand: { DEFAULT: '#2879AD', soft: '#DCEAF3' },
        lime: { DEFAULT: '#B7D94B', deep: '#A3C93A', soft: '#EEF6D2' },
        paper: '#F7F8F5',
        mist: '#EDF1EE',
        fog: '#E2E8E4',
        muted: '#65747B',
        line: 'rgba(16,45,64,0.12)',
        alert: '#B4532A',
      },
      fontFamily: {
        display: ['Newsreader', 'Iowan Old Style', 'Georgia', 'serif'],
        sans: ['Archivo', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: { page: '1360px' },
      borderRadius: { card: '18px' },
      boxShadow: {
        lift: '0 1px 0 rgba(16,45,64,.04), 0 18px 40px -24px rgba(16,45,64,.35)',
        drawer: '-24px 0 60px -30px rgba(16,45,64,.45)',
      },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
