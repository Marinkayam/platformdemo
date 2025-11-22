/**
 * Theme Export Utilities
 * 
 * Functions to export the Monto Design System theme in various formats
 * for use in Lovable Theme Maker, documentation, or other tools.
 */

import { MontoTheme } from './theme-tokens';

/**
 * Export theme as CSS custom properties
 */
export function exportThemeAsCSS(): string {
  return `/* Monto Design System Theme - Light Mode */
:root {
  /* Primary Colors */
  --primary: 258 100% 68%;
  --primary-foreground: 0 0% 100%;
  
  /* Secondary Colors */
  --secondary: 256 45% 16%;
  --secondary-foreground: 0 0% 100%;
  
  /* Background & Surfaces */
  --background: 210 20% 96%;
  --foreground: 240 80% 10%;
  --card: 0 0% 100%;
  --card-foreground: 240 80% 10%;
  
  /* Muted & Accent */
  --muted: 220 14% 96%;
  --muted-foreground: 237 14% 54%;
  --accent: 258 100% 95%;
  --accent-foreground: 258 100% 68%;
  
  /* Borders & Inputs */
  --border: 237 20% 88%;
  --input: 237 20% 88%;
  --ring: 258 100% 68%;
  
  /* Semantic Colors */
  --destructive: 351 89% 50%;
  --success: 147 100% 22%;
  --warning: 36 91% 60%;
  --info: 224 89% 60%;
  
  /* Border Radius */
  --radius: 0.375rem;
}

/* Dark Mode */
.dark {
  --background: 256 45% 8%;
  --foreground: 0 0% 98%;
  --card: 256 45% 12%;
  --card-foreground: 0 0% 98%;
  --muted: 237 14% 15%;
  --muted-foreground: 237 14% 64%;
  --accent: 258 100% 20%;
  --accent-foreground: 258 100% 80%;
  --border: 237 14% 20%;
  --input: 237 14% 20%;
}`;
}

/**
 * Export theme as Tailwind config snippet
 */
export function exportThemeAsTailwind(): string {
  return `// Monto Design System - Tailwind Config
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7B59FF',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        // ... add other colors
      },
      fontFamily: {
        sans: ['Studio Feixen Sans', 'Inter', 'sans-serif'],
        heading: ['Studio Feixen Sans', 'Inter', 'sans-serif']
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  }
}`;
}

/**
 * Export theme as JSON configuration
 */
export function exportThemeAsJSON(): string {
  return JSON.stringify(MontoTheme, null, 2);
}

/**
 * Export complete theme package with all formats
 */
export function exportCompleteTheme() {
  return {
    css: exportThemeAsCSS(),
    tailwind: exportThemeAsTailwind(),
    json: exportThemeAsJSON(),
    tokens: MontoTheme
  };
}

/**
 * Download theme as file
 */
export function downloadTheme(format: 'css' | 'tailwind' | 'json' = 'css') {
  let content = '';
  let filename = '';
  let mimeType = '';

  switch (format) {
    case 'css':
      content = exportThemeAsCSS();
      filename = 'monto-theme.css';
      mimeType = 'text/css';
      break;
    case 'tailwind':
      content = exportThemeAsTailwind();
      filename = 'monto-tailwind.config.ts';
      mimeType = 'text/typescript';
      break;
    case 'json':
      content = exportThemeAsJSON();
      filename = 'monto-theme.json';
      mimeType = 'application/json';
      break;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Copy theme to clipboard
 */
export async function copyThemeToClipboard(format: 'css' | 'tailwind' | 'json' = 'css') {
  let content = '';

  switch (format) {
    case 'css':
      content = exportThemeAsCSS();
      break;
    case 'tailwind':
      content = exportThemeAsTailwind();
      break;
    case 'json':
      content = exportThemeAsJSON();
      break;
  }

  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (error) {
    console.error('Failed to copy theme to clipboard:', error);
    return false;
  }
}
