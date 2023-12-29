# Imogen

[![npm version](https://img.shields.io/npm/v/@lanternfly/imogen.svg?style=flat)](https://www.npmjs.com/package/@lanternfly/imogen)

Imogen is a Node based job scheduler build on top of [Node Schedule](https://www.npmjs.com/package/node-schedule).

## Getting Started

1. Install the package `@lanternfly/imogen` globally using `npm install -g @lanternfly/imogen`.
2. Create a configuration file. See the **Configuration** section for more details.
3. Run `imogen --config=<path to config file>`.

## Configuration

| Field              | Type    | Description                                                                                                                                                                                                      | Is Required? | Default |
|--------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------|
| jobs               |         |                                                                                                                                                                                                                  | Yes          |         |
| jobs[#].name       | String  |                                                                                                                                                                                                                  | No           |         |
| jobs[#].time       | String  |                                                                                                                                                                                                                  | Yes          |         |
| jobs[#].command    | String  |                                                                                                                                                                                                                  | Yes          |         |
| jobs[#].simultaneous | Boolean | Flag for whether multiple instances of job can be executed at once. If `true`, multiple instances can run concurrently. If `false`, the next job will not be run until the previous instance has been completed. | No           | True    |

## Officially Supported Node Versions

- 14.x
- 16.x
- 18.x
- 19.x
- 20.x
- 21.x