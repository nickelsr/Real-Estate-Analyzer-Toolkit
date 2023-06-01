<!-- prettier-ignore-start -->
# Real Estate Calculator


## Description

This repository hosts the code that drives a web application used for real estate investment calculations. You can visit the website [here](https://real-estate-calculator-umber.vercel.app/). This application is meant to serve as a **FOSS** alternative to other real estate investment web apps that charge monthly subscription fees. The source code is available to everyone under the standard [MIT license](https://github.com/nickelsr/Real-Estate-Calculator/blob/main/LICENSE.txt).


## Features Under Development

- Fix and Flip calculator

- An accomanying Node.js server is currently under development to enable user registration for the purpose of storing a users previously completed calculation results.


## Development Environment

This project includes a Docker-Compose yaml file for containerized development. To setup the development environment, the following steps should be taken:

- Install Docker Desktop following the [official guide](https://docs.docker.com/desktop/)

- Start the Docker daemon (the docker desktop application)

- Clone the project to a directory of your choice on your local machine using the following command

    ```
    git clone git@github.com:nickelsr/Real-Estate-Calculator.git <Target-Directory-Path>
    ```

- Create a docker development container with an attached volume by using the following command

    ```
    docker-compose up --build
    ```

After completing the following steps, the development container will be created, dependencies will be installed, and incoming requests will be forwarded to port 3000.


## Tests

Unit tests are written with Mocha/Chai. After setting up the development environment, execute the following command from the projects root directory:

```
next run test
```


## License

Copyright (c) Nick Lazaga. All rights reserved.

Licensed under the [MIT](https://github.com/nickelsr/Real-Estate-Calculator/blob/main/LICENSE.txt) license.
<!-- prettier-ignore-end -->
