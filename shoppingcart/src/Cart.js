import { useContext, useEffect, useState } from "react";
import { Contextapi } from "./App";
import { Link, useNavigate, useParams } from "react-router-dom";


function Cart() {
    const { cart, setCart, loginname } = useContext(Contextapi)
    const [product, setProducts] = useState([])
    const [message, setmessage] = useState()


    let navigate = useNavigate()
    let totalamount = 0

    useEffect(() => {
        if (!cart.item) {
            return
        }
        fetch('/api/cartproducts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ids: Object.keys(cart.item) })
        }).then((result) => { return result.json() }).then((data) => {
            // console.log(data)
            // console.log(data.apiData)
            if (data.status === 200) {
                setProducts(data.apiData)
            } else {
                setmessage(data.message)
            }
        })
    }, [cart.item])

    function handlequan(id) {
        // let quantity = cart.items[id]
        // return quantity
        return cart.item[id]
    }

    function handleincrement(e, id, qty) {
        let currentqty = handlequan(id)
        if (qty === currentqty) {
            alert('Product Reached Maximum limit')
            return
        }
        let _cart = { ...cart }
        _cart.item[id] = currentqty + 1
        _cart.totalItems += 1
        setCart(_cart)

    }

    function handledecre(e, id) {
        let currentqty = handlequan(id)
        if (currentqty === 1) {
            return
        }
        let _cart = { ...cart }
        _cart.item[id] = currentqty - 1
        _cart.totalItems -= 1
        setCart(_cart)
    }

    function handleprice(id, price) {
        let currentprice = handlequan(id) * price
        totalamount += currentprice
        return currentprice
    }

    function handlecheckout(e) {
        if (!loginname) {
            navigate('/')
            return;
        } else {
            localStorage.setItem('cart','')
            setCart(localStorage.getItem('cart'))
            navigate('/userproduct')
        }
    }

    function handledelete(e, id) {
        let current_qnty = handlequan(id)
        console.log("current_qnty:", current_qnty)
        let _cart = { ...cart }
        delete _cart.item[id]
        _cart.totalItems -= current_qnty
        setCart(_cart)
    }

    // function handledelete(e,id){
    //     let current_qnty=handlequan(id)
    //     console.log("current",current_qnty)
    //     let _cart={...cart}
    //     console.log("_cart",_cart);
    //    delete _cart.item[id]
    //     _cart.totalItems -= current_qnty
    //     console.log("_cart.totalitems",_cart.totalItems)
    //     setCart(_cart)

    // }

    // function deleteproduct(id) {
    //     // console.log(id)
    //     // useEffect(()=>{
    //         fetch(`/api/productdelete/${id}`, {
    //             method: 'DELETE'
    //         }).then((result) => { return result.json() }).then((data) => {
    //             console.log(data)
    //             if (data.status === 200) {
    //                 navigate('/cart')
    //             } else {
    //                 message(message)
    //             }
    //         })
    //     // },[])
    // }

    return (
        <>
            {product.length ?

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>S.NO</th>
                            <th>product name</th>
                            <th>product Image</th>
                            <th>product Quantity</th>
                            <th>product Price</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.map((result, key) => (
                            <tr key={result._id}>
                                <td>{key + 1}</td>
                                <td>{result.name}</td>
                                <td><img style={{ width: '100px' }} src={`/productimages/${result.img}`} alt="" /></td>
                                <td><button onClick={(e) => { handleincrement(e, result._id, result.qty) }}>+</button>{handlequan(result._id)}<button onClick={(e) => { handledecre(e, result._id) }}>-</button></td>
                                <td>{handleprice(result._id, result.price)}</td>
                                <td>
                                    {/* <Link to={`/delete/${result._id}`}> */}
                                    <button onClick={(e) => { handledelete(e, result._id) }} className="btn btn-info"><i class="bi bi-x-lg"></i></button>
                                    {/* </Link> */}
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="6"><h4 className="text-center">Total Amount : {totalamount} ₹</h4></td>
                        </tr>
                        <tr>
                            <td colSpan="6"><button className="btn btn-warning form-control" onClick={(e) => { handlecheckout(e) }}> Checkout</button></td>
                        </tr>
                    </tbody>
                </table>
                :
                <img src="7612-removebg-preview.png" style={{ width: "45%" }} className="img-fluid rounded mx-auto d-block " alt="..." />
            }
        </>
    );
}

export default Cart;