import { transform } from "next/dist/build/swc";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
				modalEntry: 'entrie .5s ease-in-out',
        modalExit: 'exit .5s ease-in-out',
        menuFadeIn: 'menuFade .4s ease-in-out'
			},

			keyframes: {
				entrie: {
					from: { scale: '0' },
					to: { scale: '1' },
				},

        exit: {
          from: { scale: '1' },
					to: { scale: '0' },
        },
        menuFade:{
          '0%':{
            opacity: '0',
            transform: 'translateY(10rem)'
          },
          '100%':{
            opacity: '1',
            transform: 'translateY(0)'
          }
        }
			},
    },
  },
  plugins: [],
};
export default config;
