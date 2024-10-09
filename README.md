# Submarine Simulation System

[Simluation Deployed Site](https://submarine-simulation-system.vercel.app/)

## Setup

Download [Node.js](https://nodejs.org/en/download/).
Run this followed commands:

## Build image

```bash
docker build -t abdalrrahman/submarine-simluation-system:latest .
```

## Or pull image

```bash
docker pull abdalrrahman/submarine-simluation-system
```

## Run using docker

```bash
docker run -d --name submarine-simulation-system -p 8084:8084 abdalrrahman/submarine-simluation-system:latest
```

## Additional Libraries

### Install dependencies (only the first time)

```bash
npm install
```

### Run the local server at localhost:8080

```bash
npm run dev
```

### Build for production in the dist/ directory

```bash
npm run build
```

### Deploy into production environment

> Note that "vercel" will automatically build the project and deploy it once you push your changes.

> Use this if you want to override the automatic deployment process. e.i for test purposes

```bash
npm run deploy
```

## Additional Commands

### _Generate Documentation:_

- Use JSDoc to generate documentation for your JavaScript files:
  > The output will show in the "docs" folder in public

```bash
npm run docs
```

### _Compile TypeScript Files:_

- Convert TypeScript files to JavaScript using the TypeScript compiler (tsc):

```bash
npm run compile
```
