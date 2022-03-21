import { VscGithubInverted } from "react-icons/vsc"
import styles from "./styles.module.scss";
import { AuthContext } from "../../contexts/auth"
import { useContext } from "react";



export function LoginBox(){
    const { signInUrl,user } = useContext(AuthContext);

    console.log(user)

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