import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Studio Feixen Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['Studio Feixen Sans', 'Inter', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace']
			},
			colors: {
				'primary-lighter': '#EFEBFF',
				'primary-light': '#BEADFF',
				'primary-main': '#7B59FF',
				'primary-dark': '#523BAA',
				'primary-darker': '#291E55',
				'primary-contrast-text': '#FFFFFF',
				'secondary-lighter': '#E6E7EB',
				'secondary-light': '#6F768B',
				'secondary-main': '#1D153B',
				'secondary-dark': '#181231',
				'secondary-darker': '#0A0714',
				'secondary-contrast-text': '#FFFFFF',
				'grey-0': '#FFFFFF',
				'grey-100': '#707C87',
				'grey-200': '#F4F6F8',
				'grey-300': '#F1F1F3',
				'grey-400': '#E6E7EB',
				'grey-500': '#8C94A9',
				'grey-600': '#818799',
				'grey-700': '#586079',
				'grey-800': '#38415F',
				'grey-900': '#061237',
				'info-main': '#375DFB',
				'success-main': '#007737',
				'warning-main': '#F2AE40',
				'error-main': '#DF1C41',
				'background-default': '#F4F6F8',
				'background-paper': '#FFFFFF',
				'divider': 'rgba(140, 148, 169, 0.2)',
				'monto-purple': '#7B59FF',
				'modal-overlay': 'rgba(1, 23, 62, 0.25)',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#7B59FF',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontSize: {
				'overline': ['0.625rem', { 'lineHeight': '1.2' }],
				'small-text': ['0.6875rem', { 'lineHeight': '1.25' }]
			},
			borderRadius: {
				'xs': '0.125rem',
				'sm': '0.25rem',
				'DEFAULT': '0.375rem',
				'lg': '0.5rem',
				'xl': '0.75rem',
				'2xl': '1rem',
				'3xl': '1.5rem',
				'full': '9999px',
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			spacing: {
				'1': '0.25rem',
				'2': '0.5rem',
				'4': '1rem',
				'6': '1.5rem',
				'8': '2rem',
				'10': '2.5rem',
				'12': '3rem',
				'16': '4rem',
				'20': '5rem',
				'24': '6rem'
			},
			boxShadow: {
				'none': 'none'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
