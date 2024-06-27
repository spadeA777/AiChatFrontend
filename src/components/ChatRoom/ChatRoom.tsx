import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Popover } from 'react-tiny-popover'

import SettingPopover from "./ChatSettingPopover";

import useDidStream from "@/utils/streaming_did";
import useLive2d from '@/utils/live2d';
import Socket from '@/utils/socket';
import AppContext from '@/contexts/AppContext';

import AnimeSVG from '@/assets/images/icon/anime.svg';
import MicSVG from '@/assets/images/icon/mic.svg';
import CogSVG from '@/assets/images/icon/cog.svg';
import SendSVG from '@/assets/images/icon/send.svg';
import ArrowLeft from '@/assets/images/icon/arrow_left.svg';
import defaultAvatar from '@/assets/images/default.png';
import HappySVG_0 from '@/assets/images/icon/happy_0.svg';
import HappySVG_1 from '@/assets/images/icon/happy_1.svg';
import HappySVG_2 from '@/assets/images/icon/happy_2.svg';
import HappySVG_3 from '@/assets/images/icon/happy_3.svg';
import HappySVG_4 from '@/assets/images/icon/happy_4.svg';
import ProgressBar from "@ramonak/react-progress-bar";
import './Progressbar.css';

import { getSpeechUrl } from '@/utils/azureSpeech';
import { ICharacter, IChat } from "@/utils/types";
import { EmotionList, emotionalExp } from "@/utils/constants";
import GifImage from "./GifImage";

interface ChatRoomProps {
    chat: IChat
}


// TODO - general chat style
// TODO - users allow to assign motions to emotion reply in character creation setting
const ChatRoom = ({ chat }: ChatRoomProps): React.JSX.Element => {
    const gift = require('./gift.gif');
    const navigate = useNavigate()
    const { config, auth } = useContext(AppContext);
    const [isReady, setIsReady] = useState(false);
    const [isAnime, setIsAnime] = useState(true);
    const [caption, setCaption] = useState<string | null>(null);
    const messageRef = useRef<HTMLInputElement>(null);
    const bond = useRef(500)
    const last_chat = useRef<any>({})

    const [character, setCharacter] = useState<ICharacter | null>(null)

    const [bondExp, setBondExp] = useState(500)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [ bondIndex, SetBondIndex] = useState(2)
    const [msgIndex, setMsgIndex] = useState(2)
    const [complete, setComplete] = useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const HappySVG = [
        <HappySVG_0 key='0' />,
        <HappySVG_1 key='1' />,
        <HappySVG_2 key='2' />,
        <HappySVG_3 key='3' />,
        <HappySVG_4 key='4' />,
    ]

    const bondExpRange = [
        100, 300, 500, 700, 900
    ]

    const getHappyIndex = (bond: number) => {
        let res = 0
        for(let i = bondExpRange.length; i >= 0 ; i--) {
            if(bond >= bondExpRange[i]) {
                res = i
                break
            }
        }
        return res
    }
    const getHappyScale = (bond: number) => {
        if(bond < 0) return 0
        if(bond > 1000) return 10
        return bond / 100
    }
    const getHappyColor = (bond: number) => {
        return `hsl(${ 25 * (getHappyScale(bond) - 1) } 70% 35% / 1)`;
    }

    const { 
        talkVideo,
        talkDid,
        initDid,
        connectDid,
        destoryDid,
        setDidTalkStartCallback,
        setDidTalkEndCallback,
    } = useDidStream();

    const {
        initializeLive2D,
        releaseLive2D,
        talkLive2D,
        setLive2DTalkStartCallback,
        setLive2DTalkEndCallback
    } = useLive2d();

    function playAudio() {
        const audio_voice: any = document.getElementById("voice")
        if(audio_voice && audio_voice.getAttribute('src') != null && audio_voice.getAttribute('src') != '') {
            audio_voice.play()
        }
    }

    function removeAudio() {
        const audio_voice = document.getElementById("voice")
        if(audio_voice) audio_voice.removeAttribute('src')
    }

    const sendTextMessage = (text: string | undefined) => {
        if(text) {
            removeAudio()
            console.log('chat content => ', text);
            
            Socket.emit('chat', {
                chat_id : chat._id,
                message : text
            })
        }
    };

    const analyzeReply = (response: any) => {

        const temp = response.split('##')
        const emotion = temp[1] ? temp[1] : 'normal'
        const message = temp[2] ? temp[2] : response
        // TODO: update emotional chats - emotional evolution linear profile or curved profile
        if(emotion) {
            const index = EmotionList.indexOf(emotion)
            setMsgIndex(index)
            bond.current += index == -1 ? 0 : emotionalExp[index]
            console.log("setBondExp related to bond.current: ", bond.current);
            setBondExp(bond.current)
        }
        return message
    }

    useEffect(() => {
        if (!browserSupportsSpeechRecognition) {
            console.log("Browser doesn't support speech recognition.")
        }
        setIsReady(false)
        setIsAnime(true)
        setCaption(null)
        setCharacter(chat.character)

        console.log("setBondExp related to chat._id: ", chat);
        setBondExp(chat.bond)
        last_chat.current = chat.last_chat

    }, [chat._id]);

    useEffect(() => {
        const index = getHappyIndex(bondExp)
        console.log("bondExp: ", bondExp);
        
        SetBondIndex(index)
        if(bondExp >= 1000) {
            setComplete(true)
        }
    }, [bondExp, chat._id])

    useEffect(() => {
        if(!character) return

        if(isAnime) {
            if(character.type === 'DID') {
                initDid(character);
                connectDid();
                setDidTalkEndCallback(() => {
                    setCaption(null);
                })
            } else if(character.type === 'Live2d') {
                initializeLive2D(character)
                setLive2DTalkEndCallback(() => {
                    setCaption(null);
                })
            }
        }
        
        Socket.emit('init_bot', {
            chat_id: chat._id
        })

        Socket.on('@ready', (res: boolean) => {
            setIsReady(res)
            if(character.intro) {
                if(isAnime) {
                    if(character.type === 'DID') {
                        setDidTalkStartCallback(() => {
                            setCaption(character.intro)
                        })
                        setDidTalkStartCallback(() => {
                            setCaption(character.intro)
                        })
                        talkDid(character.intro);
                    } else if(character.type === 'Live2d') {
                        setLive2DTalkStartCallback(() => {
                            setCaption(character.intro)
                        })
                        talkLive2D(character.intro, 'normal', character.lang, character.voice)
                    }
                } else {
                    setCaption(character.intro)
                    getSpeechUrl(character.lang, character.voice, character.intro).then( url => {
                        if(url && config.state.audioAutoplay) {
                            playAudio()
                        }
                    })
                }
            }
        })

        Socket.on('@response', (res: any) => {
            console.log(res)
            if(res.message && res.message !== '') {
                const message = analyzeReply(res.message)
                if(isAnime) {
                    if(character.type === 'DID') {
                        setDidTalkStartCallback(() => {
                            setCaption(res.message)
                        })
                        talkDid(res.message);
                    } else if(character.type === 'Live2d') {
                        setLive2DTalkStartCallback(() => {
                            setCaption(res.message)
                        })
                        talkLive2D(res.message, res.emotion, character.lang, character.voice)
                    }
                } else {
                    setCaption(message)
                    getSpeechUrl(character.lang, character.voice, res.message).then( url => {
                        if(url && config.state.audioAutoplay) {
                            playAudio()
                        }
                    })
                }
            }
        });

        return () => {
            if(!character) return
            Socket.off('@ready')
            Socket.off('@response');
            removeAudio();
            setCaption(null)
            if(isAnime) {
                destoryDid();
                releaseLive2D();
                setDidTalkStartCallback(() => {
                    setCaption(null)
                })
                setDidTalkStartCallback(() => {
                    setCaption(null)
                })
            }
        }

    }, [character, isAnime])

    return (
    <div className="h-full flex flex-col justify-between gap-[1rem]">
        <div className="w-full h-[80px] flex justify-between items-center bg-[#0d0d0d] rounded-bl-[20px] px-[25px] py-[21px]">
            <div className="flex items-center gap-[6px]">
                <div className=" lg:hidden cursor-pointer" onClick={() => navigate("/chat")}>
                    <ArrowLeft />
                </div>
                {/* <BondExpBar bond={bondExp} /> */}
                <div className="happy-index relative flex items-center py-[6px]">
                    <div className="flex gap-[30px] px-[30px] py-[6px] bg-[#1E2026] rounded-[110px] items-center">
                        <ProgressBar 
                            className='absolute left-0 w-full' 
                            completed={bondExp} 
                            maxCompleted={1000} 
                            barContainerClassName="progressbarContainer"
                            customLabel=' ' 
                        />
                        {
                            HappySVG.map( (item, idx) => 
                                <div key={idx} className='opacity-[0.45]'>
                                    {item}
                                </div>
                            )
                        }
                    </div>
                    {
                            <div className="absolute p-[6px] rounded-full" style={{ left: `${26 * getHappyScale(bondExp)-20}px`, backgroundColor: `${getHappyColor(bondExp)}`}} >
                                <div className='active flex justify-center items-center w-[28px] h-[28px]'>
                                    {HappySVG[bondIndex]}
                                </div>
                                <div className="text-xs text-center">{bondExp}</div>
                            </div>
                    }   
                </div>
                {
                    complete && <div className=" ml-8">
                        <GifImage src={gift} alt="" />
                    </div>
                }
            </div>
            <div className="flex gap-[40px]">
                {/* TODO - more buttons - character info, trending, maximize buttons */}
                {
                    character && (character.type == "Live2d" || character.type == "DID") &&
                    <div className="cursor-pointer" onClick={() => setIsAnime(!isAnime)}>
                        <AnimeSVG style={{ stroke: isAnime ? "#5974ff" : "#fff"}}/>
                    </div>
                }
                <Popover
                    isOpen={isSettingsOpen}
                    positions={['bottom', 'left']}
                    padding={10}
                    reposition={true} 
                    onClickOutside={() => setIsSettingsOpen(false)}
                    content={({position, childRect, popoverRect}) =>
                        <SettingPopover position={position} childRect={childRect} popoverRect={popoverRect} />
                    }
                >
                    <div className="cursor-pointer" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                        <CogSVG />
                    </div>
                </Popover>
            </div>
        </div>
        <div className="w-full flex-grow flex flex-col pr-[1rem]">
            <div className="relative w-full aspect-auto flex-grow flex justify-center items-start overflow-hidden rounded-[20px] border-[1px] border-[#0004] bg-[#000b]">
                {
                    character && !isAnime &&
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="rounded-full border-[2px] border-[#555555]">
                            <img className="w-[256px] h-[256px] rounded-full cursor-pointer m-1" src={!character.avatar_img || character.avatar_img == "" ? defaultAvatar : character.avatar_img }alt={character.name} 
                                onClick={() => playAudio()}
                            />
                        </div>
                    </div>
                }
                
                {
                    character && isAnime && character.type === 'DID' &&
                    <video ref={talkVideo} autoPlay muted playsInline className="absolute top-0 left-0 h-full w-full object-cover object-top"></video>
                }
                {
                    character && isAnime && character.type === 'Live2d' &&
                    <div id="live2d-container" className='absolute top-0 left-0 h-full w-full object-cover object-top'>
                        <canvas id="live2d" className='w-full h-full rounded-[20px]'></canvas>
                    </div>
                }
                
                {
                    config.state.caption && (caption != null || transcript !== '') && (
                        <div className="absolute bottom-2 text-[#fff] bg-[#0004] rounded-[10px] px-[16px] py-[10px] mx-auto flex items-center"
                            style={{
                                maxWidth: 'calc(100% - 4rem)'
                            }}
                        >
                            <div className=" text-lg mr-3">{HappySVG[msgIndex]}</div>
                            { caption ? caption : transcript } 
                        </div>
                    )
                }
            </div>
            
            <div className="h-[70px] flex items-center gap-[12px] px-[14px] my-[1rem] bg-[#26282F] rounded-[20px]">
                <input ref={messageRef}
                    className="flex-grow h-full pl-[20px] bg-transparent outline-none caret-[#E23D3D] text-[#fff] leading-[24px]"
                    placeholder="Type here"
                    disabled={!isReady}
                    onKeyUp={ (evt) => {
                        if(evt.key === 'Enter') {
                            if(messageRef.current) {
                                sendTextMessage(messageRef.current.value);
                                messageRef.current.value = '';
                            }
                        }
                    }}
                />
                {
                    <button className={`p-[10px] rounded-full ${listening && 'bg-[#0e0e0e]'}`}
                        disabled={!isReady}
                        onTouchStart={() => {
                            SpeechRecognition.startListening({ continuous: true, language: config.state.lang });
                        }}
                        onTouchEnd={() => {
                            SpeechRecognition.stopListening();
                            setTimeout(() => {
                                resetTranscript();
                                setCaption(null)
                            }, 1000);
                            sendTextMessage(transcript);
                        }}
                        onMouseDown={() => {
                            SpeechRecognition.startListening({ continuous: true, language: config.state.lang })
                        }}
                        onMouseUp={() => {
                            SpeechRecognition.stopListening();
                            setTimeout(() => {
                                resetTranscript();
                                setCaption(null)
                            }, 1000);
                            sendTextMessage(transcript);
                        }}
                    >
                        <MicSVG />
                    </button>
                }
                <button className="hidden sm:block p-[10px] pl-[9px] bg-[#E23D3D] rounded-[10px]"
                    disabled={!isReady}
                    onClick={ () => { 
                        if(messageRef.current) {
                            sendTextMessage(messageRef.current.value);
                            messageRef.current.value = '';
                        }
                    }}
                >
                    <SendSVG />
                </button>
                <audio id='voice' className='hidden' />
            </div>
        </div>
    </div>
    );
};
  
export default ChatRoom;