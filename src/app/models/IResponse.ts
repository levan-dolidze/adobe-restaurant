export class TokenIresponse<T>{
    id: any
    email: string;
    emailVerified: boolean
    isAnonymous: boolean
    providerData: Array<T>
    stsTokenManager: T;
    createdAt: any;
    lastLoginAt: any;
    apiKey: string;
    appName: string;

}