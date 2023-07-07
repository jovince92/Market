export interface User {
    id: number;
    level:0|1;
    name: string;
    email: string;
    email_verified_at: string;
    google_id:string|null;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
        my_stores:IStore[];
    };


};

export interface IStore{
    id:number;
    name:string;
    user:User;
    created_at:string;
    updated_at:string;
}
