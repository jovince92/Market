import { IImage } from '@/types';
import React, { ChangeEventHandler, FC,  MouseEvent,   useMemo,   useState } from 'react'
import { Button } from '../ui/button';
import { Check, ImagePlus, Trash } from 'lucide-react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface ImageUploadProps  {
    image:number;
    images?:IImage[];
    disabled?:boolean;
    onChange:(imageId:number)=>void;
    handleUpload:(image:File)=>void;
    onRemove:(id:number)=>void
}

const ImageUpload:FC<ImageUploadProps> = ({image,handleUpload,images=[],disabled,onChange,onRemove}) => {    const [previews,setPreviews] = useState<IImage[]>(images);

    const onFileSelect:ChangeEventHandler<HTMLInputElement> = (e) =>{
        if(!e.target.files||e.target.files?.length<1) return null;
        handleUpload(e.target.files[0]);
    }

    const handleRemove = (id:number,e: MouseEvent<HTMLButtonElement>) =>{
        e.stopPropagation();
        onRemove(id);
    }

    return (
        <>
            <div className='flex mb-3.5 items-center gap-3.5 '>
                {
                    previews&&previews.map(({id,name,location})=>(
                        <div key={id} className={cn('relative w-52 h-52 rounded-md overflow-hidden scale-100',
                            image===id&&'ring-2 ring-sky-400 shadow-lg shadow-sky-400 transition duration-500 scale-105'
                            )}>
                            <div className='z-10 absolute top-2 right-2 flex items-center space-x-3.5'>
                                <Button variant='destructive' size='icon' type='button' onClick={(e)=>handleRemove(id,e)}> <Trash className='h-3.5 w-3.5' /> </Button>
                            </div>

                            <img onClick={()=>onChange(id)} className='cursor-pointer object-cover hover:scale-105 transition duration-200 w-full h-full' alt={name} src={location}  />
                        </div>
                    ))
                }
            </div>
            
                <Button disabled={disabled} className='p-0' type='button' variant='outline'>
                    <label className=' cursor-pointer w-full h-full mx-2.5 py-1.5 flex items-center' htmlFor="image_upload">
                        <ImagePlus className='h-3.5 w-3.5 mr-1.5' />
                        Upload an Image...
                    </label>
                    <input accept=".png,.jpeg,.jpg,.webp," onChange={onFileSelect} id='image_upload' type="file" className='hidden'  />
                    
                </Button>
            
            
        </>
    )
}

export default ImageUpload