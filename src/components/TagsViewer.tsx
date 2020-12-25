import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Post} from "../service/Models";
import PostView from "./PostView";
import _ from "lodash";
import L, {Icon, LatLng, LatLngBounds, Point} from "leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TagsProps {
    posts: Post[]
}

type GrouppedPosts = {
    [key: string]: Post[]
}

const TagsViewer = ({posts}: TagsProps) => {
    const lats = posts.map(p => p.location.lat);
    const lngs = posts.map(p => p.location.lng);

    const groupPosts = (): GrouppedPosts => {
        const grouppedPosts: GrouppedPosts = {};
        posts.forEach(p => {
            const key = `${p.location.lat}_${p.location.lng}`;
            if (grouppedPosts[key]) {
                grouppedPosts[key].push(p);
            } else {
                grouppedPosts[key] = [p];
            }
        });

        return grouppedPosts;
    };

    const bounds = (lats.length > 0 && lngs.length > 0) ? new LatLngBounds(new LatLng((_.min(lats) as number), (_.min(lngs) as number)),
        new LatLng((_.max(lats) as number), (_.max(lngs) as number))) : undefined;

    return (
        <div style={{marginTop: "2em"}}>
            <h1>Карта публикаций</h1>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                  crossOrigin=""/>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossOrigin=""/>
            {
                lngs.length > 0 && lats.length > 0 ?
                    <MapContainer style={{height: "50vh", borderRadius: '0.5em'}} bounds={bounds} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {
                            Object.keys(groupPosts()).map((k, index) => {
                                return (
                                    <Marker
                                        key={index}
                                        position={[groupPosts()[k][0].location.lat, groupPosts()[k][0].location.lng]}
                                    >
                                        <Popup>
                                            <PostView posts={groupPosts()[k]}/>
                                        </Popup>
                                    </Marker>
                                )
                            })
                        }
                    </MapContainer>
                    : <p>Геометок не найдено</p>
            }
        </div>
    );
}

export default TagsViewer;
