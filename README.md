# NestJS Starter Project

Nestjs API starter template with authentication. Prisma ORM is used with Postgresql for database.

## Description

A stater template for nestjs API server. This template has authentication fully setup - JWT access_token and refresh_token.

## Installation

```bash

  npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database

```bash
# enter postgresql shell
psql
```

```bash

# create database role
create role developer with createdb;
```

```bash
# Create database with the user 'developer'
createdb nestjs
```

### Set environment variable

DATABASE_URL="postgresql://db-user:password@localhost:5432/database-name?schema=public"

in our case,

```bash

DATABASE_URL="postgresql://developer:123@localhost:5432/nestjs?schema=public"
```

## Support

Nest is an MIT-licensed open source project. Fell free to contribute 🎁

## Stay in touch

- Author - [Kehinde Fasunle](https://fasunle.com)
- LinkedIn - [Kehinde Fasunle](https://www.linkedin.com/in/fasunlekehinde/)

## License

Nest is [MIT licensed](LICENSE).
