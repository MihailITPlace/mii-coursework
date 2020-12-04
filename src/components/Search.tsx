import React, {useEffect, useState} from "react";
import {Input} from "semantic-ui-react";
import {InstaService} from "../service/InstaService";
import {UserInfo} from "../service/Models";
import TagsViewer from "./TagsViewer";
import RegionsInfo from "./RegionsInfo";

interface ISearchState {
    loadingUser: boolean
    loadingRegions: boolean
}

const Search = () => {
    const [nickname, setNickname] = useState<string>("");
    const [user, setUser] = useState<UserInfo | null>(null);
    const [regions, setRegions] = useState<object | null>(null);

    const [state, setState] = useState<ISearchState>({
        loadingUser: false,
        loadingRegions: false,
    });

    const service = InstaService.getInstance();

    const searchOnClick = () => {
        if (nickname === "") { return }

        setState({...state, loadingUser: true, loadingRegions: true});
        setRegions(null);
        setUser(null);

        service.getUserInfo(nickname).then(resp => {
            setUser(resp.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => setState({...state, loadingUser: false}));


        service.getRegions(nickname).then(resp => {
                console.log(resp.data);
                setRegions(resp.data);
        }).catch(err => {
                console.log(err);
        }).finally(() => setState({...state, loadingRegions: false}));
    }

    return (
        <div>
            <Input value={nickname}
                   fluid
                   disabled={state.loadingUser && state.loadingRegions}
                   placeholder={"Введите никнейм"}
                   action={{
                       color: 'teal',
                       labelPosition: 'left',
                       icon: 'search',
                       content: 'Найти!',
                       onClick: searchOnClick
                   }}
                   onChange={event => setNickname(event.target.value)}
            />

            {(user !== null) && <TagsViewer posts={user.media.filter(p => p.location && !(p.location.lat === 0 && p.location.lng === 0))}/>}
            {(regions !== null && <RegionsInfo regions={regions}/>)}
        </div>
    );
}

export default Search;
