import type { Config } from "tailwindcss";
import flowbite from 'flowbite-react/tailwind'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {
    fontFamily: {
      sans: ['Noto Sans Thai'],
    },
    colors: {
      'primary': '#5572FA',
      'white': '#FAFAFA',
      'pure-white': '#FFFFFF',
      'border-text-light': '#CED4DA',
      'gray': '#808080',
      'black': '#0F1119',
      'table-header': '#3049724D',
      'border-page': '#D7D7D71A',
      'page': '#0B111B',
      'blackground-text': '#2A3A50',
      'hover-navbar': '#16233A',
      'red-l': '#FB7474',
      'green-l': '#00DACC'
    },
  },
  plugins: [
    flowbite.plugin()
  ],
};
export default config;
