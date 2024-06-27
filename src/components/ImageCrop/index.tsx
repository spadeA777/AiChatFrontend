import React, { useState, useRef } from 'react'
import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
} from 'react-image-crop'
import { imagePreview } from './imagePreview'
import 'react-image-crop/dist/ReactCrop.css';

import ImageAddSVG from '@/assets/images/icon/image_add.svg';
import defaultAvatar from '@/assets/images/default.png';

function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number,
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}
interface ImageCropProps {
    onSelected: (img: string) => void
}

export default function ImageCrop(props: ImageCropProps): React.JSX.Element {
    
    const [crop, setCrop] = useState<Crop>()
    const imgRef = useRef<HTMLImageElement>(null)
    const [avatarSrc, setAvatarSrc] = useState('')
    const [avatarImg, setAvatarImg] = useState<string | null>(null)
    const avatarRef = useRef<HTMLInputElement>(null)

    const [open, setOpen] = React.useState(false);

    function onSelectAvatar(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
          const reader = new FileReader()
          reader.addEventListener('load', () =>
            setAvatarSrc(reader.result?.toString() || ''),
          )
          reader.readAsDataURL(e.target.files[0])
          setOpen(true)
        }
        if(avatarRef.current) avatarRef.current.value = ""
    }

    async function onCompleteCrop(c: PixelCrop) {
        if(imgRef.current) {
            const src = await imagePreview(imgRef.current, c)
            setAvatarImg(src)
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget
        setCrop(centerAspectCrop(width, height, 1))
    }

    function onOK() {
        if(avatarImg) {
            props.onSelected(avatarImg)
            setOpen(false)
        } else {
            return
        } 
    }

    return (
        <div>
            <div className='relative w-[100px] h-[100px] rounded-full border-[#2b2e3b] border-[1px] cursor-pointer'>
                <input ref={avatarRef} type="file" accept="image/png, image/jpeg" className='hidden' onChange={onSelectAvatar} />
                <img className='w-full h-full rounded-full' alt="avatar" src={ avatarImg ? avatarImg : defaultAvatar} />
                <div className='absolute opacity-0 hover:opacity-100 top-0 left-0 w-full h-full flex justify-center items-center rounded-full bg-[#0007]' onClick={() => !!avatarRef.current && avatarRef.current.click()}>
                    <div className='scale-[2]'>
                        <ImageAddSVG />
                    </div>
                </div>
            </div>
            <Dialog open={ open } placeholder={undefined} handler={() =>{setOpen(false)}}>
                <DialogBody placeholder={undefined}>
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => onCompleteCrop(c)}
                        aspect={1}
                        minHeight={32}
                        circularCrop
                    >
                        <img
                            ref={imgRef}
                            alt="Crop avatar"
                            src={avatarSrc}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <div className="Crop-Controls">
                
                    </div>
                </DialogBody>
                <DialogFooter placeholder={undefined}>
                    <Button
                        className="mr-1"
                        variant="text"
                        color="red"
                        placeholder={undefined}
                        onClick={()=>{setOpen(false)}}
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button 
                        variant="gradient" 
                        color="green" 
                        onClick={()=> onOK()} 
                        placeholder={undefined}
                    >
                        <span>OK</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}