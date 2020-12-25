import React, {useState, Fragment} from "react";
import {Card, Image, Icon, Button} from "semantic-ui-react";
import {Post} from "../service/Models";

interface PostProps {
    posts: Post[]
}

const PostView = ({posts}: PostProps) => {
    const [currentPost, setCurrentPost] = useState<number>(0);
    const [currentImage, setCurrentImage] = useState<number>(0);

    const next = () => {
        if (currentPost === (posts.length - 1)) {
            setCurrentPost(0)
        } else {
            setCurrentPost(currentPost + 1);
        }

        setCurrentImage(0);
    };

    const prev = () => {
        if (currentPost === 0) {
            setCurrentPost(posts.length - 1)
        } else {
            setCurrentPost(currentPost - 1);
        }

        setCurrentImage(0);
    };

    const nextImage = (post: Post) => {
        if (currentImage === (post.images.length - 1)) {
            setCurrentImage(0)
        } else {
            setCurrentImage(currentImage + 1);
        }
    };

    const prevImage = (post: Post) => {
        if (currentImage === 0) {
            setCurrentImage(post.images.length - 1)
        } else {
            setCurrentImage(currentImage - 1);
        }
    };

    return (
        <Fragment>
            <Card>
                {posts[currentPost].images && posts[currentPost].images.length > 0 &&
                <Image
                    onClick={() => window.open(posts[currentPost].images[0], '__blank')}
                    src={posts[currentPost].images[currentImage]}
                    wrapped
                    ui={false}
                />}
                {
                    posts[currentPost].images && posts[currentPost].images.length > 1 &&
                    <div className={'imageSlider'}>
                        <span onClick={() => prevImage(posts[currentPost])}>{'<'}</span>
                        <span onClick={() => nextImage(posts[currentPost])}>{'>'}</span>
                    </div>
                }
                <Card.Content>
                    <Card.Header>{posts[currentPost].caption.slice(0, 20) + "..."}</Card.Header>
                    <Card.Meta>
                        <span className='date'>{new Date(posts[currentPost].time_stamp).toLocaleDateString()}</span>
                    </Card.Meta>
                    <Card.Description>
                        {posts[currentPost].location.name}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <a>
                        <Icon name='like'/>
                        {posts[currentPost].likes_count} likes
                    </a>
                </Card.Content>
            </Card>
            {
                posts.length > 1 &&
                <div className={'postsNav'}>
                    <Button icon labelPosition='left' onClick={prev}>
                        <Icon name='arrow left' />
                        Prev
                    </Button>
                    <Button icon labelPosition='right' onClick={next}>
                        Next
                        <Icon name='arrow right' />
                    </Button>
                </div>
            }
        </Fragment>
    )
}

export default PostView
