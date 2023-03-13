export interface ISessionUser {
    uid_user: string;
    username: string;
}

export interface ISession {
    id: string;
    app: string;
    isAuth: boolean;
    user?: ISessionUser;
}

export interface IRequestContext {
    sessionId?: string; // Can be null if service to service call
    calledByApp?: string;
    calledByService?: string;
    user?: ISessionUser;
    roles: string[];
}

