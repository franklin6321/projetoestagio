import React, { Component } from "react";
import api from "../../services/api";

import styles from "./Main.module.css";


import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import { Grid, ListItem } from "@material-ui/core";
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewListIcon from '@material-ui/icons/ViewList';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export default class Main extends Component {


    obtemDados() {
        let campoLogin = document.getElementById('input-email');
        return campoLogin;
    }

    state = {
        users: [],
        email: '',
        senha: '',
        redirect: false,
        actualUser: '',


    }

    componentDidMount() {
        this.loadPosts();


    }

    loadPosts = async () => {

        const response = await api.get('/users');
        //console.log(response.data);
        this.setState({ users: response.data });

    }


    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });


    }
    handleSenhaChange = (event) => {
        this.setState({ senha: event.target.value });
    }


    handleSubmit = (event) => {
        event.preventDefault();

        


        let item = this.verificaDados(this.state);

        if (item == true) {

            this.setState({ redirect: true });
        }

        else {
            let alerta = document.getElementById('alert');
            alerta.innerHTML="";
            let p = document.createElement("p");

            let campoEmail = document.getElementById('campoEmail');
            let campoSenha = document.getElementById('campoSenha');

            campoEmail.value = '';
            campoSenha.value = '';


            let text = document.createTextNode("Email e/ou senha inválido(s). Tente novamente.");

            p.appendChild(text);

            p.style.color = "red";
            p.style.fontWeight = "bold";
            alerta.appendChild(p);





        }


    }




    verificaDados({ email, senha, users }) {

        let valor = false;

        for (var user of users) {
            if (email === user.email && senha == user.id) {
                console.log(user.id);
                console.log(user.email);
                // this.setState({ redirect: true })
                valor = true;
                this.setState({actualUser: user.id})
                localStorage.setItem('id', user.id);
                

            }

        }

        return valor;

    }


    // if(user.id===senha && user.email===email)






    render() {
        if (this.state.redirect) {
            return <Redirect to={`/Feed/${this.state.actualUser}`}/>
        }
        else {
            return (
                <div>
                    <header className={styles.header}>
                        <h1>Disciplinas</h1>
                        <h1>Sistemas de Informação</h1>
                    </header>

                    <div className={styles.containerContent}>
                        <Link className={styles.link} to={`/sistemas`}>
                            <div >
                                <h2 className={styles.wellcome}>Estágio Supervisionado 2</h2>
                                
                            </div>
                        </Link>
                    </div>
                    <div className={styles.containerContent}>
                        <Link className={styles.link} to={`/sistemas`}>
                            <div >
                                <h2 className={styles.wellcome}>Tópicos Especiais em Redes de Computadores</h2>
                                
                            </div>
                        </Link>
                    </div>
                    <div className={styles.containerContent}>
                        <Link className={styles.link} to={`/sistemas`}>
                            <div >
                                <h2 className={styles.wellcome}>Trabalho de Conclusão de Curso 2</h2>
                                
                            </div>
                        </Link>
                    </div>
                    
                    

                    <div>
                        <header className={styles.footer}>
                            <div className={styles.actions}>
                                <Grid>
                                    <div className={styles.icons}> <FontAwesomeIcon size="2x" icon="user"/></div>
                                    
                                    <button>Perfil</button> 
                                </Grid>
                                <Link to={`/notassistemas`}>
                                    <div className={styles.icons}> <FontAwesomeIcon size="2x" icon="clipboard-list"/></div>
                                    <button>Notas</button>

                                </Link>
                                <Link to={`/cursos`}>
                                    <div className={styles.icons}> <FontAwesomeIcon size="2x" icon="stream"/></div>
                                    <button>Cursos</button>

                                </Link>
                                
                                
                                
                            </div>
                            
                        </header>
                        
                    </div>

                </div>

            )
        }
    }






}