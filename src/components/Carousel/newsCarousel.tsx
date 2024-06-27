import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { INews } from '@/utils/types';

interface NewsCarouselProps {
    news: Array<INews>,
}

const NewsCarousel = (props: NewsCarouselProps): React.JSX.Element => {

    return (
        <div className='w-full'>
            <Carousel
                centerMode
                infiniteLoop
                autoPlay
                interval={3000}
                transitionTime={500}
                showArrows={false}
                showThumbs={false}
                showStatus={false}
                centerSlidePercentage={70}
            >
                {
                    props.news.map( (item, idx) => 
                        <div key={idx} className={ `flex px-[1rem] items-center` }>
                            <div  className="w-full h-[160px] xl:h-[240px] flex flex-row lg:flex-col p-[2rem] xl:p-[2rem] justify-between rounded-[2rem] cursor-pointer" style={{ 
                                backgroundImage: 'url(' + item.img + ')',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <div className='flex flex-col gap-2 w-[240px] lg:w-[320px] xl:w-[360px] pt-0 xl:pt-[2rem]'>
                                    <h3 className="text-left text-[24px] xl:text-[32px] font-semibold">
                                        { item.title }
                                    </h3>
                                    <p className="text-left mt-0 xl:mt-[0.2rem]">
                                        { item.description }
                                    </p>
                                </div>
                                
                                <a className="w-fit h-fit px-[1rem] py-[0.5rem] rounded-[1rem] text-[#5974ff] bg-[#fff] no-underline" href={item.url}>
                                    { item.button }
                                </a>
                            </div>
                        </div>
                    )
                }
            </Carousel>
        </div>
    )
}

export default NewsCarousel;