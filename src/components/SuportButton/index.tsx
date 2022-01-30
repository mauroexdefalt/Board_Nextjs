import style from './styles.module.scss';
import Link from 'next/link'

export function SupportButton() {
    return (
        <div className={style.supportButton}>
            <Link href='/donate'>
             <button> APOIAR </button>
            </Link>
        </div>
    )
}