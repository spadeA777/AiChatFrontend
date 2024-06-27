import React, { useState } from 'react';
import BaeDetailModal from './BaeDetailModal';

import { LanguagesX } from '@/utils/constants';
import { ICharacter } from '@/utils/types';
import defaultAvatarImg from '@/assets/images/default.png'

function getLanguage(code: string) {
    for(let i = 0; i < LanguagesX.length; i++) {
        if(LanguagesX[i].code == code)
        return LanguagesX[i].name
    }
    return 'Undefined'
}

interface SearchItemProps {
    character: ICharacter
}

const SearchItem = (props: SearchItemProps): React.JSX.Element => {
    const [open, setOpen] = useState(false)

    return (
        <>
        <div className='flex flex-col gap-2 p-2 rounded-[1rem] bg-[#0000003b] hover:bg-[#0000008f] cursor-pointer' 
            onClick={() => setOpen(true)}
        >
            <img className='w-full rounded-[1rem]' src={
                props.character.avatar_img ?props.character.avatar_img : defaultAvatarImg
            } />
            <div className='flex flex-col gap-2 p-2'>
                <div className='flex justify-between '>
                    <span className='text-[1.2rem]'>
                        {
                            props.character.name
                        }
                    </span>
                    {/* follows */}
                    <div className=''></div>
                </div>
                {/* tags */}
                <div className='flex flex-wrap gap-2'>
                    {/* chat price */}
                    <div className='flex items-center text-[12px] px-2 py-1 rounded-md bg-[#454127]'>
                        <span>{`${props.character.price} BAE`}</span>
                    </div>
                    {/* language */}
                    <div className='text-[12px] px-2 py-1 rounded-md bg-[#093852]'>
                        {
                            getLanguage(props.character.lang)
                        }
                    </div>
                    {
                        props.character.tags.map( (item: string, idx) => 
                            <div key={idx} className={`text-[12px] px-2 py-1 rounded-md bg-[#612e2b]`}>
                                {item.toLocaleUpperCase()}
                            </div>
                        )
                    }
                </div>
                <div className='h-[4rem]'>
                    {
                        props.character.description
                    }
                </div>
            </div>
        </div>
        <BaeDetailModal character={props.character} isOpen={open} handler={() => setOpen(false)}/>
        </>
    )
}

export default SearchItem;