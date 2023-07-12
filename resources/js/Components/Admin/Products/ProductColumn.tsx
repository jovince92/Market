import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import ProductCellAction from './ProductCellAction';



export type ProductColumn = {
    id: number;
    name: string;
    price:number;
    category:string;
    created_at: string;
}


export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "id",
        header: "Product ID",
    },
    
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
        cell:({row})=>row.original.price
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        header: "Actions",
        id:"actions",
        cell:({row})=><ProductCellAction data={row.original} />
    }
]

