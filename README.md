# Debate-Queue-Bot

[![Discord Bots](https://top.gg/api/widget/status/679018301543677959.svg?noavatar=true)](https://top.gg/bot/679018301543677959)
[![BuyMeACoffee](https://img.shields.io/badge/BuyMeACoffee-Donate-ff9004.svg?logo=CoffeeScript&style=flat-square)](https://www.buymeacoffee.com/Arroww)
[![Discord Chat](https://img.shields.io/discord/678645128755150863?label=Discord&style=flat-square)](https://discord.gg/RbmfnP3)

Created to manage voice channel waiting rooms. This bot allows you to display the order of people waiting and easily pull them to another channel.  

## How to use
**Privileged users are the server owner, administrators, and users with any of the following roles: `mod`, `moderator`, `admin`, `administrator`.**  
1. **Create a Queue.** *Privileged users* can create queues with `!queue {channel name}` where `{channel name}` is the name of a text or voice channels. For example, `!queue Waiting Room` turns the Waiting Room voice channel into a queue.  
2. **Join a Queue.** Any user can join text queues by clicking the queue reaction or with `!join {channel name}`. Any user can join voice queues by joining the matching voice channel.  
3. **Pull Users From a Queue.**  
	**TEXT**: *Privileged* users can be pulled from a text queue with `!next {queue name}`.  
    **VOICE**: 1. `!start {queue name}` makes the bot join the voice channel. 2. Move the bot to a new (non-queue) channel to set a "target".  
   If the target channel has a user limit, (`!limit {queue name} {#}`), the bot will automatically move people from the queue to keep the target channel full. You can disconnect the bot from the voice channel.  
	If the target channel doesnt't have a user limit, you can move the bot to the target channel whenever you want to pull people from the queue (the bot will swap with them). You can customize how many people the bot will pull each time using `!pullnum {queue name} {#}`.    
4. **Customization.** *Privileged* users can customize the command prefix, message color, messaging mode, and how long people can leave a queue without losing their spot with the commands below.There are also additional commands to do things like shuffling and clearing queues.  

### Priviledged Commands
Priviliged commands are restricted to the server owner, administrators, and users with any of the following roles: `mod`, `moderator`, `admin`, `administrator`.  
If a command that expects a channel name is not given one, the current text channel will be used.  

| Function | Command | Default | Description |
|-|-|-|-|
| Create a Queue | `!queue {channel name} {OPTIONAL: size}` | | Create a queue. |
| List Queues | `!queue` | | List the names of the existing queues. | 
| Delete a Queue | `!delete {queue name}` | | Delete a queue. |
| Display a Queue | `!display {queue name}` | | Display the members in a queue. These messages stay updated. | 
| Pull from Voice | `!start {queue name}` | | Add the bot to a voice queue. Then the bot can be dragged into another channel to automatically pull the person(s) at the front of the queue. If the destination queue has a size limit, the bot will pull people until the limit is met. | 
| Pull from Text | `!next {queue name} {OPTIONAL: amount}` | |  Remove people from the text queue and displays their name. |
| Join | `!join {queue name} @{user 1} @{user 2}... {OPTIONAL: custom message}` | | Add one or more people to a queue. |
| Kick | `!kick {OPTIONAL: queue name} @{user 1} @{user 2} ...` | | Kick one or more people. If a queue name is given, it will kick from a single queue. Otherwise, it will kick people from every queue. |
| Clear | `!clear {queue name}` | | Clear a queue. |
| Shuffle | `!shuffle {queue name}` | | Shuffle a queue. |
| Set Queue Size Limit | `!limit {queue name} {#}` | | Set queue size limit. |
| Mention Queue | `!mention {queue name} {OPTIONAL: message}` | | Mention everyone in a queue. You can add a message too. |
| Blacklist | `!blacklist {queue name} @{user 1} @{user 2}...` | | Blacklist people from a queue. Use again to remove from blacklist. |
| List Blacklist | `!blacklist {queue name}` | | Display the blacklist for a queue. |
|||||
|**Channel Settings**|||
| Autofill | `!autofill {queue name} {on\off}` | `on` | Turn autofill on or off. |
| Pull Amount | `!pullnum {queue name} {#}` | `1` | Set the default number of people to pull. |
| Set Display Message Header | `!header {queue name} {message}` | | Set a header for display messaged. Leave `{header}` blank to remove. |
|||||
|**Server Settings**|||
| Set the Command Prefix | `!prefix {new prefix}` | in config | Set the prefix for Queue Bot commands. |
| Set the Color | `!color {new color}` | in config | Set the color of bot messages. |
| Set the Grace Period | `!grace {# seconds}` | `0` | Set how long a person can leave a queue before losing their spot. |
| Set the Display Mode | `!mode {#}` | `1` | Set how the display messages are updated. Use `!mode` to see the different update modes. |
| Command Cleanup | `!cleanup {on\off}` | `on` | Toggle the cleanup of user-sent Queue Bot commands. |

### Commands for Everyone

| Function | Command | Description |
|-|-|-|-|
| Join | `!join {queue name} {OPTIONAL: custom message}` | Join a queue a queue. |
| Help | `!help` | Get a help message. |
| My Queues | `!myqueues` | Display a member's position in of the each queue they have joined. |


![Example of `!s`](docs/example.gif)  

## How to setup your own Queue Bot hosting
1. [Create your Discord bot account](https://discordpy.readthedocs.io/en/latest/discord.html)  
2. Clone/download this repository  
3. Create a database for storing queues. Here's a the steps for Windows:  
	3a. [Download Postgresql](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)  
	3b. Run the installer. Use the default port. Skip Stack Builder. Remember the password you set, you will need it later.  
	3c. Open Windows start menu, search for and open SQL Shell (psql).  
	3d. Leave the default login values for Server, Database, Port, and Username.  
	3e. Enter the password you chose during installation.  
	3f. Create a new database. (The semicolon is important):  
		`CREATE DATABASE queue;`  
	3g. Close command prompt.  
4. Open the Queue Bot folder.  
5. Modify config environment variables:  
	Copy `.env.sample` to `.env` to modify the environment config through a file. This file is gitignored.

	Environment variables are prefixed with `QB_`

	If you followed all of Step 3, you only need to update the REQUIRED fields in the table below.  
  
| REQUIRED Config Fields | Description                                                                                                                       | Default      |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|-|
| QB_PREFIX                 | Command prefix                                                                                                                    | `!` |
| QB_TOKEN                  | Bot token. Found in the Discord Developer Portal for the bot you created in Step 1. See image of token location below this table. | |
| QB_DB_PASSWORD       | Database login password                                                                                                           | |
  
| Optional Config Fields | Description                                                                                                                       | |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|-|
| QB_COLOR                  | The color of bot messages.                                                                                                        | |
| QB_DB_USERNAME		 | Database login username                                                                                                           | `postgres` |
| QB_DB_NAME           | Database name                                                                                                                     | `queue` |
| QB_DB_HOST           | Database host url                                                                                                                 | `localhost` |
| QB_DB_TYPE           | Type of database for queue storage.                                                                                               | `postgresql` |
| QB_GRACE_PERIOD            | Number of seconds a user can leave the queue without being removed                                                                | `0` |
| QB_PERMISSIONS_REGEXP      | What server roles can use bot commands. Uses RegExp. Accepts "mod" and "mods" by default.                                         | `\\bmod(erator)?s?\\b|\\badmin(istrator)?s?\\b` |
| QB_TOP_GG_TOKEN             | Token for updating top.gg server count. This should be left blank.                                                                | |

| Config Command Fields  | Description                                                                                                                       | |
|------------------------|-----------------------------------------------------------------------------------------------------------------------------------|-|
| QB_CMD_AUTOFILL            | Command to toggle autofill.                                                                                                       | `autofill` |
| QB_CMD_BLACKLIST           | Command to set and display blacklist.                                                                                             | `blacklist` |
| QB_CMD_CLEANUP             | Command to toggle command cleanup.                                                                                                | `cleanup` |
| QB_CMD_CLEAR               | Command to clear the queue.                                                                                                       | `clear` |
| QB_CMD_COLOR               | Command to set the color.                                                                                                         | `color` |
| QB_CMD_DISPLAY             | Command to display a queue in a text channel.                                                                                     | `display` |
| QB_CMD_GRACE_PERIOD         | Command to set the grace period.                                                                                                  | `grace` |
| QB_CMD_HEADER              | Command to set the header of a queue.                                                                                             | `header` |
| QB_CMD_HELP                | Command to display the help information.                                                                                          | `help` |
| QB_CMD_JOIN                | Command to join a text channel queue.                                                                                             | `join` |
| QB_CMD_KICK                | Command to kick users from a queue.                                                                                               | `kick` |
| QB_CMD_LIMIT               | Command to set queue size limit.                                                                                                  | `limit` |
| QB_CMD_MENTION             | Command to mention all users in a queue.                                                                                          | `mention` |
| QB_CMD_MODE                | Command to set the display messaging mode.                                                                                        | `mode` |
| QB_CMD_MY_QUEUES            | Command to display a member's position in each queue they have joined.                                                            | `myqueues` |
| QB_CMD_NEXT                | Command to pull the next user from a text channel.                                                                                | `next` |
| QB_CMD_PREFIX              | Command to set the command prefix.                                                                                                | `prefix` |
| QB_CMD_PULL_NUM             | Command to set the number of people pulled at once.                                                                               | `pullnum` |
| QB_CMD_QUEUE               | Command to create / list queues.                                                                                                  | `queue` |
| QB_CMD_QUEUE_DELETE         | Command to delete a queues.                                                                                                       | `delete` |
| QB_CMD_SHUFFLE             | Command to shuffle the queue.                                                                                                     | `shuffle` |
| QB_CMD_START               | Command to make the bot join a voice channel.                                                                                     | `start` |

![Token Location](docs/token_location.PNG)  

1. [Install NodeJS 12+](https://discordjs.guide/preparations/#installing-node-js)  
2. Install Dependencies. Open commmand prompt in project directory (If you have the project open in file explorer, click on the directory bar, enter `cmd`, and hit enter). Enter `npm i` into command prompt. Keep the command prompt open.  
3. Start the Bot. Enter `npm start` into command prompt. 

   Use `npm run dev` to have the bot autoreload on code change. 

   If you get an error at boot, there is something wrong in your config.json. When you close command prompt, the bot will stop.