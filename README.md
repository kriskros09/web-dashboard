## About The Project

This project is a React Typescript project and it utilises an API built by GoodOwl. It also uses other third paty libraries for different features ( take a look a the pakcage.json for more information )

### Built With

- [Create React App](https://create-react-app.dev/docs/getting-started/)
- [TypeScript version ~3.7.2](https://www.typescriptlang.org/)
- [GraphQl](https://graphql.org/)
- [Formik](https://formik.org/)
- [Yup](https://github.com/jquense/yup)

### Framework

- React
- Docs: https://reactjs.org/docs/getting-started.html
- Template: https://create-react-app.dev/docs/adding-typescript/

### State

- React-Model
- Docs: https://github.com/byte-fe/react-model#readme

### Styles

- Tailwindcss
- Docs: https://tailwindcss.com/docs

- Styled Components
- Docs: https://styled-components.com/docs

### Data fetching

- Apollo client
- Docs: https://www.apollographql.com/docs/react/

---

# Running locally

- Install dependencies

  `yarn install` or `npm install`

- After dependecies are installed

  `yarn start` or `npm start`

---

# Running Docker

- build with no cache

  `docker-compose build --no-cache`

- start the services

  `docker-compose up`

- list the image

  `docker-compose ps`

- list the containers

  `docker ps`

- stop services

  `docker-compose stop`

---

## Releasing

- Build production ready docker image

  `docker build -f Dockerfile.production -t goodowl-saas:prod .`

- Build production ready files (html, css, js)

  `npm run build`

All files generated will be inside the build folder

---

## Coding standards

This project uses Typescript build with the CRA template found here https://create-react-app.dev/docs/adding-typescript/

---
