import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom'
import Details from '../Details'
import './Home.module.scss'

function Home() {

    const [datas, setData] = useState([])
    const [isSortAB, setSortAB] = useState(false)
    const [isGroupUID, setGroupUID] = useState(false)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((res) => res.json())
            .then(res => {
                setData(res)
            })
            .catch((err) => console.error(err))
    }, [])

    if (isSortAB) {
        datas.sort(function (a, b) {
            if (a.title < b.title) { return -1; }
            if (a.title > b.title) { return 1; }
            return 0;
        })
    } else {
        datas.sort(function (a, b) {
            if (a.id < b.id) { return -1; }
            if (a.id > b.id) { return 1; }
            return 0;
        })
    }
    if (isGroupUID) {
        const listUID = [datas[0].userId]
        let temp = 0
        datas.forEach((data, index, arr) => {
            if (listUID[temp] !== data.userId) {
                listUID.push(data.userId)
                temp++
            }
        }
        )
        return (
            <div className="page-home">
                <h2> Home Page </h2>
                <div>
                    <div className="view-option">
                        <div onClick={() => setGroupUID(false)}>View normal</div>
                        <div onClick={() => setGroupUID(true)} >Group By ID</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    User ID
                                </th>
                                <th>
                                    Title
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUID.map((index) =>
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>
                                        {
                                            datas.map((data) =>
                                                index === data.userId ?
                                                    <li><Link to={`/details/${data.id}`}>{data.title}</Link></li>
                                                    : undefined
                                            )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        <Outlet />
                    </table>
                </div>
            </div>
        );
    }




    return (
        <div className="page-home">
            <h2> Home Page </h2>
            <div>
                <div className="view-option">
                    <div onClick={() => setGroupUID(false)}>View normal</div>
                    <div onClick={() => setGroupUID(true)} >Group By ID</div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                ID
                                <i className="fa-solid fa-sort-down sort-icon" onClick={
                                    () => isSortAB === false ? setSortAB(true) : setSortAB(false)}></i>
                            </th>
                            <th>
                                User ID
                            </th>
                            <th>
                                Title
                            </th>
                            <th>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, index) =>
                            <tr key={index}>
                                <td>{data.id}</td>
                                <td>{data.userId}</td>
                                <td>{data.title}</td>
                                <td>
                                    <Link to={`/details/${data.id}`}>View Details</Link>
                                </td>
                                <Outlet />
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Home;