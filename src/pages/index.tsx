import Head from 'next/head';
import styles from '../styles/styles.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Board - Organizando suas tarefas </title>
      </Head>
      <main className={styles.contentContainer}>
        <img src='/board-user.svg' alt='logo home'/>
        <section className={styles.callToAction}>
          <h1>Uma ferramenta para seu dia a dia Escreva , planeje e organize-se.. </h1>
          <p>
            <span>100% Gratuita</span> e online.
            </p>
        </section>

        <div className={styles.donaters}>
        <img src="http://sujeitoprogramador.com/steve.png" alt='steve'/>     
        </div>

      </main>
    </>
  )
}



export const getStaticProps = async () =>{



  return{
    props:{

    },
    revalidate: 60 * 60 //atualiza a cada 60 min
  }
}
