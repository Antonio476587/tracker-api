/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* global db print */
/* eslint no-restricted-globals: "off" */

const owners = ["Miguel", "Engerson", "Rafayel", "Yoneiker", "Antonio"];
const statuses = ["New", "Assigned", "Fixed", "Closed"];

const initialCount = db.issues.count();

for (var i = 0; i < 100; i += 1) {
  const randomCreatedDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const created = new Date(randomCreatedDate);
  const randomDueDate = (new Date())
    - Math.floor(Math.random() * 60) * 1000 * 60 * 60 * 24;
  const due = new Date(randomDueDate);

  const owner = owners[Math.floor(Math.random() * 5)];
  const status = statuses[Math.floor(Math.random() * 4)];
  const effort = Math.ceil(Math.random() * 20);
  const title = `Lorem ipsum dolor sit amet, ${i}`;
  const id = initialCount + i + 1;

  const issue = {
    id, status, owner, effort, created, due, title,
  };

  db.issues.insertOne(issue);
}

const count = db.issues.count();
db.counters.update({ _id: "issues" }, { $set: { current: count } });

print("New issue count:", count);
