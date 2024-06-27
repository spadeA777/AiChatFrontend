import { IAuthConfig } from "@/utils/types";

export class AuthManager {
    state: IAuthConfig

    constructor() {
        this.state = {
            address: '',
            chainId: undefined,
            isConnected: false,
            balance: {
                "$BAE": 0,
                "BTC": 0,
                "ETH": 0,
                "BNB": 0,
                "SOL": 0,
                "TRX": 0
            }
        };

        this.setConfig(this.state)
    }

    setConfig(value: IAuthConfig) {
        this.state = value;
    }
}

export const AppAuth = new AuthManager();