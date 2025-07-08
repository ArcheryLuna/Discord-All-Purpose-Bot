import type CommandCategoryEnum from "types/CommandCategoryEnum";

export default interface ISlashCommandOptions {
  name: string;
  description: string;
  category: CommandCategoryEnum;
  options: object;
  default_member_permissions: bigint;
  dm_permission: boolean;
  cooldown: number;
}
