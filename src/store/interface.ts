import { IAppState } from "./app";
import { IUserState } from "./user";
import { IHistoryState } from "./router";

interface IGlobalState {
    app: IAppState;
    user: IUserState;
    router: IHistoryState;
}

export { IGlobalState };
