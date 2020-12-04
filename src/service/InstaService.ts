import Axios from "axios";
import {UserInfo} from "./Models";

export class InstaService {
    private readonly USER_ENDPOINT = "https://mapper-instagram.herokuapp.com/api/user/"
    private readonly GEOCODER_ENDPOINT = "https://geocoder-instagram.herokuapp.com/api/user/?name="

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
        return Axios.get<object>(this.GEOCODER_ENDPOINT + nickname)
    }
}
