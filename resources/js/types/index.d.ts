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
    categories?:ICategory[];
    variants?:IVariant[];
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
    created_at:string|null;
    updated_at:string|null;
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


export interface IVariant{
    id:number;
    store_id:number;
    name:string;
    value:string;
    store:IStore;
    created_at:string;
    updated_at:string;
}

export interface IProduct{
    id:number;
    store_id:number;
    category_id:number;
    name:string;
    price:number;
    is_featured:1|0;
    is_archived:1|0;
    created_at:string;
    updated_at:string;
    images:IImage[];
    store:IStore;
    category:ICategory;
}