# Cromwell UI

This is a repository for the front end part of the project, which is a React application.  This document has been tested with Mac OS Monteray.

## Pre-requisites

- [Cromwell](https://github.com/michaelfraser/cromwell) Please follow the README.md instructions.
- [Make](https://en.wikipedia.org/wiki/Make_(software))
- [Docker](https://www.docker.com) tested on v27.4.0

## Getting started

To ease the setup for the project. The React application will run in a Docker container.

There are a number of useful commands which have been abstracted into a `Makefile`.  To see a list of useful commands run `make` and a list of commands similar to the below should be displayed.  If you are struggling with running the `make` command then you can view the file and workout what commands to run by hand.

```text
help                           This help.
up                             Create the Docker containers
down                           Stop and remove Docker containers
restart                        Remove and recreate the Docker containers
nuke                           Delete all docker containers and rebuild
bash                           Create a bash session in the webserver container
logs-web                       Display webserver logs
```

## Run development environment

To get the development environment up and running.  Please run `make up`.
This will setup the docker container, run the `npm install`, start the webserver.
It will create a `.env` file for you from the `.env.example` file.  You will only need to change the `.env` file if you have port clashes on your system.

If you require fresh NPM packages then please remove the `rm -rf node_modules` folder and run `make restart`.

## Run the website

Vist [http://localhost:3000/](http://localhost:3000/) in your browser

---
Please review this document as we progress through the project and make sure that instructions are still valid.

Last reviewed by Michael Fraser on 29/01/2025
