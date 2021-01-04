# Master Project : An Experiment Platform For Visual Analytic Tasks

* Demo: http://ec2-3-84-52-50.compute-1.amazonaws.com:3001/index.html *

## Quick setup

`npm install`

`node app.js`

The app is running on localhost:3000.

## Design

### Module Controls


A sequence of modules are defined as the researcher expected. Once the previous module is completed, the next button become enabled and clicking will remove the last module container and load new contents in. A timer is triggered when the user agrees the consent and stopped when the debrief page appears.

### Modules

Some modules are necessary in every visual analytic study and always appear in fixed sequence. The consent goes first, visual tasks are the next, debrief and feedback are the last ones. Templates for demographic questionnaires and mouse event tracking are provided in this platform if needed.

### Database

Data are stored in No-SQL database for the convenience of writing data after the completion of each module. A dashboard is built to allow researchers supervise the progress of a user study and have an overview for the current data. Simple search and delete operations are implemented as well as downloading JSON file.

## Project Directory
npm_modules are libraries installed for this project. public stores all front-end files, including modules, index page and experiment.js. Each module is a seperate folder, where researchers can add their html, javascript, css files, as well as data and images. experiment.js creates an object for each participant, tracking time, updating modules and sending requests to the back-end. app.js responds to these requests and interact with MongoDB database, writing data both to result folder and download on the browser side.

## How to edit

add module folders in /public/modules

modify the sequence of modules in public/index.html

edit app.js to connect database and respond new requests from front-end

## Some templates for modules

Consent module: /public/modules/consent

Demographics module:/public/modules/demographics

Debrief module:/public/modules/debrief

Mouse event Logs for visual task module: /public/modules/vis/js/mousemove.js


## Reference
Lane Harrison (2019). experimentr: a hosting/data-collection backend and module-based frontend for web-based visualization studies
https://github.com/codementum/experimentr
