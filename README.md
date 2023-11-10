# Imogen

Imogen is a Node based job scheduler build on top of [Node Schedule](https://www.npmjs.com/package/node-schedule).

## Getting Started

1. Install the package `@lanternfly/imogen` globally using `npm install -g @lanternfly/imogen`.
2. Create a configuration file. See the **Configuration** section for more details.
3. Run `imogen --config=<path to config file>`.

## Configuration

| Field           | Description | Is Required?   |
|-----------------|-------------|----------------|
| jobs            |             | Yes            |
| jobs[#].time    |             | Yes            |
| jobs[#].command |             | Yes            |