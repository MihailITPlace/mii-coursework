import Axios from "axios";
import {Regions, UserInfo} from "./Models";

export class InstaService {
    private readonly USER_ENDPOINT = "http://c1.fuzzylab.ru/api/user/";
    private readonly GEOCODER_ENDPOINT = "http://localhost:5000/api/user/?name=";

    private static instance: InstaService;
    private constructor() { }

    public static getInstance(): InstaService {
        if (!InstaService.instance) {
            InstaService.instance = new InstaService();
        }

        return InstaService.instance;
    }

    public getUserInfo(nickname: string) {
        return Axios.get<UserInfo>(this.USER_ENDPOINT + nickname)
    }

    public getRegions(nickname: string) {
        return Axios.get<Regions>(this.GEOCODER_ENDPOINT + nickname)
    }
}
