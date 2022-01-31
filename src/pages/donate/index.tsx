import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import styles from './styles.module.scss'

export default function Donate({data}) {


    return (
        <>
            <Head>
                <title>Ajuda a plataforma board ficar online!</title>
            </Head>
            <main className={styles.container}>
                <img src="/rocket.svg" alt="Seja Apoiador" />

                <div className={styles.vip}>
                    <img src={data.image} alt="" />
                    <span>Parabens {data.nome} voce e um novo apoiador</span>
                </div>

                <h1>Seja um apoiador deste projeto  🏆</h1>
                <h3>Contribua com apenas <span>R$ 1,00</span></h3>
                <strong>Apareça na nossa home, tenha funcionalidades exclusivas.</strong>
            </main>
        </>
    )
}


export const getServerSideProps:  GetServerSideProps = async ({req})  => {

    const session = await getSession({req})

    if(!session?.id){
        return{
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }

    const data ={
        nome: session?.user.name,
        id:session?.id,
        image:session?.user.image

    }

    return{
        props:{
           data
        }

    }

    
} 