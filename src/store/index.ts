import { createStore } from "vuex";
import { app } from "./app";
import { router } from "./router";
import { user } from "./user";

const store = createStore({
  modules: {
    app,
    router,
    user,
  },
});

export { store };
