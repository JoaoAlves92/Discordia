import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import guilds from "./guilds";
import ws from "./middleware/ws";
import api from "./middleware/api";
import auth from "./auth";
import config from "./config";
import channels from "./channels";
import messages from "./messages";
import users from "./users";
import meta from "./meta";
import ui from "./ui";


export default () => configureStore<Store.AppStore>({
    middleware: [
        ...getDefaultMiddleware({serializableCheck: false}),
        ws,
        api
    ] as any,
    reducer: combineReducers({
        auth,
        config,
        entities: combineReducers({channels, guilds, messages, users}),
        meta,
        ui
    })
})