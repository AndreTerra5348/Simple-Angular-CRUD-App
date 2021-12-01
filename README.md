# A Simple CRUD App
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-blue?style=flat&logo=linkedin&labelColor=blue")](https://www.linkedin.com/in/andr%C3%A9-terra-2a7728145/)

  
## Description
This is a simple Frontend CRUD application made with Angular Framework, and a Json-Server as backend.

I made this project to learn the basics of Angular

### This application database hava two modes:
1. **Server Database**: it first tries to connect to the json-server and fetch the data (to use the Json-Server database you need to run this application locally, see [Getting Started](#getting-started))


2. **Local Database**: if it fails, it'll use its local database

### With this application you can:
- **C**reate, **R**ead, **U**pdate, and **D**elete products

### Products have:
- name (editable)
- price (editable)
- id (non-editable)

[App Demo Page](https://andreterra5348.github.io/Simple-Angular-CRUD-App/)

<img src="assets\page.jpg" alt="page" width="80%"> 
<img src="assets\page2.jpg" alt="page2" width="80%">

## Built with
- HTML
- CSS
- [Angular](https://angular.io/)
- [Angular Material Design](https://material.angular.io/)
- [Json Server](https://www.npmjs.com/package/json-server)

## Getting Started
### Prerequisites
- npm

### Running the Application
1. Clone this repository

```shell
git clone https://github.com/ 
```

2. install backend dependencies, and start the serevr
```bash
cd backend
npm install
npm start
```
3. install frontend dependencies, and start the server
```bash
cd frontend
npm install
npm start
```
4. Go to [http://localhost:4200/](http://localhost:4200/) in your browser

## What did I learn?
- The basics of Angular Framework
- Angular Material Design
- More HTML tags
- More CSS properties

## Acknowledgments and Resources
- [Radomlists](https://www.randomlists.com/) To populate db.json for the json server
- [Angular Real World Example](https://github.com/gothinkster/angular-realworld-example-app)
- [Angular Schematics](https://material.angular.io/guide/schematics)
- [logrocket](https://blog.logrocket.com/server-side-pagination-in-angular-with-ngx-pagination/) A server side pagination tutorial
- [CSS tricks](https://css-tricks.com/couple-takes-sticky-footer/)
- [Cod3r Cursos](https://www.youtube.com/watch?v=NCrWXZtlc7Q&list=PLdPPE0hUkt0rPyAkdhHIIquKbwrGUkvw3) Angular basics tutorial

## License
Distributed under the MIT License. See LICENSE.txt for more information.

## Author
[André Terra](https://www.linkedin.com/in/andr%C3%A9-terra-2a7728145/)
