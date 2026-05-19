<p align="center">
  <img src="./public/favicon.png" alt="Assembly: Endgame Logo" width="120" />
</p>

<h1 align="center">Assembly: Endgame</h1>

<p align="center">
  A React-based word guessing game where you must save the programming world from Assembly.
</p>

<p align="center">
  <a href="https://assembly-endgame-six-phi.vercel.app/" target="_blank" rel="noopener noreferrer"><strong>Live Demo</strong></a>
  ·
  <a href="https://github.com/Ash-the-k/assembly-endgame" target="_blank" rel="noopener noreferrer"><strong>Repository</strong></a>
  ·
  <a href="./LICENSE" target="_blank" rel="noopener noreferrer"><strong>License</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React Badge" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript Badge" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=ffffff" alt="CSS Badge" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" alt="Vite Badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="MIT License Badge" />
</p>

## Overview

Assembly: Endgame is an interactive word guessing game built with React. The objective is to guess the hidden word before running out of attempts or time.

Every incorrect guess eliminates a programming language from the list. If the player fails, Assembly takes over the programming world.

## Features

- **Interactive Gameplay:** Guess letters using the on-screen keyboard or your physical keyboard.

- **Elimination System:** Incorrect guesses eliminate programming languages from the list.

- **Countdown Timer:** A visual progress bar tracks the remaining time and highlights the danger state as time runs out.

- **Game Feedback:** Win, loss, timeout, and farewell states provide clear feedback during gameplay.

- **Accessible Design:** ARIA live regions provide screen-reader friendly status updates.

- **Clean UI:** A responsive interface with custom CSS animations and a minimal visual style.

## Tech Stack

- **Framework:** React via Vite
- **Language:** JavaScript ES6+
- **Styling:** Vanilla CSS3
- **Libraries:** clsx, react-confetti

## Project Structure

```txt
assembly-endgame/
├── App.jsx
├── LICENSE
├── README.md
├── index.css
├── index.html
├── index.jsx
├── languages.js
├── package-lock.json
├── package.json
├── public
│   └── favicon.png
├── utils.js
├── vite.config.js
└── words.js
```

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

Make sure Node.js is installed on your machine.

### Installation

Clone the repository:

```bash
git clone https://github.com/Ash-the-k/assembly-endgame.git
```

Navigate into the project directory:

```bash
cd assembly-endgame
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## Build

Create a production-ready build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is deployed on Vercel. You can check it out here:

[View Live Deployment](https://assembly-endgame-six-phi.vercel.app/)

## License

This project is licensed under the [MIT License](./LICENSE).

## Author

Built by Ashlesh Kanchan.

* GitHub: [Ash-the-k](https://github.com/Ash-the-k)
* LinkedIn: [Ashlesh Kanchan](https://www.linkedin.com/in/ashlesh-kanchan/)
