import type { NextPage, GetStaticProps } from 'next'
import { Grid } from '@nextui-org/react'
import { Layout } from '../components/layouts'
import { pokeApi } from '../api'
import { PokemonListResponse, SmallPokemon } from '../interface'
import { PokemonCard } from '../components/pokemon'

interface Props {
  pokemons: SmallPokemon[]
}


const Home: NextPage<Props> = ({ pokemons }) => {

  return (
   <Layout title='Listado de Pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon)=>(
              <PokemonCard key={pokemon.id} pokemon={pokemon}/>
          ))
        }
      </Grid.Container>
   </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon/?limit=151')

  const pokemons: SmallPokemon[] = data.results.map((pokemon, ind)=>({
    ...pokemon,
    id: ind+1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ind+1}.png`
  }))

  return {
    props: {
      pokemons
    }
  }
}


export default Home
