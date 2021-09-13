const { Command } = require("commander");
const contactsOperations = require("./contacts");

// listContacts + ; getContactById - ; removeContact- ;addContact- ;

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "getContactsList":
      return console.table(await contactsOperations.listContacts());

    case "getContactById":
      return console.log(await contactsOperations.getContactById(id));

    case "add":
      // ... name email phone
      break;

    case "remove":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
