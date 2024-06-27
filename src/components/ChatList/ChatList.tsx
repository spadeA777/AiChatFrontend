import React from 'react';
import ChatItem from './ChatItem';

import { IChat } from '@/utils/types';
import PinSVG from '@/assets/images/icon/pin.svg'


interface ChatListProps {
    pinned: Array<IChat>,
    chats: Array<IChat>,
    selected: IChat | null,
}

const ChatList = (props: ChatListProps): React.JSX.Element => {

    return (
        <div className='flex flex-col gap-4 overflow-y-auto thin-scroll'>
            {
                props.pinned.length > 0 &&
                <div className='flex flex-col gap-2 '>
                    <div className='flex gap-1'>
                        <PinSVG />
                        <span className='text-[#8C9196]'>
                            Pinned Chats
                        </span>
                    </div>
                    {
                        props.chats.map( (item, idx) => 
                            <ChatItem key={idx} character={item.character} id={item._id}
                                isSelected={ props.selected != null && props.selected._id == item._id }
                            />
                        )
                    }
                </div>
            }
            {
                props.pinned.length > 0 &&
                <div className='h-[1px] bg-[#46484b]'></div>
            }
            <div className='flex flex-col gap-2 '>
                {
                    props.chats.map( (item, idx) => 
                        <ChatItem key={idx} character={item.character} id={item._id}
                            isSelected={ props.selected != null && props.selected._id == item._id }
                        />
                    )
                }
            </div>
        </div>
    )
}

export default ChatList;