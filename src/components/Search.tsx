import React, {useState, Fragment} from "react";
import {Dimmer, Input, Loader, Segment, Image} from "semantic-ui-react";
import {InstaService} from "../service/InstaService";
import {Regions, UserInfo} from "../service/Models";
import TagsViewer from "./TagsViewer";
import RegionsInfo from "./RegionsInfo";
import {PDFDownloadLink, StyleSheet} from '@react-pdf/renderer'
import Report from "./Report";
import UserCard from "./UserCard";
import PostsTimeSeries from "./PostsTimeSeries";
import _ from 'lodash';

interface ISearchState {
    loadingUser: boolean
    loadingRegions: boolean,
    search: boolean
}

const MyLoader = () => (
    <Fragment>
        <Dimmer active inverted>
            <Loader inverted>Загрузка</Loader>
        </Dimmer>
        <Image src={'/short-paragraph.png'} />
    </Fragment>
);

const Search = () => {
    const [nickname, setNickname] = useState<string>("");
    const [user, setUser] = useState<UserInfo | null>(null);
    const [regions, setRegions] = useState<Regions | null>(null);
    const [regionsChart, setRegionsChart] = useState<string>('');
    const [postsChart, setPostsChart] = useState<string>('');

    const [state, setState] = useState<ISearchState>({
        loadingUser: false,
        loadingRegions: false,
        search: false
    });

    const styles = StyleSheet.create({
        link: {
            display: "flex"
        },
        nonlink: {
            display: "none"
        }
    });

    const service = InstaService.getInstance();

    const searchOnClick = () => {
        if (nickname === "") { return }

        setState({...state, loadingUser: true, loadingRegions: true, search: true});
        setRegions(null);
        setUser(null);

        // service.getUserInfo(nickname).then(resp => {
        //     window.localStorage.setItem('user', JSON.stringify({ ...resp.data, media: resp.data.media.map(m => {
        //             return {
        //                 ...m,
        //                 time_stamp: m.time_stamp * 1000
        //             }
        //         }) }));
        //     setUser({ ...resp.data, media: resp.data.media.map(m => {
        //             return {
        //                 ...m,
        //                 time_stamp: m.time_stamp * 1000
        //             }
        //         }) });
        // }).catch(err => {
        //     console.log(err);
        // }).finally(() => setState({...state, loadingUser: false, search: true}));
        //
        //
        // service.getRegions(nickname).then(resp => {
        //     window.localStorage.setItem('regions', JSON.stringify(resp.data));
        //     setRegions(resp.data);
        // }).catch(err => {
        //         console.log(err);
        // }).finally(() => setState({...state, loadingRegions: false, search: true}));

        const userFromStorage = window.localStorage.getItem('user') as string;
        const regionsFromStorage = JSON.parse(window.localStorage.getItem('regions') as string);

        setTimeout(() => {
            setUser(JSON.parse(userFromStorage) as UserInfo);
            setRegions(regionsFromStorage as Regions);
            setState({...state, loadingUser: false, search: true})
        }, 1000);
    };

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
            { state.search && <Segment>
                {
                    user ? <UserCard user={user}/> : <MyLoader />
                }
            </Segment> }
            { state.search && <Segment>
                {
                    user ?
                    <PostsTimeSeries saveChart={setPostsChart} posts={_(user.media).orderBy(p => p.time_stamp).value()}/>
                    : <MyLoader />
                }
            </Segment> }
            {(user !== null) && (user.media) && <TagsViewer posts={user.media.filter(p => p.location && !(p.location.lat === 0 && p.location.lng === 0))}/>}
            {state.search &&
                <Segment>
                    {
                        (regions !== null)
                            ? <RegionsInfo saveChart={setRegionsChart} regions={regions}/>
                            : <MyLoader/>
                    }
                </Segment>
            }
            {/*{ user && regions &&*/}
            {/*    <PDFDownloadLink*/}
            {/*        style={user && regions ? styles.link : styles.unlink}*/}
            {/*        document={<Report regions={regions} regionsChart={regionsChart} user={user} postsChart={postsChart} />}*/}
            {/*        fileName="report.pdf">*/}
            {/*        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Сформировать отчет по поиску')}*/}
            {/*    </PDFDownloadLink>*/}
            {/*}*/}
        </div>
    );
}

export default Search;
