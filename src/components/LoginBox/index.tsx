import { VscGithubInverted } from "react-icons/vsc"
import styles from "./styles.module.scss";
import { api } from "../../services/api"
import { useEffect } from "react";

type AuthResponse = {
    token:string;
    user:{
        id:string;
        avatar_url:string;
        name:string;
        login:string
    }
}


export function LoginBox(){
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=5292af6a016c981023c6`

    async function signIn(githubCode:string){
        const response = await api.post<AuthResponse>('authenticate',{
            code:githubCode,
        })

        const { token,user } = response.data

        localStorage.setItem('@dowhile:token',token)

        console.log(user)
    }

    useEffect(() =>{
        const url = window.location.href;

        const hasGitHubCode = url.includes('?code=')

        if(hasGitHubCode){
            // Split the URL with two data 
            const [urlWithoutCode, githubCode] = url.split('?code=')

            // Removing GitHub Code from URL
            window.history.pushState({},'',urlWithoutCode)

            signIn(githubCode)
        }
    },[])

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signInWithGitHub}>
                <VscGithubInverted size="24" />
                Entrar com GitHub
            </a>
        </div>
    )
}