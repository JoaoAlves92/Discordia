import { Socket } from 'socket.io';
import { Guild } from '../../data/models/guild';
import { Invite } from '../../data/models/invite';
import { User } from '../../data/models/user';
import { WS } from '../websocket';
import { WSEvent } from './ws-event';

export default class implements WSEvent<'GUILD_MEMBER_ADD'> {
  public on = 'GUILD_MEMBER_ADD' as const;


  public async invoke({ io, sessions }: WS, client: Socket, { inviteCode }: API.WSPayload.GuildMemberAdd) {
    const invite = await Invite.findById(inviteCode);
    if (!invite)
      throw new TypeError('Invite not found');
    
    const userId = sessions.get(client.id);
    const guildId = invite.guildId;
    
    const user = (await User.findById(userId))!;
    if (user.guildIds.includes(guildId))
      throw new TypeError('You are already in this guild');

    user.guildIds.push(guildId);
    await user.save();

    invite.uses = invite.uses++ || 0;
    await invite.save();

    const guild = await Guild.findById(guildId);
    if (!guild)
      throw new TypeError('Guild not found');

    guild.members.push(user);
    await guild.save();

    io.to(invite.guildId)
      .emit('GUILD_MEMBER_ADD', { guildId, member: user } as API.WSResponse.GuildMemberAdd);

    await guild
      .populate({ path: 'channels' })
      .populate({ path: 'invites' })
      .populate({ path: 'members' })
      .execPopulate();

    await client.join(guild.id);
    for (const channel of guild.channels)
      await client.join(channel.id);

    client.emit('GUILD_CREATE', { guild } as API.WSResponse.GuildCreate);    
  }
}