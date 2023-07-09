import React, { FC } from 'react'
import { CategoryColumn } from './CategoryColumn'

interface CategoryCellActionsProps{
    data:CategoryColumn
}

const CategoryCellActions:FC<CategoryCellActionsProps> = ({data}) => {
    return (
        <div>CategoryCellActions</div>
    )
}

export default CategoryCellActions