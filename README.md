# Imogen

[![npm version](https://img.shields.io/npm/v/@lanternfly/imogen.svg?style=flat)](https://www.npmjs.com/package/@lanternfly/imogen)

Imogen is a Node based job scheduler build on top of [Node Schedule](https://www.npmjs.com/package/node-schedule).

## Getting Started

1. Install the package `@lanternfly/imogen` globally using `npm install -g @lanternfly/imogen`.
2. Create a configuration file. See the **Configuration** section for more details.
3. Run `imogen --config=<path to config file>` to run the job scheduler.

## Configuration

### Sample Configuration File

```json
{
  "database": {
    "path": "imogen.db"
  },
  "jobs": [
    {
      "name": "job-1",
      "time": "* * * * * *",
      "command": "ls"
    }
  ],
  "server": {
    "enabled": true,
    "bindHostname": "localhost",
    "bindPort": 16061
  }
}
```

### Configuration API

A configuration is a json file with the following fields:

| Field                 | Type    | Description                                                                                                                                                                                                      | Is Required? | Default     |
|-----------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|-------------|
| `database.path`       | String  | This is the path to the SQLite database file. If no path is provided a file titled `imogen.db` will be created in the working directory.                                                                         | No           | `imogen.db` |
| `jobs`                |         |                                                                                                                                                                                                                  | Yes          |             |
| `jobs[#].name`        | String  | The name of the job. The name can only contain letters, numbers, dashes, and underscores.                                                                                                                        | No           |             |
| `jobs[#].time`        | String  | This is a cron style string specifying when the job will run. See [this](https://www.npmjs.com/package/node-schedule#cron-style-scheduling) for more details.                                                    | Yes          |             |
| `jobs[#].timeZone`    | String  | One of the timezone specified in [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).                                                                                                           | No           |             |
| `jobs[#].command`     | String  | The system command which should be run on each job execution.                                                                                                                                                    | Yes          |             |
| `jobs[#].overlap`     | Boolean | Flag for whether multiple instances of job can be executed at once. If `true`, multiple instances can run concurrently. If `false`, the next job will not be run until the previous instance has been completed. | No           | `true`      |
| `server.enabled`      | Boolean |                                                                                                                                                                                                                  | No           | `false`     |
| `server.bindHostname` | String  |                                                                                                                                                                                                                  | No           | `localhost` |
| `server.bindPort`     | Integer |                                                                                                                                                                                                                  | No           | `16061`     |

## Imogen Server API
This is the API used to talk to an Imogen server instance.

### API Version: 1.0

**Schemes:** http

#### isEnabled

##### GET
###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| name |  | The name of the job. | Yes | string |

###### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 500 | unsuccessful operation |

#### isRunning

##### GET
###### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| name |  | The name of the job. | Yes | string |

###### Responses

| Code | Description |
| ---- | ----------- |
| 200 | successful operation |
| 500 | unsuccessful operation |

## Officially Supported Node Versions

- 18.x
- 20.x
- 21.x
- 22.x
- 23.x