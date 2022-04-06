<div align="center">
  <h1>Beerpong Website</h1>
  <p>Template made by <a href="https://theodorusclarence.com">Theodorus Clarence</a></p>
  
  
  [![CodeFactor](https://www.codefactor.io/repository/github/colodenn/beerpong-dashboard/badge)](https://www.codefactor.io/repository/github/colodenn/beerpong-dashboard)

</div>
  
  ## Development
  ### Setup
  
  - Install nodejs, preferrably via a package manager, e.g. [nvm](https://github.com/nvm-sh/nvm):  
  `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash`  
  `nvm install --lts`
  
  - Install yarn:  
  `npm install --global yarn`
  
  - clone this project, navigate to its root folder
  - run `yarn`
  - create the local environment:  
  `cp .env.example .env.local`
  - fill the first two lines with the database connection parameters (These are private of course, ask [colodenn](https://github.com/colodenn) for them)

### Run Locally

- start the server:  
  `yarn dev`

This project supports hot-reloading, so you only need to execute this once while working on it locally.
