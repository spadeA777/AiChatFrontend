const GOOGLE_CLOUD_API_KEY = process.env.REACT_APP_GOOGLE_CLOUD_API_KEY || '';
const DID_API_KEY = process.env.REACT_APP_DID_API_KEY || '';
const TTS_REGION = process.env.REACT_APP_TTS_REGION || '';
const TTS_API_KEY = process.env.REACT_APP_TTS_API_KEY || '';
const SERVER_URL = process.env.REACT_APP_API_SERVER || "";
const WALLETCONNECT_PROJECT_ID = process.env.REACT_APP_WALLETCONNECT_PROJECT_ID || ""

export default {
    DID_API_KEY,
    GOOGLE_CLOUD_API_KEY,
    TTS_REGION,
    TTS_API_KEY,
    SERVER_URL,
    WALLETCONNECT_PROJECT_ID
}
