import { IAppConfig } from "@/utils/types";

export class ConfigManager {
    state: IAppConfig;

    constructor() {
        this.state = {
            theme: 'dark',
            lang: 'en-US',
            caption: true,
            audio: true,
            audioAutoplay: true,
            lastChat: null
        };

        const storedValue = localStorage.getItem("app_configuration");
        if(storedValue)
            this.state = JSON.parse(storedValue)
        else
            this.setConfig(this.state)
    }

    setConfig(value: IAppConfig) {
        this.state = value;
        localStorage.setItem('app_configuration', JSON.stringify(value));
    }
}

export const AppConfig = new ConfigManager();