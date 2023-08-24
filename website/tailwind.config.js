/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/PagesContent/**", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        fontFamily: {
            primary: ["Poppins", "Sans-serif"],
            secondary: ["Roboto", "Sans-serif"],
        },
        extend: {
            gridTemplateColumns: {
                "chat-footer": "1fr auto",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light", "dark", "luxury"],
    },
};
