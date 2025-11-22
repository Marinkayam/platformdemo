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
				sans: ['var(--font-body)', 'Studio Feixen Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
				mono: ['var(--font-mono)', 'Studio Feixen Sans', 'Inter', 'ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
				heading: ['var(--font-heading)', 'Studio Feixen Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
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
				},
				'status-success': 'hsl(var(--status-success))',
				'status-success-bg': 'hsl(var(--status-success-bg))',
				'status-error': 'hsl(var(--status-error))',
				'status-error-bg': 'hsl(var(--status-error-bg))',
				'status-warning': 'hsl(var(--status-warning))',
				'status-warning-bg': 'hsl(var(--status-warning-bg))',
				'status-info': 'hsl(var(--status-info))',
				'status-info-bg': 'hsl(var(--status-info-bg))',
				'status-neutral': 'hsl(var(--status-neutral))',
				'status-neutral-bg': 'hsl(var(--status-neutral-bg))',
				'status-processing': 'hsl(var(--status-processing))',
				'status-processing-bg': 'hsl(var(--status-processing-bg))'
			},
			fontSize: {
				'xs': ['var(--text-xs)', { lineHeight: '1.5' }],
				'sm': ['var(--text-sm)', { lineHeight: '1.5' }],
				'base': ['var(--text-base)', { lineHeight: '1.5' }],
				'lg': ['var(--text-lg)', { lineHeight: '1.5' }],
				'xl': ['var(--text-xl)', { lineHeight: '1.5' }],
				'2xl': ['var(--text-2xl)', { lineHeight: '1.3' }],
				'3xl': ['var(--text-3xl)', { lineHeight: '1.3' }],
				'4xl': ['var(--text-4xl)', { lineHeight: '1.2' }],
				'5xl': ['var(--text-5xl)', { lineHeight: '1.2' }],
				'6xl': ['var(--text-6xl)', { lineHeight: '1.1' }],
				'overline': ['0.625rem', { lineHeight: '1.2' }],
				'small-text': ['0.6875rem', { lineHeight: '1.25' }]
			},
			fontWeight: {
				light: 'var(--font-light)',
				normal: 'var(--font-normal)',
				medium: 'var(--font-medium)',
				semibold: 'var(--font-semibold)',
				bold: 'var(--font-bold)'
			},
			lineHeight: {
				tight: 'var(--leading-tight)',
				normal: 'var(--leading-normal)',
				relaxed: 'var(--leading-relaxed)'
			},
			borderRadius: {
				'xs': 'var(--radius-xs)',
				'sm': 'var(--radius-sm)',
				'DEFAULT': 'var(--radius)',
				'md': 'var(--radius-md)',
				'lg': 'var(--radius-lg)',
				'xl': 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'3xl': '1.5rem',
				'full': 'var(--radius-full)'
			},
			spacing: {
				'0': 'var(--space-0)',
				'1': 'var(--space-1)',
				'2': 'var(--space-2)',
				'3': 'var(--space-3)',
				'4': 'var(--space-4)',
				'5': 'var(--space-5)',
				'6': 'var(--space-6)',
				'8': 'var(--space-8)',
				'10': 'var(--space-10)',
				'12': 'var(--space-12)',
				'16': 'var(--space-16)',
				'20': 'var(--space-20)',
				'24': 'var(--space-24)'
			},
			boxShadow: {
				'none': 'none',
				'sm': 'var(--shadow-sm)',
				'DEFAULT': 'var(--shadow)',
				'md': 'var(--shadow-md)',
				'lg': 'var(--shadow-lg)',
				'xl': 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)'
			},
			transitionTimingFunction: {
				'in': 'var(--ease-in)',
				'out': 'var(--ease-out)',
				'in-out': 'var(--ease-in-out)'
			},
			transitionDuration: {
				'fast': 'var(--duration-fast)',
				'normal': 'var(--duration-normal)',
				'slow': 'var(--duration-slow)'
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
