const reg = require('../models/reg')
const bcrypt = require('bcrypt')

exports.reg = async (req, res) => {
    // console.log(req.body)
    const { Username, Password } = req.body
    try {
        const userCheck = await reg.findOne({ $or: [{ username: Username }, { password: Password }] });
        // const usercheck = await reg.findOne({ username: Username })
        //  console.log("userCheck", userCheck)
        if (userCheck == null) {
            const convertedpass = await bcrypt.hash(Password, 10)
            const record = new reg({ username: Username, password: convertedpass })
            record.save()
            res.json({
                status: 201,
                apiData: record,
                message: "Successfully account has been Created "
            })
        } else {
            res.json({
                status: 400,
                message: `${Username} Username Already taken`
            })

        }
    } catch (error) {
        res.json({
            status: 400,
            message: error.message
        })

    }
}

exports.logincheck = async (req, res) => {
    // console.log(req.body)
    try {
        const { Username, Password } = req.body
        const record = await reg.findOne({ username: Username })
        // console.log(record)
        if (record !== null) {
            const passwordcompared = await bcrypt.compare(Password, record.password)

            if (passwordcompared) {
                if (record.status == "Active") {
                    res.json({
                        status: 201,
                        apiData: record
                    })
                }
                else {
                    res.json({
                        status: 400,
                        message: "User Status not active"
                    })
                }

            } else {
                res.json({
                    status: 400,
                    message: "Password not matched "
                })
            }

        } else {
            res.json({
                status: 400,
                message: "Wrong Crediantles"
            })

        }



    } catch (error) {
        res.json({
            status: 500,
            message: error.message
        })
    }
}

exports.userfetch = async (req, res) => {
    // console.log(req.params.id)
    try {
        const record = await reg.find()
        // console.log(record)
        res.json({
            status: 200,
            message: 'success',
            record: record
        })
    } catch (error) {
        res.json({
            status: 200,
            message: error.message,
        })
    }

}

exports.userupdate = async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    try {
        const record = await reg.findById(id)
        // console.log(record)
        res.json({
            status: 200,
            message: 'Suucessfully delivered'
        })

    } catch (error) {
        res.json({
            message: 'error.message'
        })
    }
}

exports.update = async (req, res) => {
    const userId = req.params.id;
    const newStatus = req.body.status; // New status received from the request body
    // console.log("user status:", newStatus, " ", "User ID:", userId);

    try {
        // Find the user by ID and update the status
        const updatedUser = await reg.findByIdAndUpdate(
            userId,
            { $set: { status: newStatus } }
        );

        if (!updatedUser) {
            return res.status(404).json({ status: 404, message: 'User not found' });
        }
        return res.json({ status: 200, message: 'Status updated successfully' });
    }
    catch (error) {
        console.error(error);
        return
        res.status(500).json(
            { status: 500, message: 'Internal server error' });
    }
}