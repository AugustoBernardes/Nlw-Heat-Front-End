import styles from "./App.module.scss";
import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MassageList";
import { AuthContext } from "./contexts/auth"
import { useContext } from "react";
import { SendMessageForm } from "./components/SendMessageFrom";



export function App() {
  const { user } = useContext(AuthContext);

  return (
    <main className={styles.contentWrapper}>
      <MessageList/>
      {/* If user not null show SendMessageForm else show login box */}
      { !!user ? <SendMessageForm/> : <LoginBox/>}

    </main>
  )
}

