import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Slide } from 'react-slideshow-image'
import { PageArea, Fake } from './styled'
import { PageContainer } from '../../components/MainComponents'
import useApi from '../../helpers/OlxApi'

const Page = () =>{

    const api = useApi()

    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [adInfo, setAdInfo] = useState({})

    useEffect(()=>{
        const getAdInfo = async (id)=>{
            const json = await api.getAd(id, true)
            console.log(json)
            setAdInfo(json)
            setLoading(false)

        }
        getAdInfo(id)
    }, [])

    const formateDate = (date) => {
        let cDate = new Date(date)
        let months = ["janeiro", "fevereiro", "março", 'abril', 'maio','junho','julho','agosto', 'setembro', 'outubro', 'novembro', 'dezembro']
        let cDay = cDate.getDay()
        let cMonth = cDate.getMonth()
        let cYear = cDate.getFullYear()

        return `${cDay} de ${months[cMonth]} de ${cYear}`
    }

    return (
        <PageContainer>
            <PageArea>
                <div className="leftSide">
                    <div className="box">
                        <div className="adImage">
                            {loading && <Fake height={300} />}
                            {adInfo.images &&
                                <Slide >
                                    {adInfo.images.map((img, k) =>
                                        <div key={k}  className='each-slide'>
                                            <img src={img} alt="" />
                                        </div>
                                    )}
                                </Slide>
                            }
                        </div>
                        <div className="adInfo">
                            <div className="adName">
                                {loading && <Fake height={20} />}
                                {adInfo.title &&
                                    <h2>{adInfo.title}</h2>
                                }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formateDate(adInfo.dateCreated)} </small>

                                }
                            </div>
                            <div className="adDescription">
                                {loading && <Fake height={100}/>}
                                {adInfo.description}
                                <hr></hr>
                                {adInfo.views && 
                                    <small>Visualizações: {adInfo.views}</small>    
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rightSide">
                    <div className="box box--padding">
                        {loading && <Fake height={20} />}
                    </div>
                    <div className="box box--padding">
                        {loading && <Fake height={50} />}
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    )
}

export default Page