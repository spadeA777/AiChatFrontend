import { useRef } from 'react';
import { LAppDelegate } from './lappdelegate';
import * as LAppDefine from './lappdefine';
import { AnimeNFTCharacters } from '../constants';
import { ICharacter } from '../types';

const useLive2D = () => {

    const OnTalkStart = useRef(() => {});
    const OnTalkEnd = useRef(() => {});

    function updateSize() {
        LAppDelegate.getInstance().onResize();
    }

    const initializeLive2D = (character: ICharacter) => {
        const model = AnimeNFTCharacters.filter( item => item.model == character.model)
        LAppDefine.lappdefineSet.setBackImage(model[0].background);
        LAppDefine.lappdefineSet.setModel(model[0].model)
        
        if (LAppDelegate.getInstance().initialize() == false) {
            return false;
        }

        window.addEventListener('resize', updateSize);

        const audio = document.getElementById("voice");
        if(!audio) return false;
        audio.onplay = OnTalkStart.current
        audio.onended = OnTalkEnd.current
        
        LAppDelegate.getInstance().run();
        return true;
    }

    const releaseLive2D = () => {
        LAppDelegate.releaseInstance();
        window.removeEventListener('resize', updateSize);
    }

    const talkLive2D = (text: string, emotion: string, lang: string, voice: string) => {
        LAppDelegate.getInstance().startVoiceConversation(lang, voice, text, emotion)
    }

    const setLive2DTalkStartCallback = (callback: any) => {
        OnTalkStart.current = callback;
    }

    const setLive2DTalkEndCallback = (callback: any) => {
        OnTalkEnd.current = callback;
    }

    return {
        initializeLive2D,
        releaseLive2D,
        talkLive2D,
        setLive2DTalkStartCallback,
        setLive2DTalkEndCallback
    }
    
};

export default useLive2D;