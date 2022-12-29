const {useState, useEffect} = React
const root = ReactDOM.createRoot(
    document.getElementById("app")
);
const Wrapper = () => {
    const [data, setData] = useState([])
    const [object, setObject] = useState(null)
    const onClickHandler = (obj) => {
        setObject(obj)
    }
    const patchData = async (url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data)
        });
        return response.json();
    }
    const fetchData = () => {
        fetch('http://localhost:8080/check')
            .then((response) => response.json())
            .then((data) => setData(data))
    }

    const onRowClickHandler = (currentStatus, id) => {
        const status = currentStatus === 'OK' ? 'NOT_OK' : 'OK'
        setData([])
        setObject(null)
        patchData(`http://localhost:8080/checklist/${id}`, {checkListStatus: status}).then((res) => {
            if (res.name) {
                fetchData()
            }
        })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='main'>
            <div>
                {data.length > 0 ? (
                    <table className='main--top-table'>
                        <tbody>
                        <tr>
                            <td>Номер проверки</td>
                            <td>Наименование проверяемого объекта</td>
                            <td>Адрес</td>
                            <td>Статус проверки</td>
                        </tr>
                        {data.map((el) => {
                            return (
                                <tr onClick={() => onClickHandler(el)} style={{cursor: 'pointer'}} key={el.id}>
                                    <td>{el.id}</td>
                                    <td> {el.checkerName} </td>
                                    <td> {el.checkTarget} </td>
                                    <td>{el.checkStatus}</td>
                                </tr>
                            )
                        })}</tbody>
                    </table>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div>
                {object !== null && (
                    <table>
                        <tbody>
                        <tr>
                            <td>Наименование</td>
                            <td>Комментарий</td>
                            <td>Результат</td>
                        </tr>
                        {object.checkLists.map((el) => {
                            return (
                                <tr style={{cursor: 'pointer'}}  onClick={() => onRowClickHandler(el.checkListStatus, el.id)} key={el.id}>
                                    <td>  {el.name}</td>
                                    <td>  {el.comment}</td>
                                    <td><span
                                        className={el.checkListStatus === "OK" ? 'ok' : 'not-ok'}>{el.checkListStatus}</span>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

root.render(<Wrapper/>);