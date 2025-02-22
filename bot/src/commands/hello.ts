import type { SlackApp } from "slack-edge";
import { slackApp, slackClient } from "../..";
import { treaty } from "@elysiajs/eden"
import type { App } from "../../../api/src/index"
import type { Command } from "../modules/commandHandler";

// What the hell, Typescript?
// @ts-expect-error Type App doesn't satisfy type App for some obscure reason
const app = treaty<App>("localhost:3101")

const { data } = await app.hello.get();

const hello: Command = {
    name: "/hello",
    description: "Waves at you!",

    run(app: SlackApp<any>) {
        app.command(this.name, 
            async (req) => {},
            async ({ context: { respond } }) => {
                await respond({
                    text: data!, // TODO: error handling lmaooo
                });
            });
    }
};

export default hello;