
import React, { useState, useContext } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import Carousel from "react-simply-carousel";
import AppContext from '@/contexts/AppContext';
import { startChat } from '@/utils/axios';
import { ICharacter } from '@/utils/types';

import defaultAvatar from '@/assets/images/default.png';

interface FeatureCarouselProps {
    characters: Array<ICharacter>,
}

const FeatureCarousel = (props: FeatureCarouselProps): React.JSX.Element => {
    const navigate = useNavigate()
    const { auth } = useContext(AppContext)
    const [activeSlideIndex, setActiveSlideIndex] = useState(0)

    function chat(character_id: any) {
        const data = {
            address: auth.state.address,
            chainId: auth.state.chainId,
            character: character_id
        }
        startChat(data).then( res => {
            if(res.status == 200) {
                const params = { id: res.data };
                navigate({ pathname: '/chat', search: `?${createSearchParams(params)}` });
            } else {
                navigate('/chat')
            }
        }).catch(err => {
            console.log(err)
            navigate('/chat')
        })
    }

    function searchMore() {
        const params = { tag: 'featured' };
        navigate({ pathname: '/explore/search', search: `?${createSearchParams(params)}` });
    }


    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
                <span className='text-[#5974ff] cursor-pointer'
                    onClick={() => searchMore()}
                >
                    More
                </span>
            </div>
            <div className='w-full flex'>
                <Carousel
                    itemsToShow={4}
                    activeSlideIndex={activeSlideIndex}
                    onRequestChange={setActiveSlideIndex}
                >
                    {
                        props.characters.map( (item, idx) => 
                            <div key={idx} className="flex items-center px-2">
                                <div className='w-[320px] h-[280px] flex flex-col rounded-[1.5rem] cursor-pointer' style={{ 
                                    backgroundImage: 'url(https://res.cloudinary.com/dtysxszqe/image/upload/v1703229724/mtsdwadts1yhvzmcr3wv.png)',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                    <div className='h-[200px] flex flex-col justify-end p-2 rounded-t-[1.5rem] '>
                                        <span className='text-[24px] font-medium'>
                                            Featured
                                        </span>
                                    </div>
                                    <div className='flex items-center justify-between flex-grow px-4 bg-[#000d] rounded-b-[1.5rem]'>
                                        <div className='flex gap-1'>
                                            <img className='w-[60px] h-[60px] rounded-[1rem]'
                                                src={!item.avatar_img || item.avatar_img == "" ? defaultAvatar : item.avatar_img} alt='' 
                                            />
                                            <div className='flex flex-col justify-end p-2'>
                                                <span>
                                                    {item.name}
                                                </span>
                                            </div>
                                            
                                        </div>
                                        <button className='rounded-[1rem] bg-[#15152d] hover:bg-[#5974ff] px-3 py-2'
                                            onClick={() => chat(item._id)}
                                        >
                                            Chat
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default FeatureCarousel;