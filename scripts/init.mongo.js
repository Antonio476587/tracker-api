/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
db.deleted_issues.remove({});

const issuesDB = [
  {
    id: 1,
    status: "Assigned",
    owner: "Billie",
    effort: 8,
    created: new Date("2019-12-22"),
    due: undefined,
    title: "Syntax Error, She texted you",
    description: "I'm happier than ever"
     + "\n When I'm away froom you",
  },
  {
    id: 2,
    status: "Fixed",
    owner: "Maria",
    effort: 1,
    created: new Date("2021-11-05"),
    due: new Date("2022-01-01"),
    title: "Reference Error, she is not defined",
    description: "Steps to recreate the problem:"
    + "\n1. Refresh the browser."
    + "\n2. Select 'New' in the filter"
    + "\n3. Refresh the browser again. Note the warning in the console:"
    + "\n   Warning: Hash history cannot PUSH the same path; a new entry"
    + "\n   will not be added to the history stack"
    + "\n4. Click on Add."
    + "\n5. There is an error in console, and add doesn\"t work.",
  },
  {
    id: 3,
    status: "Closed",
    owner: "Miguel",
    effort: 11,
    created: new Date("2021-10-20"),
    due: new Date("2021-12-23"),
    title: "Miguel se robo las gallinas",
    description: "Dita sea con Miguel, me fue a robar la gallina, y no se puede arreglar porque se la comió"
    + "There needs to be a border in the bottom in the panel"
    + "that appears when clicking on Add",
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print("Inserted", count, "issues");

db.counters.remove({ _id: "issues" });
db.counters.insert({ _id: "issues", current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.deleted_issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
db.issues.createIndex({ title: "text", description: "text" });
