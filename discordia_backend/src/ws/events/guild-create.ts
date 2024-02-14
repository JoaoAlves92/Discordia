import { WSEvent } from './ws-event';
import { Socket } from 'socket.io';
import { WS } from '../websocket';
import { Guild } from '../../data/models/guild';
import { Channel } from '../../data/models/channel';
import { User } from '../../data/models/user';

export default class implements WSEvent<'GUILD_CREATE'> {
  public on = 'GUILD_CREATE' as const;

  public async invoke({ sessions }: WS, client: Socket, params: API.WSPayload.GuildCreate) {
    const ownerId = sessions.get(client.id);
    const guild = new Guild({ name: params.name, ownerId });

    const systemChannel = await Channel.create({
      name: 'geral',
      guildId: guild.id,
    });
    const selfMember = (await User.findById(ownerId))!;
    selfMember.guildIds.push(guild.id);
    await selfMember.save();
    
    guild.channels.push(systemChannel);
    guild.members.push(selfMember);
    await guild.save();
    
    await client.join(guild.id);
    for (const channel of guild.channels)
      await client.join(channel.id);

    client.emit('GUILD_CREATE', { guild } as API.WSResponse.GuildCreate);
  }
}