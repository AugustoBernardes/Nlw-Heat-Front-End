import { createContext, ReactNode } from "react"
import { api } from "../services/api"
import { useEffect,useState } from "react";


// Setting Types
type User = {
    id:string;
    name:string;
    login:string;
    avatar_url:string
}

type AuthContextData ={
    user:User | null;
    signInUrl:string;
    signOut:() => void;
}

export const AuthContext = createContext({} as AuthContextData)

type AuthProvider = {
    children:ReactNode;
}


type AuthResponse = {
    token:string;
    user:{
        id:string;
        avatar_url:string;
        name:string;
        login:string
    }
}

export function AuthProvider(props:AuthProvider){
    const [user, setUser] = useState<User | null>(null);
   
    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID }`

    function signOut(){
        setUser(null);
        localStorage.removeItem('@dowhile:token')
    }

    async function signIn(githubCode:string){
        const response = await api.post<AuthResponse>('authenticate',{
            code:githubCode,
        })

        const { token,user } = response.data

        localStorage.setItem('@dowhile:token',token)
        
        api.defaults.headers.common.authorization = `Baerer ${token}`

        setUser(user)
    }

    useEffect(() =>{
        const token = localStorage.getItem('@dowhile:token')
        if(token){

            api.defaults.headers.common.authorization = `Baerer ${token}`

            api.get<User>('profile').then(response => {
                setUser(response.data)
            })
        }
    },[])

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

    return( 
        <AuthContext.Provider value={{signInUrl,user,signOut}}>
            {props.children}
        </AuthContext.Provider>
    )
}