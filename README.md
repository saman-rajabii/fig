# fig

Fig is a simple SQL query generator that focused on SELECT query. 
The main idea behind the scene is the solution for creating dynamic query for the specific situations in which we have parentheses.

For example:

```sql
SELECT a,b,c FROM tbl WHERE ( a = "b" AND c > 2 ) AND ( m = "b" OR n > 2 OR ( d = "b" AND b > 2 AND ( d = "b" AND b > 2 ) ) ) 
```
It is a rare situation but i struggled with in different projects, especially when some condition comes from client that you don't know what is that!

Notice: currently this is very simple and just support limited sql operators (it will be improved)

The repository contains test example that you can play with and run by following command:

```bash
npm run test
```

Usage:

```typescript
...
const query = make(
  "tbl",
  {
    op: "and",
    and: [
      { field: "a", value: "b", op: "=" },
      { field: "c", value: 2, op: ">" },
    ],
    or: [
      { field: "m", value: "b", op: "=" },
      { field: "n", value: 2, op: ">" },
      {
        bracket: {
          and: [
            { field: "d", value: "b", op: "=" },
            { field: "b", value: 2, op: ">" },
          ],
        },
      },
    ],
  },
  ["a", "b", "c"]
);

```

The main concept for implementing parentheses within query is that, passing the query elements by json object and parsing them in the other side.
As you see in the example above, there is an attribute **bracket** that is the attribute that tells us here is a parenthes.
Please tell me your idea and collaborate with me to improve if you like.

