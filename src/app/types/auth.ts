export interface IAuth {
     username: string;
     password: string;
}

export interface IResponseAuth {
     message: string,
     accessToken: string,
     refreshToken: string
}