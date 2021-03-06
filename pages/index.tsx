import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useEffect, useState } from 'react'

interface Pokemon {
  name: string
  url: string
  background: string
}

export const getStaticProps = async () => {
  const backgroundsPaths = ["/grass.png", "/coast.jpeg", "/forest.jpeg", "/night.jpeg", "/night-2.jpeg"];

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=999999`)
  const data = await response.json();

  data.results.map((pokemon: Pokemon) => {
    pokemon.background = backgroundsPaths[Math.floor(Math.random() * backgroundsPaths.length)]
  })

  return {
    props: {
      pokemon: data.results
    }
  }
}

const Home = ({ pokemon }: { pokemon: Pokemon[]}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(pokemon);
  const pixelArtworkUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

  useEffect(() => {
    if(!searchValue) {
      setFilteredPokemon([ ...pokemon]);
    }
  },[searchValue])

  const onClick = () => {
    if(searchValue) {
      const newfilteredPokemon = filteredPokemon.filter((pokemonObject: Pokemon) => pokemonObject.name.includes(searchValue));
      setFilteredPokemon(newfilteredPokemon);
    }
  }

  return (
    <>
      <Head>
        <title>Pokedex | Home</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className={styles.input} />
          <button onClick={onClick} className={styles.button}>
            <Image src="/search-icon.png" width={20} height={20} alt="" />
          </button>
        </div>
        <div className={styles.pokemonList}>
          { filteredPokemon.length !== 0 ? 
            filteredPokemon.map((pokemon: Pokemon) => (
              <Link href={"/" + pokemon.name} key={pokemon.name}>
                <a className={styles.pokemonCard}>
                  <div className={styles.imageContainer}>
                    <Image className={styles.grassImage} src={pokemon.background ? pokemon.background : "/grass.png"} layout="fill" objectFit="cover" alt="" />
                    <Image src={`${pixelArtworkUrl}/${pokemon.url.split('/').slice(-2)[0]}.png`} height={120} width={120} alt="" />
                  </div>
                  <div className={styles.nameContainer}>
                    <h3>{ pokemon.name }</h3>
                  </div>
                </a>
              </Link>
            )) : <p>No Pokemon found</p>
          }
        </div>
      </div>
    </>
  )
}

export default Home