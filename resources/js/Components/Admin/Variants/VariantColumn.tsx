import { ColumnDef } from '@tanstack/react-table';
import React, { FC } from 'react'
import VariantCellActions from './VariantCellActions';


export type VariantColumn = {
    id: number;
    name: string;
    value:string;
    created_at: string;
}


export const columns: ColumnDef<VariantColumn>[] = [
    {
        accessorKey: "id",
        header: "Variant ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "value",
        header: "Value",
        cell:({row})=>row.original.value
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        header: "Actions",
        id:"actions",
        cell:({row})=><VariantCellActions data={row.original} />
    }
]