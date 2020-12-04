import React from "react";
import {MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import {Post} from "../service/Models";
import PostView from "./PostView";
import _ from "lodash";
import {Icon, LatLng, LatLngBounds, Point} from "leaflet";

interface TagsProps {
    posts: Post[]
}

const TagsViewer = ({posts}: TagsProps) => {
    const lats = posts.map(p => p.location.lat);
    const lngs = posts.map(p => p.location.lng);

    const bounds = new LatLngBounds(new LatLng((_.min(lats) as number), (_.min(lngs) as number)),
        new LatLng((_.max(lats) as number), (_.max(lngs) as number)))

    return (
        <div style={{marginTop: "2em"}}>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                  integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                  crossOrigin=""/>
            <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossOrigin=""/>
            <MapContainer style={{height: "50vh"}} bounds={bounds} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {
                    posts.map(p => (
                        <Marker position={[p.location.lat, p.location.lng]}>
                            <Popup>
                                <PostView post={p}/>
                            </Popup>
                        </Marker>
                    ))
                }
            </MapContainer>
        </div>
    );
}

export default TagsViewer;
