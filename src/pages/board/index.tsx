import styles from './styles.module.scss'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { FiPlus, FiCalendar, FiEdit2, FiTrash, FiClock, FiX } from 'react-icons/fi'
import { SupportButton } from '../../components/SuportButton'
import { getSession } from 'next-auth/client'
import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'


import firebase from '../../services/firebaseconnection'


export default function Board({ user, data }) {
    const [input, setInput] = useState('');
    const [taskList, setTaskList] = useState(JSON.parse(data))
    const [taskEdit, setTaskEdit] = useState(null)






    async function handleEdit(task) {
        setInput(task.tarefa)
        setTaskEdit(task)  
    }


    function handleCancelEdit() {
        setInput('')
        setTaskEdit(null)

    }




    async function handleDelete(id) {

        await firebase.firestore().collection('tarefas').doc(id)
            .delete()
            .then((res) => {
                let taskDeleted = taskList.filter(item => {
                    return (item.id !== id)
                })
                setTaskList(taskDeleted);


            }).catch((err) => {
                console.log('ERRO AO DELETAR', err)
            })

    }


    async function handleSubmit(e) {
        e.preventDefault();

        if (input === '') {
            alert('preencha alguma tarefa')
            return;
        }

        if(taskEdit){
            await firebase.firestore().collection('tarefas')
            .doc(taskEdit.id).update({
                tarefa: input
            })
            .then((res)=>{
                let data = taskList;
                let taskIndex = taskList.findIndex(item => item.id === taskEdit.id)
                data[taskIndex].tarefa = input;
                setTaskList(data);        
                handleCancelEdit();



            })
            .catch((err)=>{
                console.log('DEU ERRO', err)
            })

            return;
        }


        await firebase.firestore().collection('tarefas').add({
            created: new Date(),
            tarefa: input,
            userId: user.id,
            nome: user.name

        }).then((doc) => {
            console.log('CADASTRADO COM SUCESSO', doc)
            let data = {
                id: doc.id,
                created: new Date(),
                createdFormated: format(new Date(), 'dd/MM/yyyy'),
                tarefa: input,
                userId: user.id,
                nome: user.nome
            };

            setTaskList([...taskList, data]);
            setInput('');


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
                {taskEdit && (
                    <span className={styles.warnText}>
                        <button onClick={() => handleCancelEdit()}><FiX size={30} color="#FF3636" /></button>
                        Voce esta editando uma tarefa !
                    </span>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={input}
                        placeholder='Digite sua tarefa ...'
                        onChange={(e) => setInput(e.target.value)} />
                    <button type='submit'>
                       {taskEdit ?  <FiEdit2 size={25 } color="#17181f" /> :  <FiPlus size={25} color="#17181f" /> }
                    </button>

                </form>

                <h1>Voce tem {taskList.length} {taskList.length === 1 ? 'tarefa !' : 'tarefas !'}!</h1>

                <section>
                    {taskList.map((item, index) => {

                        return (
                            <article className={styles.taskList} key={index}>
                                <Link href={`/board/${item.id}`}>
                                    <p>{item.tarefa}</p>
                                </Link>
                                <div className={styles.actions}>
                                    <div>
                                        <div>
                                            <FiCalendar size={20} color="#FFB800" />
                                            <time>{item.createdFormated}</time>
                                        </div>
                                        <button onClick={() => handleEdit(item)}>
                                            <FiEdit2 size={20} color="#FFF" />
                                            <span>Editar</span>
                                        </button>
                                    </div>

                                    <button onClick={() => handleDelete(item.id)}>
                                        <FiTrash size={20} color="#FF3636" />
                                        <span>Excluir</span>
                                    </button>
                                </div>
                            </article>
                        )

                    })}

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
    console.log(session.id)

    const task = await firebase.firestore().collection('tarefas').where('userId', '==', session?.id).orderBy('created', 'asc').get();
    //console.log('TASK',JSON.stringify(task))
    const data = JSON.stringify(task.docs.map(u => {
        return {
            id: u.id,
            createdFormated: format(u.data().created.toDate(), 'dd MMMM yyyy'),
            ...u.data(),
        }
    }))



    const user = {
        name: session?.user.name,
        id: session?.id
    }




    return {
        props: {
            user,
            data,



        }
    }
}