import React, { Component } from "react";
import api from "../../services/api";
import Header from '../../components/Header';

import styles from './Comment.module.css';

export default class Comment extends Component {


    state = {
        comments: []
    };

    componentDidMount() {
        this.loadComments();

    }

    loadComments = async () => {

        const { id } = this.props.match.params;

        const response = await api.get(`/posts/${id}/comments`);
        this.setState({ comments: response.data });
        console.log(response.data);
    }



    render() {

        const { comments } = this.state;

        return (  
            <div><Header/>
            
            <div className={styles.commentsContainer}>
                {comments.map(comment => (

                    <div key={comment.id} className={styles.commentsList}>
                        <p className={styles.id}><strong>Id:</strong>{comment.id}</p>
                    <div className={styles.trace}></div>

                        <div  className={styles.comment}>
                        
                        <p className={styles.info}><strong>Nome:</strong><span>{comment.name}</span></p>
                        <p className={styles.info}><strong>Email:</strong><span><em>{comment.email}</em></span></p>
                        <p className={styles.info}>{comment.body}</p>
                    </div>

                   

                    </div>
                    
                    
                ))}
            </div>
            </div>
           
          
        );

    }

}

        /*  return (
           
            <div className={styles.postscontainer}>

                {posts.map(post => (
                 

                    <div key={post.id} className={styles.postslist}>

                        <span className={styles.user}><a className={styles.linkUser} href="#">Usuário:{post.userId}</a></span>
                        <div className={styles.trace}></div>

                        <div className={styles.mainPost}>
                            <h2 className={styles.title}>{post.title}</h2>
                            <p className={styles.body}>{post.body}</p>
                            <Link className={styles.comment} to={`/posts/${post.id}/comments`}>Comentários ...</Link>
                            
                        </div>
                    </div>



                ))}
            </div>

        );

        */
