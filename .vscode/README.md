# Projet_Groupomania

The project consists in building an internal social network for employees of Groupomania, a group specialized in mass distribution. The aim is to facilitate interaction between colleagues.

# Application Status 

Status under possible development.\
Indeed a "followers" page is not developed because this is a future idea for the next application.\
It will be a page to follow followers and see their different personalities and successes towards other users.

## Home Page
Tells the user the different "Posts" that are running on the network.

### Logged in User

"POST"\
He can add a "Post" and indicate if he likes or not another post.
"COMMENT"\
The user can also comment on the "Posts" of other users of the network.

### Logged out User
He can see the "flow" of "Posts" of the network without being able to add anything.

## Profile page
Shows the user’s profile and can even change their presentation image and description 

# Getting Started with Create React App

This project was bootstrapped with [Create React App]

# Project

This project was generated with REACT version 13.2.4.

# Development server
Go to the back folder of the project. Run npm start for a development server. Go to http://localhost:5000/. The application will reload automatically if you change any of the source files.

# Development front
Put yourself on the project’s groupomania folder, which consists of the front. Run "npm run start" to open a window in your browser. The URL will then be http://localhost:3000/. The application will reload automatically if you modify one of the source files.

## Available Scripts

In the project directory, you can run:

### `npm run start`

Put yourself on the project’s "groupomania" folder, which consists of the front.\ 
Run "npm run start" to open a window in your browser.\

Runs the app in the development mode.\
The URL will then be http://localhost:3000/ to view it in your browser. 

The application will reload automatically if you modify one of the source files.\
The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Architecture of the various codebase files

The architecture of the files is organized according to their type. components, assets, pages, style, utils.\
Within even the main files a secondary decomposition can be done to group the files presenting the same parent file 

# Using Redux

Thanks to its global "store", Redux can centralize data and provide a single source of truth.\
Thanks to its specific function "Reducer", it allows to return updated data of our application.\
Redux is easily debugged and easy to test.

## redux DevTools 

Using "redux devTools" is an indispensable tool in the "workflow" of our application.
