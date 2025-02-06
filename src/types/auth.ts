export type IAuth = {
     username: string;
     password: string;
}

export type IResponseAuth = {
     message: string,
     accessToken: string,
     refreshToken: string
}