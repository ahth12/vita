const {useState, useEffect} = React
const root = ReactDOM.createRoot(
    document.getElementById("app")
);
const Wrapper = () => {
    const [data, setData] = useState([])
    const [object, setObject] = useState(null)
    const [isFocus, setIsFocus] = useState(null)
    const [value, setValue] = useState('')
    const onClickHandler = (obj) => {
        setObject(obj)
    }
    const sendComment = (value, id, index) => {
        patchData(`http://localhost:8080/checklist/${id}`, {comment: value}).then((res) => {
            if (res.name) {
                const ar = [...object.checkLists.map((el, ind) => {
                    if (ind === index) {
                        return {...el, comment: value}
                    }
                    return el
                })]
                setObject({...object, checkLists: [...ar]})

            }
        })
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


    const onRowClickHandler = (index, currentStatus, id) => {
        const status = currentStatus === 'OK' ? 'NOT_OK' : 'OK'
        patchData(`http://localhost:8080/checklist/${id}`, {checkListStatus: status}).then((res) => {
            if (res.name) {
                const ar = [...object.checkLists.map((el, ind) => {
                    if (ind === index) {
                        return {...el, checkListStatus: status}
                    }
                    return el
                })]
                setObject({...object, checkLists: [...ar]})
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
                        {object.checkLists.map((el, index) => {
                            return (
                                <tr key={el.id}>
                                    <td>  {el.name}</td>
                                    <td><input onChange={(e) => {
                                        if (isFocus === el.id){
                                            setValue(e.target.value)
                                        }
                                    }} onFocus={(e) => {
                                        setIsFocus(el.id)
                                        setValue(e.target.value)
                                    }} onBlur={e => {
                                        sendComment(value, el.id, index)
                                        setIsFocus(null)
                                        setValue('')
                                    }} value={isFocus === el.id ? value : el.comment}/></td>
                                    <td style={{cursor: 'pointer'}}
                                        onClick={() => onRowClickHandler(index, el.checkListStatus, el.id)}><span
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