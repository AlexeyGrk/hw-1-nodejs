const { Command } = require("commander");
const contactsOperations = require("./contacts.js");

// listContacts + ; getContactById + ; removeContact+ ;addContact+ ;
function myParseInt(value, dummyPrevious) {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidArgumentError("Not a number.");
  }
  return parsedValue;
}
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id", myParseInt)
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "getContactsList":
        return console.table(await contactsOperations.listContacts());

      case "getContactById":
        return console.log(await contactsOperations.getContactById(id));

      case "addContact":
        return console.log(
          await contactsOperations.addContact({ name, email, phone, id })
        );

      case "removeContact":
        return console.log(await contactsOperations.removeContact(id));

      case "update":
        return await contactsOperations.updateContact();

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    return error.message;
  }
};

invokeAction(argv);
