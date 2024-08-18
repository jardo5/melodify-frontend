<h1 align="center">
  <img src="https://i.imgur.com/PrndwKF.png" alt="Melodify" width="300" height="300">
</h1>

<h1 align="center">
Melodify - Angular Frontend
</h1>

## Main Tools Used

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![DaisyUI](https://img.shields.io/badge/DaisyUI-FF7F50?style=for-the-badge)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)


## Introduction

Melodify is a front-end application built using Angular that interacts with the Melodify backend services to provide a seamless music management experience. It features user authentication, song and artist information, and music recommendations, all with a sleek and responsive design powered by TailwindCSS and DaisyUI.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Be Aware](#be-aware)
- [License](#license)

## Installation

To set up the Melodify frontend, follow these steps:

1. **Clone the repository:**    
   ```bash
   git clone https://github.com/your-repo/melodify-frontend.git
   cd melodify-frontend
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the project**    
    ```bash
    npm start
    ```

## Usage ##
Once the application is running, you can navigate through the user interface to explore features like song search, artist information, and user-specific recommendations. Ensure that the backend service is running and properly configured to allow seamless API integration.


## Features ##
* User Authentication: Securely log in and manage your account using JWT.
* Song Search: Find songs by title and artist.
* Artist Information: View detailed artist profiles.
* Music Recommendations: Receive personalized song recommendations based on your preferences.
* Like/Dislike/Save Songs: Personalize music recommendations with a detailed like and dislike system.
* Responsive Design: Fully responsive user interface built with TailwindCSS and DaisyUI.


## Dependencies ##
Melodify relies on the following key dependencies:

**Core:**  
  - Angular (animations, common, compiler, core, forms, platform-browser, platform-browser-dynamic, router)

**UI/UX:**  
  - TailwindCSS
  - DaisyUI
  - Material Symbols
  - Swiper

**Backend Integration:**  
  - Express
  - JWT-decode

**Development Tools:**  
  - Angular CLI
  - TypeScript
  - Karma (test runner)
  - Jasmine (testing framework)
  - PostCSS & Autoprefixer (CSS processing)

## Configuration
If needed, edit the `angular.json` or files under `src/environments`:
  
## Be Aware ##

**API rate limits:**  
  Be aware of the rate limits imposed by external APIs (Spotify, Genius, OpenAI, Lyricsovh). If connected to Melodify back-end.


## License
This project is licensed under the MIT License. See the LICENSE file for more details.


