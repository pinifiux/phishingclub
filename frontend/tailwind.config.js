/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				phudu: ['Phudu', 'sans-serif'],
				titilium: ['Titillium Web', 'sans-serif']
			},
			colors: {
				overlay: 'rgb(10 10 12 / <alpha-value>)',
				// Dasenda surface/content ramp, replacing Tailwind's default gray
				// scale — the single highest-leverage change for the app's overall
				// look: gray-50..950 covers ~2000 class usages across every panel,
				// border and text color in this codebase. One monotonic ramp serves
				// both modes the same way the original scale did — direction (light
				// vs dark class), not which mode is active, decides which end reads.
				gray: {
					50: '#F3F4F6',
					100: '#EEF0F2',
					200: '#CBD1D4',
					300: '#A3A8AD',
					400: '#8B9196',
					500: '#5A5F66',
					600: '#33353A',
					700: '#1C1D20',
					800: '#121213',
					900: '#070809',
					950: '#050607'
				},
				// slate is used almost as heavily as gray in this codebase (199
				// usages) for the same neutral surface/border/text role — same ramp,
				// so it doesn't clash against the now-teal-tinted gray scale above.
				slate: {
					50: '#F3F4F6',
					100: '#EEF0F2',
					200: '#CBD1D4',
					300: '#A3A8AD',
					400: '#8B9196',
					500: '#5A5F66',
					600: '#33353A',
					700: '#1C1D20',
					800: '#121213',
					900: '#070809',
					950: '#050607'
				},
				// Tailwind's default blue scale, replaced the same way as gray above —
				// this is the actual dominant primary/CTA/link color in the markup
				// (289 raw blue-NNN usages, far more than the semantic cta-blue name).
				blue: {
					50: 'rgb(var(--pc-blue-50) / <alpha-value>)',
					100: 'rgb(var(--pc-blue-100) / <alpha-value>)',
					200: 'rgb(var(--pc-blue-200) / <alpha-value>)',
					300: 'rgb(var(--pc-blue-300) / <alpha-value>)',
					400: 'rgb(var(--pc-blue-400) / <alpha-value>)',
					500: 'rgb(var(--pc-blue-500) / <alpha-value>)',
					600: 'rgb(var(--pc-blue-600) / <alpha-value>)',
					700: 'rgb(var(--pc-blue-700) / <alpha-value>)',
					800: 'rgb(var(--pc-blue-800) / <alpha-value>)',
					900: 'rgb(var(--pc-blue-900) / <alpha-value>)'
				},
				// Dasenda brand accent (app.css defines --pc-accent* and swaps it per
				// html.dark) — consolidates what were three upstream brand hues
				// (pink/purple used as primary CTA colors) into Dasenda's one accent.
				'pc-pink': 'rgb(var(--pc-accent) / <alpha-value>)',
				'pc-pink-hover': 'rgb(var(--pc-accent-hover) / <alpha-value>)',
				'pc-purple': 'rgb(var(--pc-accent) / <alpha-value>)',
				'devil-gray': '#666',
				'half-devil-gray': '#333',
				'pc-red': '#f6287b',
				'message-red': '#fcd6eb',
				'pleasant-gray': '#f8f8ff',
				'grayblue-light': '#ebeaf9',
				'grayblue-dark': '#9a9ab7',
				// Also consolidated into the Dasenda accent — same reasoning as
				// pc-pink/pc-purple above (primary CTA / selected-state colors).
				'cta-blue': 'rgb(var(--pc-accent) / <alpha-value>)',
				'active-blue': 'rgb(var(--pc-accent-active) / <alpha-value>)',
				'highlight-blue': 'rgb(var(--pc-accent-hover) / <alpha-value>)',
				'cta-green': '#5dd8c4',
				'cta-light-blue': '#d4d4ff',
				'cta-orange': '#f9a66e',
				'cta-orange2': '#f98246',
				'pc-darkblue': '#0b2063',
				'pc-lightblue': '#ddddff',
				'pc-green': '#5dd8c4ff',
				'pc-dusty-light-blue': '#819efb',
				scheduled: '#e756f6',
				'recipient-scheduled': '#4e68d8',
				'failed-sending': '#f2bb58',
				cancelled: '#161692',
				'message-sent': '#94cae6',
				'message-read': '#4cb5b5',
				'evasion-page-visited': '#c8a2f0',
				'before-page-visited': '#eea5fa',
				'page-visited': '#f96dcf',
				'after-page-visited': '#f6287b',
				'deny-page-visited': '#ff6b35',
				'submitted-data': '#f42e41',
				reported: '#2c3e50',
				'completed-campaign': '#48bb78',
				'repeat-offenders': '#ff6768',
				'emails-read': '#e8e810',
				'clicked-link': '#9622fc',
				'repeat-link-clicks': '#c78bfd',
				'data-submitted': '#f42e41',
				'repeart-submissions': '#ff6a91',
				recipients: '#6cd4cc',
				closed: '#9f9f9f',
				'campaign-active': '#5557f6',
				'campaign-scheduled': '#62aded',
				'campaign-completed': '#69e1ab'
			},
			/*
			'scheduled':'#e756f6',
				'recipient-scheduled':'#4e68d8',
				'failed-sending':'#4cb5b5',
				'cancelled': '#161692',
				'message-sent':'#4bb028',
				'message-read':'#e8e810',
				'before-page-visited':'#f9c765',
				'page-visited':'#f8a249',
				'after-page-visited':'#f66c26',
				'submitted-data':'#fd1d1e',
				'completed-campaign':'#48bb78',
				'repeat-offenders': '#ff6768',
				'emails-read': '#e8e810',
				'clicked-link':'#f99049',
				'repeat-link-clicks':'#f56402',
				'data-submitted': '#fd1d1e',
				'repeart-submissions': '#ba0001',
				'recipients':'#6cd4cc' */
			height: {
				'1/10': '10%',
				'2/10': '20%',
				'9/10': '90%',
				'30vh': '30vh',
				'40vh': '40vh',
				'50vh': '50vh',
				'55vh': '55vh',
				'60vh': '60vh',
				'65vh': '65vh',
				'67vh': '67vh',
				'70vh': '70vh',
				'75vh': '75vh',
				'80vh': '80vh'
			},
			width: {
				'1/10': '10%',
				'2/10': '20%',
				'9/10': '90%',
				'70vw': '70vw',
				'80vw': '80vw',
				'90vw': '90vw'
			},
			minWidth: {
				app: '768px',
				desktop: '1024px'
			}
		}
	}
};
