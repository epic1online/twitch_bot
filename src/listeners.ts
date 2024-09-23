import { commands } from './stock_commands';
import { chatClient } from "./client";

chatClient.onMessage((channel, user, text, msg) => {
    if (!text.startsWith('!')) return;
    const args = text.toLowerCase().slice(1).split(' ');
    const command = args.shift();
    if (commands.hasOwnProperty(command)) {
        if (commands[command].canExecute(msg.channelId, msg.userInfo.userId)[0]) {
            commands[command].execute(channel, msg.channelId, chatClient, msg.userInfo, args);
        } else {
            chatClient.say(channel, `that command isn't ready yet. (${commands[command].canExecute(msg.channelId, msg.userInfo.userId)[1]} seconds)`);
        }
    }
});

// import { pubSubClient} from "./client";
// import * as balance from "./balance_manager";

// const channelId = '405990924';

// pubSubClient.onRedemption(channelId, (msg) => {
//     if (process.env.DEBUG === "true") console.log(`[${msg.redemptionDate.toTimeString().slice(0, 5)}] info: #[${msg.channelId}] <${msg.userName}> redeemed '${msg.rewardTitle}: ${msg.rewardPrompt}'`);
//     if (!(msg.rewardTitle.toLowerCase() == 'convert to tokens')) return;
//     const amount = parseInt(msg.rewardPrompt.toLowerCase().split(' ')[1]);
//     balance.add(msg.channelId, msg.userId, amount);
//     chatClient.say('epic1online', `@${msg.userDisplayName}, ${amount} tokens have been added to your balance`);
// });