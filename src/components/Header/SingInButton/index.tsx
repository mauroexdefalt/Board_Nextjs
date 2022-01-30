import {signIn , signOut , useSession} from 'next-auth/client'
import {AiFillGithub} from 'react-icons/ai'
import {FiX}  from 'react-icons/fi'
import styles from './styles.module.scss'

export function SingInButton() {


    const [session] = useSession() ;


    console.log(session)

    return  session ? (

        <button
        type='button'
        className={styles.signInButton}
        onClick={()=>{signOut()}}>
            <img src={session.user.image} alt='steve'/>
            Olá {session.user.name}
             <FiX color="#737380" className={styles.closeIcon}/>          
        </button>
       
 
    ) : (

        <button
        type='button'
        className={styles.signInButton}
        onClick={()=>{ signIn('github')}}>
             <AiFillGithub color="#FFB800"/> 
            Entrar com github
        </button>
    )

}
