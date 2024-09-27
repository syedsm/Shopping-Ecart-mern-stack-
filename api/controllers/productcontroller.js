const product = require('../models/products')
const checkout = require('../models/checkout')

exports.productadd = async (req, res) => {
    // console.log("All data", req.body);
    // console.log("Requested Files", req.files);
    try {
        const mainImg = req.files['mainImg'][0].filename;
        const additionalImgs = req.files['additionalImgs'].map(file => file.filename);

        const newProduct = new product({
            name: req.body.name,
            desc: req.body.desc,
            price: req.body.price,
            qty: req.body.qty,
            category: req.body.category,
            mainImg: mainImg,
            additionalImgs: additionalImgs,
        });

        const savedProduct = await newProduct.save();
        // console.log("saved", savedProduct);
        res.status(201).json({ message: "Product added successfully", product: savedProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Failed to add product' });
    }
};

exports.allproducts = async (req, res) => {
    try {
        const record = await product.find()
        // console.log(record);
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
    const id = req.params.id;

    // console.log("Body", req.body);
    // console.log("Files images", req.files);

    const { name, desc, price, qty, status, existingMainImg, existingAdditionalImgs } = req.body;
    try {
        const mainImg = req.files['img']
            ? req.files['img'][0].filename
            : existingMainImg;

        const additionalImgs = req.files['additionalImgs']
            ? req.files['additionalImgs'].map(file => file.filename)
            : existingAdditionalImgs;

        const Updatedrecord = await product.findByIdAndUpdate(id, {
            name, desc, price, qty, status, mainImg, additionalImgs
        }, { new: true });

        res.status(200).json({ message: "Product updated successfully", Updatedrecord });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: "Server Error " })
    }

};

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
        // console.log(record);
        res.json({
            status: 200,
            message: "Successfully delivered",
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

exports.categoryfilter = async (req, res) => {
    // console.log("categoryfilter", req.params.category);
    const category = req.params.category
    try {
        const filteredProducts = await product.find({
            category: category,
            status: "IN-STOCK"
        });
        // console.log(filteredProducts);
        res.status(200).json({
            message: "Successfully filtered Data",
            apiData: filteredProducts
        })

    } catch (error) {
        console.error("Error During Fetching Data ", error.message);
        res.status(400).json({
            message: err.message,
        })
    }


}

exports.buycheck = async (req, res) => {
    try {
        // console.log(req.body);
        const { ids } = req.body
        const record = await product.findOne({ _id: ids });
        // console.log("found record", record);

        if (record) {
            res.status(200).json({ success: true, record });
        } else {
            res.status(404).json({ success: false, message: "Record not found" });
        }
    } catch (error) {
        console.error("Error finding record", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

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
