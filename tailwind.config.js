/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        surface: '#0d1b2e',
        panel: '#10223a',
        line: 'rgba(148, 163, 184, 0.16)',
        mist: '#dce8f7',
        muted: '#8ba0ba',
        accent: '#56d4c3',
        accentWarm: '#f2b561',
      },
      fontFamily: {
        heading: ['var(--font-heading)'],
        body: ['var(--font-body)'],
      },
      boxShadow: {
        ambient:
          '0 28px 80px -28px rgba(3, 8, 20, 0.65), inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'mesh-radial':
          'radial-gradient(circle at 20% 20%, rgba(86, 212, 195, 0.2), transparent 30%), radial-gradient(circle at 80% 0%, rgba(242, 181, 97, 0.12), transparent 25%), linear-gradient(180deg, #07111f 0%, #091829 45%, #07111f 100%)',
      },
    },
  },
  plugins: [],
};
