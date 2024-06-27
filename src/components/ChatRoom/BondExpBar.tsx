import React, { useEffect, useState } from 'react'
import HappySVG_0 from '@/assets/images/icon/happy_0.svg';
import HappySVG_1 from '@/assets/images/icon/happy_1.svg';
import HappySVG_2 from '@/assets/images/icon/happy_2.svg';
import HappySVG_3 from '@/assets/images/icon/happy_3.svg';
import HappySVG_4 from '@/assets/images/icon/happy_4.svg';
import ProgressBar from "@ramonak/react-progress-bar";

interface BondExpBarProps {
    bond: number;
}

export default function BondExpBar ( props: BondExpBarProps ) {

    const bondExpRange = [
        100, 300, 500, 700, 900
    ]
    
    const [ bondIndex, SetBondIndex] = useState(props.bond)

    const HappySVG = [
        <HappySVG_0 key='0' />,
        <HappySVG_1 key='1' />,
        <HappySVG_2 key='2' />,
        <HappySVG_3 key='3' />,
        <HappySVG_4 key='4' />,
    ]
    const getHappyIndex = (bond: number) => {
        for(let i = bondExpRange.length; i >= 0 ; i--) {
            if(bond >= bondExpRange[i]) {
                return i
            }
        }
        return 0
    }
    const getHappyScale = (bond: number) => {
        if(bond < 0) return 0
        if(bond > 1000) return 10
        return bond / 100
    }
    const getHappyColor = (bond: number) => {
        return `hsl(${ 25 * (getHappyScale(bond) - 1) } 70% 35% / 1)`;
    }

    useEffect(() => {
        const index = getHappyIndex(props.bond)
        console.log('bond => ', props.bond);
        
        SetBondIndex(index)
    }, [])

    return (
        <div className="happy-index relative flex items-center py-[6px]">
            <div className="flex gap-[30px] px-[30px] py-[6px] bg-[#1E2026] rounded-[110px] items-center">
                <ProgressBar className='absolute left-0 w-full' completed={props.bond} maxCompleted={1000} customLabel=' ' />
                {
                    HappySVG.map( (item, idx) => 
                        <div key={idx} className='opacity-[0.45]'>
                            {item}
                        </div>
                    )
                }
            </div>
            {
                <div className="absolute p-[6px] rounded-full" style={{ left: `${26 * getHappyScale(props.bond) - 14}px`, backgroundColor: `${getHappyColor(props.bond)}`}} >
                    <div className='active flex justify-center items-center w-[28px] h-[28px]'>
                        {HappySVG[bondIndex]}
                    </div>
                </div>
            }
        </div>
    )

}