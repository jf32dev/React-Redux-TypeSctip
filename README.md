# README

RedBull project containing multiple applications and packages shared by these applications to ensure brand consistency across all projects, support code reusability and increase development efficiency.

## What is this repository?

It is a monorepo setup with [Lerna](https://github.com/lerna/lerna)

Lerna packages are split between `packages` and `apps` to distinguish their purpose.

### Packages:

- `common` - general functions and files (styles, fonts, images, icons) reused by multiple packages
- `components` - storybook of shared components
- `services` - api services ([JS Bridge](https://help.bigtincan.com/help/jsbridgeapi))

### Apps:

- `admin` - self registration user management and calculator data managemenet
- `calculator`
- `dashboard` - home screen
- `registrationPortal` - public form that enables outside users to register and gain access to the dashboard

## How do I run this project?

- `yarn bootstrap` - bootstraps the application which means all relevant npm packages\* for all projects will be installed in dedicated node_modules folders
- `yarn clean` - removes all node_modules folders from all packages\*
- `yarn start @redbull/package_name` to start relevant project
- `yarn storybook @redbull/components` starts storybook
- `yarn commit` triggers husky pre-commit hooks that guide you through commit message to ensure correct structure according to [conventional commits guidelines](https://www.conventionalcommits.org/en/v1.0.0/)

### Deployment

This repo includes **affected** script which leverage Lerna capabilities to list, test, and build only affected packages since specified node (in this project, it will check affected since _last merge_).

- `yarn affected:build` - build affected package(s)\*\*
- `yarn affected:typecheck` - check affected package(s) type with typescript compiler
- `yarn affected:list` - list of affected package(s)

Argument that you can pass in to affected

- `-s {number}` - skip **n** number of merge commit

\*Packages in this project are considered all application and packages in `apps/*` and `packages/*` folders.

\*\* Build output will be see in `apps/{package-name}/build`

In order to run `dashboard` and `calculator` applications successfully, they need to be run within the Bigtincan Hub instance.

#### Deploying apps to HUB:

- Build each package separately using `yarn build:{uat|prod} @redbull/package-name`
- Once application is build, you can find a `.btca` file in its dedicated folder
- Rename the file with the last commit hash that's included in this build and todays date
- Eg. for calculator package it would look like this `gs-redbull-calculator-d8fa70c-11-02-21.btca`

##### Dashboard App

- Dashboard is being uploaded to HUB -> Platform Configuration -> Home Screens -> Home Screen Add Ons
- Upload Add-On - once uploaded, it needs to be assigned to the correct Home Screen
- We are currently using the `Latest HS` however as the development goes forward this may change
- Select the correct HS and click `Edit` on the right hand side
- Remove the current Add-on then select Add Module on the top left corner, select Add-on and select the bundle you previously uploaded by its name
- Click Save in the top right corner and go back to Home where you should be able to see your latest build

##### Calculator App

- Calculator is being uploaded to HUB as a Story
- Calculator currently lives in Content -> Calculator (Show hidden channels) -> .version
- Upload your calculator build here as a Story with the same name
- Add Story (top right corner), select channel yet again as above (Content -> Calculator -> .version)
- Add name (the same as your bundle), add Files (from Desktop)
- Hit Publish (top right corner)
- Now go to Content -> Calculator -> .app
- There should be only one Story called Redbull - Edit the Story clicking the pen icon
- Once in the Story screen, click Edit in the top right corner
- You will see the Calculator File - click Update -> Hub Files and select the build you just uploaded
- Hit publish and you're done

#### Deploying Admin package:

- This package is being deployed automatically using CD from `preview` branch.
- Once approved, create a `develop` branch Pull Request to Preview branch
- Merging this request triggers CD pipeline that will deploy the app

UAT URL: https://redbull-admin.gs.bigtincan.info/

## Writing Tests

Tests are being written using Jest and Enzyme, RTL is also available and can be applied in specific cases.

- Run tests from the root: `yarn test`

- Run tests from specific workspace eg. dashboard: `cd apps/dashboard && yarn test`

- Show test coverage of individual workspace: `cd apps/dashboard && yarn jest --coverage`

The least testing should be rendering of each component by `data-test` attribute. This attribute is present for testing only and is removed in production build (using `babel-plugin-react-remove-properties`).

## Contribution guidelines

- Writing tests
- Code review
- Other guidelines

## Who do I talk to?

- Repo owner or admin
- Other community or team contact
