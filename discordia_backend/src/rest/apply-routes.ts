import { Express } from "express-serve-static-core";
import express from "express";
import { Guild } from "../data/models/guild";
import { Message } from "../data/models/message";
import { router as authRoutes } from "./routes/auth-routes";
import path from "path";
import { loggedIn, updateUser } from "./middleware";
import createError from "http-errors";

export default (app: Express) => {
  const prefix = process.env.API_PREFIX;

  app.get(`${prefix}/channels/:channelId/messages`, async (req, res, next) => {
    const userInGuild = await Guild.findOne({
      channels: req.params.channelId as any,
    });
    if (!userInGuild) return next(createError(401, "Insufficient access"));

    const messages = await Message.find({ channelId: req.params.channelId });
    res.json(messages);
  });

  app.get(`${prefix}/guilds`, loggedIn, updateUser, async (req, res) => {
    const user: Entity.User = res.locals.user;
    const guilds = await Guild.find({ _id: user.guildIds })
      .populate({ path: "channels" })
      .populate({ path: "invites" })
      .populate({ path: "members" })
      .exec();

    res.json(guilds);
  });

  app.get(`${prefix}/users`, loggedIn, updateUser, async (req, res) => {
    const user: Entity.User = res.locals.user;
    const guilds = await Guild.find({ _id: user.guildIds }).populate({
      path: "members",
    });

    const members = guilds
      .flatMap((g) => g.members)
      .map((u: any) => {
        u.email = undefined;
        u.locked = undefined;
        u.guildIds = undefined;
        return u;
      });

    res.json([...new Set(members.filter((u) => u.id))]);
  });

  app.use(`${prefix}/auth`, authRoutes);
  app.all(`${prefix}/*`, (req, res) =>
    res.status(404).json({ message: "Not Found" })
  );

  app.use((err, req, res, next) => res.json(err));

  const assetPath = path.resolve(`${__dirname}/../../assets`);
  app.use(`/assets`, express.static(assetPath));
  app.use(`/assets/*`, (req, res) =>
    res.sendFile(`${assetPath}/avatars/unknown.png`)
  );

  const buildPath = path.resolve(`${__dirname}/../../../frontend/build`);
  app.use(express.static(buildPath));
  app.all("*", (req, res) => res.sendFile(`${buildPath}/index.html`));
};
