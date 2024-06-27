import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import CharacterItem from './CharacterItem';

interface CharacterListProps {
    title: string,
    type: string,
    characters: Array<any>
}

const CharacterList = (props: CharacterListProps): React.JSX.Element => {

    const navigate = useNavigate()

    function searchMore() {
        const params = { tag: props.type };
        navigate({ pathname: '/explore/search', search: `?${createSearchParams(params)}` });
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                <h2 className='text-[24px] text-[#fff] font-medium'>
                    {props.title}
                </h2>
                <span className='text-[#5974ff] cursor-pointer'
                    onClick={() => searchMore()}
                >
                    More
                </span>
            </div>
            <div className='p-[1rem]'>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {
                        props.characters.map( (item, idx) => 
                            <CharacterItem key={idx} character={item} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CharacterList;