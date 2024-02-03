# Imogen

[![npm version](https://img.shields.io/npm/v/@lanternfly/imogen.svg?style=flat)](https://www.npmjs.com/package/@lanternfly/imogen)

Imogen is a Node based job scheduler build on top of [Node Schedule](https://www.npmjs.com/package/node-schedule).

## Getting Started

1. Install the package `@lanternfly/imogen` globally using `npm install -g @lanternfly/imogen`.
2. Create a configuration file. See the **Configuration** section for more details.
3. Run `imogen validate --config=<path to config file>` to validate the configuration file. See below for more information on configuration files.
4. Run `imogen run --config=<path to config file>` to run the job scheduler.

## Configuration

### Sample Configuration File

```json
{
  "jobs": [
    {
      "name": "job-1",
      "time": "* * * * * *",
      "command": "ls"
    }
  ]
}
```

### Configuration API

A configuration is a json file with the following fields:

| Field                    | Type            | Description                                                                                                                                                                                                       | Is Required? | Default   |
|--------------------------|-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|-----------|
| `jobs`                   |                 |                                                                                                                                                                                                                   | Yes          |           |
| `jobs[#].name`           | String          | The name of the job. The name can only contain letters, numbers, dashes, and underscores.                                                                                                                                                                                                                   | No           |           |
| `jobs[#].time`           | String          |                                                                                                                                                                                                                   | Yes          |           |
| `jobs[#].command`        | String          |                                                                                                                                                                                                                   | Yes          |           |
| `jobs[#].simultaneous`   | Boolean         | Flag for whether multiple instances of job can be executed at once. If `true`, multiple instances can run concurrently. If `false`, the next job will not be run until the previous instance has been completed.  | No           | True      |
| `pino.options`           | Object          | The `options` passed to pino when creating a logger. See [Pino documentation](https://github.com/pinojs/pino/blob/master/docs/api.md#options-object) for more details.                                            | No           | `{}`      |
| `pino.destination`       | String / Object | The `destination` passed to pino when creating a logger. See [Pino documentation](https://github.com/pinojs/pino/blob/master/docs/api.md#destination-sonicboom--writablestream--string--object) for more details. | No           | `{}`      |
| `record.directory`       | String          | The path to the directory where job run records will be stored. Must be an existing directory.                                                                                                                    | No           | `records` |
| `record.writeStdOut`     | Boolean         | If true, the stdout for each job will be written to its own file as specified in `record.directory`.                                                                                                              | No           | True      |
| `record.writeStdErr`     | Boolean         | If true, the stderr for each job will be written to its own file as specified in `record.directory`.                                                                                                              | No           | True      |

## Officially Supported Node Versions

- 18.x
- 19.x
- 20.x
- 21.x