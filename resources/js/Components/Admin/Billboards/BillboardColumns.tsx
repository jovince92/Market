import { ColumnDef } from "@tanstack/react-table"
import BillboardCellActions from "./BillboardCellActions";


export type BillboardColumn = {
    id: number
    label: string
    created_at: string;
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: "id",
        header: "Billboard ID",
    },
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        id:"actions",
        cell:({row})=><BillboardCellActions data={row.original} />
    }
]