# Prisma

A simple to use ORM.

## Migrations commands

You can run the following commands to manage migration fron the root folder.

### create a migration file after modifying schema.prisma file

```bash
yarn migrate:generate name-of-migration
```

### Apply the migration:

```bash
yarn migrate:deploy
```

### Check the migration status:

```bash
yarn migrate:status
```

### reset all migration on the database and reapply:

```bash
yarn migrate:reset
```
