const product = require('../models/products')
const checkout = require('../models/checkout')

exports.productadd = (req, res) => {
    // console.log(req.body)
    // console.log(req.file)

    const { name, desc, price, qty } = req.body
    try {
        if (req.file) {
            const filename = req.file.filename
            var record = new product({ name: name, desc: desc, price: price, qty: qty, img: filename })
            record.save()
            // console.log(record)
        } else {
            var record = new product({ name: name, desc: desc, price: price, qty: qty })
            record.save()
            // console.log(record)
        }
        res.json({
            status: 201,
            apiData: record,
            message: 'Successfully product has been Added'
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.allproducts = async (req, res) => {
    try {
        const record = await product.find()
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.singleupdate = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    try {
        const record = await product.findById(id)
        res.json({
            status: 200,
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.productupdate = async (req, res) => {
    // console.log(req.file)
    // console.log(req.params.id)
    // console.log(req.body)
    const id = req.params.id
    const { name, desc, price, qty, status } = req.body
    try {

        if (req.file) {
            const filename = req.file.filename
            await product.findByIdAndUpdate(id, { name: name, desc: desc, qty: qty, img: filename, status: status, price: price })

        } else {
            await product.findByIdAndUpdate(id, { name: name, desc: desc, qty: qty, status: status, price: price })

        }
        res.json({
            status: 200,
            message: "Successfully Product has been Updated"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

}

exports.delete = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    try {
        await product.findByIdAndDelete(id)
        res.json({
            status: 200,
            message: "Successfully Record Deleted"
        })
    }
    catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }

}

exports.instockproducts = async (req, res) => {
    try {
        const record = await product.find({ status: 'IN-STOCK' })
        res.json({
            status: 200,
            message: "Successfully delivered ",
            apiData: record
        })
    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.cartproducts = async (req, res) => {
    // console.log(req.body)
    try {
        const { ids } = req.body
        const record = await product.find({ _id: { $in: ids } })
        // console.log(record)
        res.json({
            status: 200,
            apiData: record,
            message: "Suucessfully Delivered"
        })
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })
    }
}

exports.singleproductfetch = async (req, res) => {
    // console.log(req.params.id);
    const productId = req.params.id
    try {
        const record = await product.findOne({ _id: productId })
        if (!record) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // console.log(record);
        res.json(record);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

// exports.cartvalue = async (req, res) => {
//     const username = req.params.loginname
//     const { item } = req.body
//     const totalItems = req.body.totalItems

//     // console.log (req.body.item)
//     // console.log(req.body)
//     // const loginname=req.params.loginname
//     // const item=req.body({item,totalItems})
//     // const {loginname}=req.params.loginname
//     const { id } = req.body.item
//     try {
//         for (const id in item) {
//             // console.log(id)
//             const record1 = await product.findById(id)
//             // console.log(record.name)
//             const name = record1.name
//             const record = new checkout({ productname: name, username: username, quantity: totalItems })
//             record.save()
//         }
//         res.json({
//             status: 200,
//             // apiData: record,
//             message: "Successfully data Inserted into cart "
//         })
//     } catch (error) {

//         res.json({
//             status: 400,
//             message: error.message
//         })
//     }
// }



