import { configureStore } from "@reduxjs/toolkit";
import actorSlice from "features/actor/actorSlice";
import websiteSlice from "features/website/websiteSlice";

export const store = configureStore({
    reducer:{
        actor: actorSlice,
        website: websiteSlice
    }
})