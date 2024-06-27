export interface IAppConfig {
    theme: string,
    lang: string,
    caption: boolean,
    audio: boolean,
    audioAutoplay: boolean,
    lastChat: any,
}

export interface IAuthConfig {
    address: string,
    chainId: number | undefined,
    isConnected: boolean,
    balance: any
}

export interface ICharacter {
    _id: any;
    type: string,
    name: string,
    description: string,
    model: string,
    avatar_img: string,
    cover_img: string,
    intro: string,
    prompt: string,
    chatmodel: string,
    lang: string,
    voice: string,
    bio: string,
    config: any,
    exp: number,
    price: number,
    tags: Array<string>,
    isPublished: string,
    published_at: string,
    owner: any, // owner addr, chainId, username
}

export interface IChat {
    _id: string,
    character: ICharacter,
    address: string,
    chainId: number,
    messages: Array<any>,
    bond: number,
    summary: string,
    last_chat: string
}

export interface INews {
    img: string,
    title: string,
    description: string,
    button: string,
    url: string
}

export interface IVoice {
    languageCode: string;
    name: string;
    ssmlGender: string;
    naturalSampleRateHertz: number;
}

export interface IAvatarVoice {
    cloudTtsVoice?: IVoice;
    cloudTtsPitch?: number;
    speakingRate?: number;
    pitchShift?: number;
    winslow?: boolean;
    winslowVoiceName?: string;
}