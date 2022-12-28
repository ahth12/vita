const { useState, useEffect } = React
const root = ReactDOM.createRoot(
    document.getElementById("app")
);
const Wrapper = () => {
    const [data, setData] = useState([])
    const [object, setObject] = useState(null)
    const onClickHandler = (obj) => {setObject(obj)}
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
        <div>
            <div>
                {data.length > 0 ? (
                    data.map((el) => {
                        return (
                            <div onClick={() => onClickHandler(el)} style={{ cursor: 'pointer' }} key={el.id}>
                                {el.id} {el.checkerName} {el.checkTarget} {el.checkStatus} {}
                            </div>
                        )
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div>
                {object !== null && (
                    <div>
                        {object.checkLists.map((el) => {
                            return (
                                <div onClick={() => onRowClickHandler(el.checkListStatus, el.id)} key={el.id}>
                                    {el.id} {el.name} {el.comment} {el.checkListStatus}{' '}
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

root.render(<Wrapper/>);