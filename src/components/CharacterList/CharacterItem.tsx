import React, { useState } from 'react';
import BaeDetailModal from '@/components/BaeDetailModal';

import { ICharacter } from '@/utils/types';
import defaultAvatar from '@/assets/images/default.png';

interface CharacterItemProps {
    character: ICharacter,
}

const CharacterItem = (props: CharacterItemProps): React.JSX.Element => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className='flex flex-col w-full items-center gap-2 cursor-pointer' onClick={() => {setOpen(true)}}>
                <div className="relative w-[128px] h-[128px] rounded-[1rem] flex-shrink-0 bg-gray-800">
                    <img className='w-[128px] h-[128px] rounded-[1rem]'
                        src={!props.character.avatar_img || props.character.avatar_img == "" ? defaultAvatar : props.character.avatar_img } alt='' 
                    />
                </div>
                <div className='flex-grow flex flex-col justify-between py-1'>
                    {/* <p className='text-[#fff] text-left capitalize bg-transparent' style={{
                        display: '-webkit-box',
                        overflow: 'hidden',
                        lineClamp: '2',
                        boxOrient: 'vertical',
                        textOverflow: '...'
                    }}>
                        { props.character.description }
                    </p> */}
                    <span className='text-[#b8bccf] text-[14px] capitalize'>
                        { props.character.name }
                    </span>
                </div>
            </div>
            <BaeDetailModal character={props.character} isOpen={open} handler={() => setOpen(false)}/>
        </>
        
    );
}

export default CharacterItem;