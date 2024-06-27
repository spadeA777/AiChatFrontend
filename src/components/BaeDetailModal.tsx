import React, { useContext } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogBody,
} from "@material-tailwind/react";

import AppContext from '@/contexts/AppContext';
import { startChat } from '@/utils/axios';
import { ICharacter } from '@/utils/types';
import { LanguagesX } from '@/utils/constants';
import defaultAvatar from '@/assets/images/default.png';

function getLanguage(code: string) {
    for(let i = 0; i < LanguagesX.length; i++) {
        if(LanguagesX[i].code == code)
        return LanguagesX[i].name
    }
    return 'Undefined'
}

interface BaeDetailModalProps {
    character: ICharacter,
    isOpen: boolean,
    handler: () => void
}

const BaeDetailModal = (props: BaeDetailModalProps): React.JSX.Element => {
    const navigate = useNavigate();
    const { auth } = useContext(AppContext)

    function chat() {

        const data = {
            address: auth.state.address,
            chainId: auth.state.chainId,
            character: props.character._id
        }
        
        startChat(data).then( res => {
            if(res.status == 200) {
                const params = { id: res.data };
                navigate({ pathname: '/chat', search: `?${createSearchParams(params)}` });
                console.log('here if => ', res);
                
            } else {
                navigate('/chat')
                console.log('here else');
            }
        }).catch(err => {
            console.log(err)
            navigate('/chat')
        })
    }

    return (
        <Dialog  placeholder={undefined}
            className='bg-[#171717] outline-none rounded-[2rem]'
            size='md'
            animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0.9, y: -100 },
            }}
            open={ props.isOpen } handler={() => props.handler()}
        >
            <DialogBody placeholder={undefined} className='relative h-[40rem] flex flex-col p-0 rounded-[2rem] bg-[#171717] overflow-y-auto thin-scroll'>
                <div className='absolute right-4 top-4 flex gap-4'>
                </div>
                <div className='w-full h-[15rem] rounded-t-[2rem] bg-[#6ba790]'>
                    {
                        props.character.cover_img && (props.character.cover_img != "") && 
                        <img className='w-full h-full rounded-t-[2rem]' src={props.character.cover_img} alt='' />
                    }
                </div>
                <div className='relative w-full flex-grow rounded-b-[1rem]'>
                    <div className='absolute w-full h-[6rem] flex items-end justify-between -top-[3rem] px-[2rem]'>
                        <div className='flex items-end gap-4'>
                            <img className='w-[6rem] h-[6rem] rounded-[1rem] border-[1px] border-[#b8bccf]' src={!props.character.avatar_img || props.character.avatar_img == "" ? defaultAvatar : props.character.avatar_img} alt="" />
                            <span className='text-[#fff] text-[1.5rem]'>
                                {props.character.name}
                            </span>
                        </div>
                        <button className='text-[#fff] bg-[#5974ff] px-4 py-1 rounded-[2rem] outline-none'
                            onClick={() => chat()}
                        >
                            Chat
                        </button>
                    </div>
                    <div className='w-full flex flex-col gap-2 pt-[4rem] pb-[1rem] px-[1.5rem]'>
                        {/* tags */}
                        <div className='flex flex-wrap gap-2 text-[#fff]'>
                            {/* chat price */}
                            <div className='flex items-center text-[12px] px-2 py-1 rounded-md bg-[#454127]'>
                                <span>{`${props.character.price} $BAE`}</span>
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
                        <p>
                            {props.character.description}
                        </p>
                    </div>
                </div>
            </DialogBody>
        </Dialog>
    );
}

export default BaeDetailModal;