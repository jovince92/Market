import { ColumnDef } from '@tanstack/react-table';
import React from 'react'
import CategoryCellActions from './CategoryCellActions';


export type CategoryColumn = {
    id: number;
    name: string;
    billboardLabel:string;
    created_at: string;
}


export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "id",
        header: "Category ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "billboardLabel",
        header: "Billboard",
        cell:({row})=>row.original.billboardLabel
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        header: "Actions",
        id:"actions",
        cell:({row})=><CategoryCellActions data={row.original} />
    }
]