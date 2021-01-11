import { Client, GuildMember } from "discord.js";
import { readFileSync } from "fs";
import Knex from "knex";
import { CommandConfigJson, ConfigJson } from "./Interfaces";

export class Base {
   public static getConfig(): ConfigJson {
      return this.config;
   }

   public static getCmdConfig(): CommandConfigJson {
      return this.cmdConfig;
   }

   public static getKnex(): Knex {
      return this.knex;
   }

   public static getClient(): Client {
      return this.client;
   }

   public static isMe(member: GuildMember): boolean {
      return member.id === member.guild.me.id;
   }

   protected static config: ConfigJson = {
      token: process.env.QB_TOKEN,
      topGgToken: process.env.QB_TOP_GG_TOKEN,
      color: process.env.QB_COLOR,
      databaseType: process.env.QB_DB_TYPE,
      databaseHost: process.env.QB_DB_HOST,
      databaseName: process.env.QB_DB_NAME,
      databaseUsername: process.env.QB_DB_USERNAME,
      databasePassword: process.env.QB_DB_PASSWORD,
      gracePeriod: process.env.QB_GRACE_PERIOD,
      joinEmoji: process.env.QB_JOIN_EMOJI,
      permissionsRegexp: process.env.QB_PERMISSIONS_REGEXP,
      prefix: process.env.QB_PREFIX,
   };
   protected static cmdConfig: CommandConfigJson = {
      autofillCmd: process.env.QB_CMD_AUTOFILL,
      blacklistCmd: process.env.QB_CMD_BLACKLIST,
      cleanupCmd: process.env.QB_CMD_CLEANUP,
      clearCmd: process.env.QB_CMD_CLEAR,
      colorCmd: process.env.QB_CMD_COLOR,
      displayCmd: process.env.QB_CMD_DISPLAY,
      gracePeriodCmd: process.env.QB_CMD_GRACE_PERIOD,
      headerCmd: process.env.QB_CMD_HEADER,
      helpCmd: process.env.QB_CMD_HELP,
      joinCmd: process.env.QB_CMD_JOIN,
      kickCmd: process.env.QB_CMD_KICK,
      limitCmd: process.env.QB_CMD_LIMIT,
      mentionCmd: process.env.QB_CMD_MENTION,
      modeCmd: process.env.QB_CMD_MODE,
      myQueuesCmd: process.env.QB_CMD_MY_QUEUES,
      nextCmd: process.env.QB_CMD_NEXT,
      prefixCmd: process.env.QB_CMD_PREFIX,
      pullNumCmd: process.env.QB_CMD_PULL_NUM,
      queueCmd: process.env.QB_CMD_QUEUE,
      queueDeleteCmd: process.env.QB_CMD_QUEUE_DELETE,
      shuffleCmd: process.env.QB_CMD_SHUFFLE,
      startCmd: process.env.QB_CMD_START,
      whitelistCmd: process.env.QB_CMD_WHITELIST,
   };

   protected static knex = Knex({
      client: Base.config.databaseType,
      connection: {
         database: Base.config.databaseName,
         host: Base.config.databaseHost,
         password: Base.config.databasePassword,
         user: Base.config.databaseUsername,
      },
   });

   protected static client = new Client({
      messageCacheLifetime: 12 * 60 * 60, // Cache messages for 12 hours
      messageCacheMaxSize: 2, // Cache up to 2 messages per channel
      messageEditHistoryMaxSize: 0, // Do not cache edits
      messageSweepInterval: 1 * 60 * 60, // Sweep every hour
      partials: ["MESSAGE", "REACTION", "USER"],
      presence: {
         activity: {
            type: `LISTENING`,
            name: `${Base.config.prefix}${Base.cmdConfig.helpCmd}`,
         },
         status: "online",
      },
      ws: { intents: ["GUILDS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"] },
   });
}
