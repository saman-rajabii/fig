import { make } from "../src/fig";

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
      },
    ],
  },
  ["a", "b", "c"]
);

console.log(query);
