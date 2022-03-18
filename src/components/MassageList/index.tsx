import styles from "./styles.module.scss"
import logoImg from "../../assets/logo.svg"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

// Showing the message type to use
type Message = {
    id:string;
    text:string;
    user:{
        name:string;
        avatar_url:string;
    }
}

export function MessageList(){
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        api.get<Message[]>('messages/last3').then(response => {
            setMessages(response.data)
        })
    }, [])

    return (
        <div className={styles.messageListWrapper}>
            <img src={logoImg} alt="DoWhile2021" />

            <ul className={styles.messageList}> 
                
                <li className={styles.message}>
                    <p className={styles.messageContent}>Essa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagemEssa é uma mensagem</p>
                    <div className={styles.messageUser}>
                        <div className={styles.userImage}>
                            <img src="https://github.com/AugustoBernardes.png" alt="Augusto Bernardes" />
                        </div>
                        <span>Diego Fernandes</span>
                    </div>
                </li>

               
            </ul>
        </div>
    )
}