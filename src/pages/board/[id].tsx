import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"
import firebase from '../../services/firebaseconnection'
import { format } from 'date-fns'
import styles from './task.module.scss'
import Head from 'next/head'
import { FiCalendar } from 'react-icons/fi'


export default function Task({data}) {

    const task = JSON.parse(data)


 
    return (
        <>
            <Head>
                <title>Detalhes da sua tarefa</title>
            </Head>
            <article className={styles.container}>
                <div className={styles.actions}>
                    <div>
                        <FiCalendar size={30} color='#fff' />
                        <span>Tarefa criada:</span>
                        <time>{task.createdFormatad}</time>
                    </div>
                </div>
                <p>{task.tarefa}</p>
            </article>
        </>
    )
}


// eslint-disable-next-line @next/next/no-typos
export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
    console.log(params);
    const { id } = params;
    const session = await getSession({ req })


    if (!session?.id) {
        return {
            redirect: {
                destination: '/board',
                permanent: false
            }
        }
    }

     const data = await firebase.firestore().collection('tarefas')
        .doc(String(id))
        .get()
        .then((snapshot) => {

            const data = JSON.stringify({
                id: snapshot.id,
                created: snapshot.data().created,
                createdFormatad: format(snapshot.data().created.toDate(), 'dd MMMM yyyy'),
                tarefa: snapshot.data().tarefa,
                userId: snapshot.data().userId,
                nome: snapshot.data().nome
            })


           return data ;

        })

    return {
        props: {
           data
        }
    }

}