# Prisma

A simple to use ORM.

## Migrations commands

```bash

# create a migration file after modifying schema.prisma file:
yarn migrate:generate name-of-migration
```

```bash

# Apply the migration:
yarn migrate:deploy
```

```bash

# Check the migration status:
yarn migrate:status
```

```bash

# reset all migration on the database and reapply:
yarn migrate:reset

```
