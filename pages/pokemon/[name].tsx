import Image from "next/image";
import Head from 'next/head'
import styles from "../../styles/Pokemon.module.css";

export const getStaticPaths = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
  const data = await response.json();

  const paths = data.results.map((pokemon: any) => {
    return { 
      params: { name: pokemon.name }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context: any) => {
  const name = context.params.name;
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + name);
  const data = await response.json();

  return {
    props: {pokemon: data}
  }
}
 
const Details = ({ pokemon }: any) => {

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return ( 
    <>
      <Head>
        <title>Pokedex | {capitalizeFirstLetter(pokemon.name)}</title>
      </Head>
      <div className={styles.container}>
        {/* <Image src={pokemon.sprites.front_default} height={40} width={40} alt=""/> */}
        <div className={styles.imageContainer}>
          <img src={pokemon.sprites.front_default} alt="" className={styles.image} />
        </div>
        <h1>{pokemon.name}</h1>
        <div className={styles.detailsContainer}>
          <p>id: {pokemon.id}</p>
          <p>experience: {pokemon.base_experience}</p>
          <p>height: {pokemon.height}</p>
          <p>weight: {pokemon.weight}</p>
          <p>types: {pokemon.type}</p>
        </div>
      </div> 
    </>
  );
}
 
export default Details;