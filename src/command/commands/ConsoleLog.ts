import Command from "../base/Command";

export default class ConsoleLog implements Command {
    public async execute() {
        console.log("Hello, World!");
    }
}