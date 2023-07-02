const contactsList = require("./db/contacts.json");
const contactsFunctions = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contactsFunctions.listContacts();
      return console.table(allContacts);
    case "get":
      const contact = await contactsFunctions.getContactById(id);
      return console.log(contact);
    case "add":
      const newBook = await contactsFunctions.addContact(name, email, phone);
      return console.log(newBook);
    case "remove":
      const deletedContact= await contactsFunctions.removeContact(id);
      return console.log(deletedContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
