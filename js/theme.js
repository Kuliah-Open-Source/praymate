// Theme Management untuk PrayMate
(function() {
  'use strict';

  // Apply saved theme on page load
  function applySavedTheme() {
    const theme = localStorage.getItem('praymate_theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('theme-dark');
      updateThemeIcon(true);
    } else {
      document.documentElement.classList.remove('theme-dark');
      updateThemeIcon(false);
    }
  }

  // Toggle theme
  function toggleTheme() {
    document.documentElement.classList.toggle('theme-dark');
    const isDark = document.documentElement.classList.contains('theme-dark');
    localStorage.setItem('praymate_theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark);
  }

  // Update icon
  function updateThemeIcon(isDark) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.textContent = isDark ? '☀️' : '🌙';
    }
  }

  // Init function
  function init() {
    // Update icon based on current theme (already applied by inline script)
    const isDark = document.documentElement.classList.contains('theme-dark');
    updateThemeIcon(isDark);
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        toggleTheme();
      });
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
