import React from 'react';
import BaeItem from './BaeItem';
import { ICharacter } from '@/utils/types';

interface BaeListProps {
    list: Array<any>,
    drafts: Array<any>,
    selected: ICharacter | null,
}

const BaeList = (props: BaeListProps): React.JSX.Element => {

    return (
        <div className='h-full flex flex-col gap-4 overflow-y-auto thin-scroll'>
            <div className='flex flex-col gap-2 '>
                {
                    props.list.map( (item, idx) => 
                        <BaeItem key={idx} character={item} id={item._id}
                            isSelected={ props.selected != null && props.selected._id == item._id }
                        />
                    )
                }
            </div>
            {
                props.drafts.length > 0 &&
                <div className='h-[1px] bg-[#46484b]'></div>
            }
            {
                props.drafts.length > 0 &&
                <div className='flex flex-col gap-[1rem]'>
                    <div className='flex gap-1'>
                        <span className='text-[#8C9196]'>
                            Drafts
                        </span>
                    </div>
                    {
                        props.drafts.map( (item, idx) => 
                            <BaeItem key={idx} character={item} id={item._id}
                                isSelected={ props.selected != null && props.selected._id == item._id }
                            />
                        )
                    }
                </div>
            }
            {
                (props.drafts.length == 0 && props.list.length == 0) &&
                <span>No created bae</span>
            }
        </div>
    )
}

export default BaeList;