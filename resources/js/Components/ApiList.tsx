import React, { FC, useMemo } from 'react'
import ApiAlert from './Admin/Settings/ApiAlert';

interface ApiList{
    entityName:string;
    entityId?:string|undefined;
}



const ApiList:FC<ApiList> = ({entityId,entityName}) => {
    const description = useMemo(()=>!entityId?entityName:entityName+`&${entityId}={${entityId}}`,[entityId,entityName])
    return (
        <>
            <ApiAlert title='GET' variant='public' description={description} />
        </>
    )
}

export default ApiList