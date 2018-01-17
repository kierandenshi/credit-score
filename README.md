# Credit Score SPA

## Description

A version of the Clearscore circular score indicator, as shown on https://www.clearscore.com/account/ and https://youtu.be/tIjtcL5Z0Wk?t=5. 

### Task Requirements
- Show the given score in the middle and with an arc outside that represents the score out of 700
- The arc animates on load ~~with a bouncing effect at the end~~
- Write a service to connect to the dashboard data https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json
- Build the first score indicator slide, and animate in a second panel for long term debt ( take data from the above json )
- The solution displays correctly on modern browsers (including mobile)
- Use a current JavaScript framework/library such as Angular 4+, React, and justify your choice.
- Use Webpack to build your application
- Add tests coverage
- Add a CI pipeline to pass tests and build the site

## Getting started

### System requirements

- node 7.1 +
- yarn 1.3 +

### Running in development mode

- Run `yarn` to install package dependencies
- Run `yarn start` to start the development server

### Additional package scripts 

Run `yarn [script_name]` to execute

- `lint` to check the JS code with eslint
- `unit` to run unit tests
- `test` to run `lint` followed by `unit`
- `start` to start the development server
- `build` to output production build to `/dist`
- `deploy` to run `build` and deploy to S3 

## CI / CD pipeline

This repository uses Circle CI integrations to run linting and unit tests on all branch merge pull requests. Branches cannot be merged on test failure. Direct updates to `master` are disabled. Successful merges to `master` will initiate another test run followed by a build and deploy cycle.

The app is deployed to an S3 bucket with static site hosting enabled. Note that due to S3 caching, updates will be subject to a short delay before they are visible.

Public URL: http://credit-score-demo.s3-website.eu-west-2.amazonaws.com/

## Tool choices

### React

React is the framework I have the most time and up to date experience with. I favour React as it encourages a clean functional style but is not too opinionated. It also has exceptional community support and backing from an industry giant.

### Redux

I really like the simplicity of redux. There's nothing magic going on behind the scenes and as plain JS Objects are predictable and easily inspectable, it's simple to see what's going on (and the redux devtools extension is an extra win). I actually like how explicit the action creating boilerplate is.

### Redux Observable

I've recently used this library in a smaller project instead of the more traditional choice of Redux Saga. It's too early for me to evaluate the 2 together, however Observables do seem easier to unit test than Saga's generators.


## Known issues / missing things

- Missing bounce on the radial animation (my attempt with @keyframes took ages and still looked really, really awful)
- Styling does not match example 
- Clicking on the slideshow moves to the next slide, this is fine however rapid clicking will cause noticable glitches
- Unit tests are rudimentary or totally missing in some places - TDD disipline has not been adhered to :(
- No isomorphic rendering
- No production code optimisations or code splitting
- Circle script is sub-optimal and appears to build `master` twice (excuse: this is the first time I've implemented CI)  
- The git history is very untidy 







 
