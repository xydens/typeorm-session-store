# typeorm-session-store
TypeORM based express session store

## Installation
install package `yarn add typeorm-session-store`

At your TypeORM `connect` add `SessionEntity` like:
```typescript
const db = await connect({
  ***
-  entities: [__dirname + "/**/*.entity{.ts,.js}"],
+  entities: [__dirname + "/**/*.entity{.ts,.js}", SessionEntity],
   synchronize: true,
   ***
})
```

Create store:

```typescript
const store = new TypeOrmSessionStore(db.getRepository(SessionEntity))
```

**USE IT**
