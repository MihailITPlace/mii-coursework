import React from "react";
import {Card, Image, Icon} from "semantic-ui-react";
import {Post} from "../service/Models";

interface PostProps {
    post: Post
}

const PostView = ({post}: PostProps) => {
    return (
        <Card>
            {post.images && post.images.length > 0 && <Image src={post.images[0]} wrapped ui={false} />}
            <Card.Content>
                <Card.Header>{post.caption.slice(0, 20) + "..."}</Card.Header>
                <Card.Meta>
                    <span className='date'>{new Date(post.time_stamp).toLocaleDateString()}</span>
                </Card.Meta>
                <Card.Description>
                    {post.location.name}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='like' />
                    {post.likes_count} likes
                </a>
            </Card.Content>
        </Card>
    )
}

export default PostView
