export interface Location {
    id: any;
    name: string;
    lat: number;
    lng: number;
}

export interface Post {
    caption: string;
    time_stamp: number;
    likes_count: number;
    comment_count: number;
    images: string[];
    location: Location;
}

export interface UserInfo {
    username: string;
    full_name: string;
    is_private: boolean;
    biography: string;
    profile_pic_url: string;
    external_url: string;
    email: string;
    phone_number: string;
    public_email: string;
    public_phone_number: string;
    public_phone_country_code: string;
    public_contact_phone_number: string;
    city_name: string;
    media: Post[];
}

export type Regions = { [key: string]: number }
