import React from 'react';
import { useHistory } from 'react-router-dom';
import { PostList, PostContainer, UserName, VotesContainer, TextArea, ArrowUp, ArrowDown, LabelComments } from './StyleFeed'
import axios from 'axios'

function Posts(props) {
    const history = useHistory()

    const goToDetails = (id) => {
        history.push(`/post/${id}`)
    }

    const votePost = (id, vote) => {
        axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labEddit/posts/${id}/vote`,
            { 'direction': vote },
            { headers: { 'Authorization': localStorage.getItem('token') } }
        ).then(res => {
            console.log('Vote post: ', res.data)
            props.verLista()
        }).catch(err => {
            console.log('Erro em vote post: ', err)
        })
    }

    return (
        <div>
            {props.postslist.map(post => {
                let votePositive, voteNegative, iconColorPositive, iconColorNegative

                if (post.userVoteDirection === 0) {
                    votePositive = 1
                    voteNegative = -1
                } else if (post.userVoteDirection === 1) {
                    votePositive = 0
                    voteNegative = -1
                    iconColorPositive = 'secondary'
                } else {
                    votePositive = 1
                    voteNegative = 0
                    iconColorNegative = 'secondary'
                }

                return (
                    <PostContainer key={post.id}>
                        <PostList onClick={() => goToDetails(post.id)}>
                            <UserName>{post.username}</UserName>
                            <TextArea>
                                <h4>{post.title}</h4>
                                <p>{post.text}</p>
                            </TextArea>
                        </PostList>
                        <VotesContainer>
                            <div>
                                <label onClick={() => votePost(post.id, votePositive)}>
                                    <ArrowUp color={iconColorPositive} />
                                </label>
                                <label>{post.votesCount}</label>
                                <label onClick={() => votePost(post.id, voteNegative)}>
                                    <ArrowDown color={iconColorNegative} />
                                </label>
                            </div>
                            <LabelComments onClick={() => goToDetails(post.id)}>
                                {post.commentsCount} comentários
                            </LabelComments>
                        </VotesContainer>
                    </PostContainer>)
            })}
        </div>
    )
}

export default Posts