import { useContext, useState } from "react";
import Left from "./Leftmenu";
import { Contextapi } from "../Contextapi";

function Productadd() {
    const [name, setname] = useState('');
    const [desc, setdesc] = useState('');
    const [price, setprice] = useState('');
    const [qty, setqty] = useState('');
    const [img, setimg] = useState(null);
    const [imgPreview, setImgPreview] = useState('');
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('token')

//    const {themeMode}= useContext(Contextapi)

    function handleimage(e) {
        const file = e.target.files[0];
        if (file) {
            setimg(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImgPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setimg(null);
            setImgPreview('');
        }
    }

    function handleform(e) {
        e.preventDefault();
        console.log(name, desc, price, qty, img);
        let data = new FormData();
        data.append('name', name);
        data.append('desc', desc);
        data.append('price', price);
        data.append('qty', qty);
        data.append('img', img);

        fetch(`${process.env.REACT_APP_API_URL}/api/productadd`, {
            method: "POST",
            body: data, headers: {
                authorization: `Bearer ${token}`
            }
        }).then((result) => result.json()).then((data) => {
            if (data.status === 201) {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        });
    }

    return (
        <section id="mid">
            <div className="container">
                <div className="row">
                    <Left />
                    <div className="col-md-9">
                        <h2 className="text-center">Product Add here</h2>
                        <p>{message}</p>
                        <form onSubmit={(e) => handleform(e)}>
                            <label>Product Name</label>
                            <input type="text" className="form-control"
                                value={name}
                                onChange={(e) => setname(e.target.value)}
                            />
                            <label>Product Description</label>
                            <input type="text" className="form-control"
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                            />
                            <label>Product Price</label>
                            <input type="number" className="form-control"
                                value={price}
                                onChange={(e) => setprice(e.target.value)}
                            />
                            <label>Product Quantity</label>
                            <input type="number" className="form-control"
                                value={qty}
                                onChange={(e) => setqty(e.target.value)}
                            />
                            <label>Product Image</label>
                            <div>
                                {imgPreview && (
                                    <img style={{ width: '100px' }} src={imgPreview} alt="Product preview" />
                                )}
                                <input type="file" className="form-control mt-2"
                                    onChange={handleimage}
                                />
                            </div>
                            <button type="submit" className="form-control mt-3 btn btn-danger">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Productadd;
