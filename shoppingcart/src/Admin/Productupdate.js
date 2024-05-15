import { useParams } from "react-router-dom";
import Left from "./Leftmenu";
import { useEffect, useState } from "react";

function Productupdate() {

    const { id } = useParams()
    const [message, setmessage] = useState('')
    const [name, setname] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [qty, setqty] = useState('')
    const [status, setstatus] = useState('')
    const [img, setimg] = useState('')
    console.log(img)


    useEffect(() => {
        fetch(`/api/singleproduct/${id}`).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setname(data.apiData.name)
                setdesc(data.apiData.desc)
                setprice(data.apiData.price)
                setqty(data.apiData.qty)
                setstatus(data.apiData.status)
                setimg(data.apiData.img)
            } else {
                setmessage(data.message)
            }
        })
    }, [id])
    function handleimage(e) {
        setimg(e.target.files[0])
    }
    function handleform(e) {
        e.preventDefault()
        let data = new FormData()
        data.append('name', name)
        data.append('desc', desc)
        data.append('price', price)
        data.append('qty', qty)
        data.append('status', status)
        data.append('img', img)

        fetch(`/api/productupdate/${id}`, {
            method: 'PUT',
            body: data
        }).then((result) => { return result.json() }).then((data) => {
            if (data.status === 200) {
                setmessage(data.message)
            } else {
                setmessage(data.message)
            }
        })
    }

    return (

        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">

                        <h3 className="text-center">Product Update Here</h3>
                        {message ?
                            <p className="alert alert-success text-center">{message}</p>
                            : <></>
                        }
                        <form onSubmit={(e) => { handleform(e) }}>
                            <label>Enter Product Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(e) => { setname(e.target.value) }}
                            />
                            <label>Enter Product Description</label>
                            <input type="text" className="form-control"
                                value={desc}
                                onChange={(e) => { setdesc(e.target.value) }}
                            />
                            <label>Product Price</label>
                            <input type="number" className="form-control"
                                value={price}
                                onChange={(e) => { setprice(e.target.value) }}
                            />
                            <label>Product Quantity</label>
                            <input type="number" className="form-control"
                                value={qty}
                                onChange={(e) => { setqty(e.target.value) }}
                            />
                            <label>Product Image</label>
                            <div><img style={{ width: '100px' }} src={`/productimages/${img}`} alt="" />
                                <input type="file" className="form-control" onChange={handleimage} />
                            </div>


                            <label>Product Status</label>
                            <select className="form-select" value={status} onChange={(e) => { setstatus(e.target.value) }}>
                                value={status}
                                <option value='IN-STOCK'>
                                    IN-STOCK
                                </option>
                                <option value='OUT-OF-STOCK'>
                                    OUT-OF-STOCK
                                </option>
                            </select>

                            <button type="submit" className="form-control mt-3 btn btn-danger">Update</button>

                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Productupdate;