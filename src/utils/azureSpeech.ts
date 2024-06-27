// @ts-nocheck

import { getWaveBlob } from 'webm-to-wav-converter';
import config from '@/config';
import { LANGUAGE_TO_VOICE_MAPPING_LIST } from '@/utils/constants';

const _ttsregion = config.TTS_REGION;
const _ttsapikey = config.TTS_API_KEY;

export const getSpeechUrl = async (lang: string, voice: string, text: string) => {
  let azureVoice = null
  LANGUAGE_TO_VOICE_MAPPING_LIST.map( item => {
    if(item.voice.split('-')[0] == lang && item.voice.split('-')[2].replace("Neural", "") == voice)
      azureVoice = item
  })
  if (_ttsregion === undefined || _ttsregion === "" || azureVoice == null) return;

  // #TODO: tts api authurization with Bearer access_token - auth flow
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/ssml+xml');
  requestHeaders.set('X-Microsoft-OutputFormat', 'riff-8khz-16bit-mono-pcm');
  requestHeaders.set('Ocp-Apim-Subscription-Key', _ttsapikey);
  requestHeaders.set('User-Agent', 'myaibae')

  const ssml = `
    <speak version=\'1.0\' xml:lang=\'${azureVoice.voice.split('-')[0]}-${azureVoice.voice.split('-')[1]}\'>
      <voice xml:lang=\'${azureVoice.voice.split('-')[0]}-${azureVoice.voice.split('-')[1]}\' xml:gender=\'${azureVoice.isMale ? "Male" : "Female"}\' name=\'${azureVoice.voice}\'>
        ${text}
      </voice>
    </speak>
  `;
  const response = await fetch(
    `https://${_ttsregion}.tts.speech.microsoft.com/cognitiveservices/v1`,
    {
      method: 'POST',
      headers: requestHeaders,
      body: ssml
    }
  );
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const audio: any = document.getElementById('voice');
  audio.currentTime = 0;
  audio.src = url;

  return url;
}

export const getTextFromSpeech = async (language: string, data: Blob) => {
  if (_ttsregion === undefined || _ttsregion === "") return '';

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Accept', 'application/json;text/xml');
  requestHeaders.set(
    'Content-Type',
    'audio/wav; codecs=audio/pcm; samplerate=16000'
  );
  requestHeaders.set('Ocp-Apim-Subscription-Key', _ttsapikey);

  const wav = await getWaveBlob(data, false);

  const response = await fetch(
    `https://${_ttsregion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${language}`,
    {
      method: 'POST',
      headers: requestHeaders,
      body: wav
    }
  );
  const json = await response.json();
  return json.DisplayText;
}