import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock } from 'react-icons/fi'
import { SupportButton } from '../../components/SuportButton'
import { getSession } from 'next-auth/client'
import React, { useState } from 'react'

import firebase from '../../services/firebaseconnection'


export default function Board({ user }) {
    const [input, setInput] = useState('');


    async function handleSubmit(e) {
        e.preventDefault();

        if (input === '') {
            alert('preencha alguma tarefa')
            return;
        }


        await firebase.firestore().collection('tarefas').add({
            created: new Date(),
            tarefa: input,
            userId: user.id,
            nome: user.name

        }).then((doc) => {
                console.log('CADASTRADO COM SUCESSO', doc)
            })
            .catch((err) => {
                console.log('ERRO AO CADASTRAR', err)
            })

    }


    console.log(user.id)

    return (
        <>
            <Head>
                <title>Minhas tarefas - Board</title>
            </Head>
            <main className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={input}
                        placeholder='Digite sua tarefa ...'
                        onChange={(e) => setInput(e.target.value)} />
                    <button type='submit'>
                        <FiPlus size={25} color="#17181f" />
                    </button>

                </form>

                <h1>Voce tem 2 tarefas!</h1>

                <section>
                    <article className={styles.taskList}>
                        <p>Aprender criar projetos usando Next JS e aplicando firebase como backend.</p>
                        <div className={styles.actions}>
                            <div>
                                <div>
                                    <FiCalendar size={20} color="#FFB800" />
                                    <time>17 de julho de 2022</time>
                                </div>
                                <button>
                                    <FiEdit2 size={20} color="#FFF" />
                                    <span>Editar</span>
                                </button>
                            </div>

                            <button>
                                <FiTrash size={20} color="#FF3636" />
                                <span>Excluir</span>
                            </button>


                        </div>
                    </article>
                </section>

            </main>

            <div className={styles.vipContainer}>
                <h3>Obrigado por apoiar esse projeto.</h3>
                <div>
                    <FiClock size={28} color='#fff' />
                    <time>
                        Ultima doacao doi a 3 dias .
                    </time>
                </div>
            </div>

            <SupportButton />
        </>
    )

}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session?.id) {

        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }

    const user = {
        name: session?.user.name,
        id: session?.id
    }


    console.log(session.user)

    return {
        props: {
            user

        }
    }
}