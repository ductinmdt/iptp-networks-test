import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from 'react'

function Detail() {

    let params = useParams();
    const [datas, setData] = useState({})



    useEffect(() => {
        const getAPI= async() => fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then(res => {
                res.find((data) => data.id === Number(params.id) ? setData(data) : undefined)
            })
            getAPI()
    } , [])

    // const obj = JSON.parse(data)
    console.log(datas)
    return (
        <div className="details">
            <div className="header-details">
                <Link to="/">
                        Home Page
                </Link>
            </div>
            <div className="item-detail" >
                <h2>Details Page</h2>
                <div className="item-content">
                    <div><b>Status:</b> {datas.completed ===true ? 'Completed' : 'Not completed'}</div>
                    <div><b>ID:</b> {datas.id}</div>
                    <div><b>Title:</b> {datas.title}</div>
                    <div><b>UserID:</b> {datas.userId}</div>
                </div>
            </div>
        </div>
    )
};
export default Detail;