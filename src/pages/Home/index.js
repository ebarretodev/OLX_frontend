import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageArea, SearchArea } from './styled'
import { PageContainer } from '../../components/MainComponents'
import useApi from '../../helpers/OlxApi'
import AdItem from '../../components/partials/AdItem'

const Page = () =>{

    const api = useApi()

    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])
    const [adsList, setAdsList] = useState([])

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates()
            setStateList(slist)
        }
        getStates()
    }, [])

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories()
            setCategories(cats)
        }
        getCategories()
    }, [])

    useEffect(()=>{
        const getRecentsAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            })
            setAdsList(json.ads)
        }
        getRecentsAds()
    }, [])

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/ads">
                            <input type="text" name="q" placeholder="O que você procura?" />
                            <select name="state">
                                <option></option> 
                                    {stateList.map((i,k)=>
                                        <option key={k} value={i._id}>{i.name}</option>
                                        
                                    )}
                            </select>
                            <button>Pesquisar</button>

                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i,k)=>
                            <Link key={k} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={ i.img } alt="" />
                                <span>{i.name}</span>
                            </Link>
                            )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adsList.map((i, k) =>
                            <AdItem key={k} data={i} />
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>
                    <hr />
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </PageArea>
            </PageContainer>
        </>
        
    )
}

export default Page