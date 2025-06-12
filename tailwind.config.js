module.exports = {
  content: [
    "./*.html",
    "./**/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#992F14',
        secondary: '#748189',
        accent: '#FF5722',
        redd: '#330A0A',
        background: '#FFFBF4',
        bgtab: '#FFF6EA',
        'difficulty-easy': '#4CAF50',
        'difficulty-medium': '#FFC107',
        'difficulty-hard': '#F44336',
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
    fontFamily: {
      // Ini bagian penting agar default-nya jadi Poppins
      sans: ['Poppins', 'sans-serif'],
    },
  },
  plugins: [],
}
