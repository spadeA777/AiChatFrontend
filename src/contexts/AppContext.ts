import { createContext } from 'react';
import { AppConfig, ConfigManager } from './ConfigManager';
import { AppAuth, AuthManager } from './AuthManager';

interface IConfigContext {
    config: ConfigManager,
    auth: AuthManager
}

const AppContext = createContext<IConfigContext>({
    config: AppConfig,
    auth: AppAuth
});

export default AppContext