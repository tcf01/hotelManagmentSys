export function isLogin() {
    return ({
        type: "@@auth/IS_LOGIN" as "@@auth/IS_LOGIN",
    })
}

export function isLogout() {
    return ({
        type: "@@auth/IS_LOGOUT" as "@@auth/IS_LOGOUT"
    })
}

export function getRestoredUser() {
    return ({
        type: "@@auth/GET_RESTORED_USER" as "@@auth/GET_RESTORED_USER"
    })
}

type AuthActionCreator = typeof isLogin | typeof isLogout | typeof getRestoredUser
export type IAuthAction = ReturnType<AuthActionCreator>