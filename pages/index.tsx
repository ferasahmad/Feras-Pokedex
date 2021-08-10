import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { useEffect, useState } from 'react'

export const getStaticProps = async () => {
  let pokemon: any = [];

  for(let i = 1; i <= 151; i++) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    const data = await response.json();
    pokemon.push(data);
  }

  return {
    props: {
      pokemon
    }
  }
}

const Home = ({ pokemon }: { pokemon: any}) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState<any>(pokemon);

  useEffect(() => {
    if(!searchValue) {
      setFilteredPokemon([ ...pokemon]);
    }
  },[searchValue])

  const onClick = () => {
    if(searchValue) {
      const newfilteredPokemon = filteredPokemon.filter((pokemonObject: any) => pokemonObject.name.includes(searchValue));
      setFilteredPokemon(newfilteredPokemon);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input value={searchValue} onChange={(event) => setSearchValue(event.target.value)} className={styles.input} />
        <button onClick={onClick} className={styles.button}>
          <Image src="/search-icon.png" width={20} height={20} alt="" />
        </button>
      </div>
      <div className={styles.pokemonList}>
        { filteredPokemon.length !== 0 ? 
          filteredPokemon.map((pokemon: any) => (
            <Link href={"/" + pokemon.name} key={pokemon.id}>
              <a className={styles.pokemonCard}>
                <div className={styles.imageContainer}>
                  <img src={pokemon.sprites.front_default} height={100} width={100} alt="" />
                </div>
                <h3>{ pokemon.name }</h3>
              </a>
            </Link>
          )) : <p>No Pokemon found</p>
        }
      </div>
    </div>
  )
}

export default Home