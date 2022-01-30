import styles from './styles.module.scss'
import Link from 'next/link';
import {SingInButton} from  './SingInButton'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/'>
                <img src='/logo.svg' alt='logo' />
                </Link>

                <nav>
                    <Link href="/">
                        <a>Home</a>                      
                    </Link>
                    <Link  href="/board">                      
                        <a>Meu Board</a>
                    </Link>
                </nav>

                <SingInButton/>
              
            </div>
        </header>
    )
}