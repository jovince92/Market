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
    current_store:IStore;
};

export interface IStore{
    id:number;
    name:string;
    user:User;
    categories:ICategory[];
    billboards:IBillboard[];
    created_at:string;
    updated_at:string;
}

export interface IBillboard{
    id:number;
    label:string;
    store:IStore;
    image:IImage;
    categories:ICategory[];
    created_at:string;
    updated_at:string;
}

export interface IImage{
    id:number;
    name:string;
    location:string;
    created_at:string;
    updated_at:string;
}


export interface ICategory{
    id:number;
    name:string;
    store:IStore;
    billboard:IBillboard;
    store_id:number;
    billboard_id:number;
    created_at:string;
    updated_at:string;
}