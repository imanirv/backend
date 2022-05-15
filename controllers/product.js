const express = require('express')
const {sequelize, Products} = require("../models")
const controller = {}

controller.getProducts = async (req, res) => {
    try {
        const result = await Products.findAll()
        return res.status(200).json({data: result})
    } catch (error) {
        console.log('error >', error)
        return res.status(500).json({message: error})
    }
}

controller.createProduct = async (req, res) => {
    const {name = "", qty = 0, picture="", expiredAt, isActive} = req.body
    try {
         await Products.create({
            name, qty, expiredAt, isActive
        })
        return res.status(200).json({message: "success", data: req.body })
    } catch (error) {
        console.log('error >', error)
        return res.status(500).json({message: error})
    }
}

controller.getProductById = async (req, res) => {
    const id = req.params.id
    try {
        const result = await Products.findAll({
            where: {
                id
            }
        })
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
}

controller.updateProductById = async (req, res) => {
    const id = req.params.id
    const values = req.body
    
    try {
        if (req.body.isActive) {
            throw 'cannot update isActive field'
        }
        const result = await Products.findAll({
            where: {
                id
            }
        })
        let payload = {
            name: values.name ? values.name : result.name,
            qty: values.qty ? values.qty : result.qty,
            picture: values.picture ? values.picture : result.picture,
            expiredAt: values.expiredAt ? values.expiredAt : result.expiredAt,
            isActive: values.isActive ? values.isActive : result.isActive,

        }
        const updating = await Products.update(payload, {
            where: {
                id
            }
        })
        return res.status(200).json({message: "success", data: payload})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
}
controller.deleteProductById = async (req, res) => {
    const id = req.params.id

    try {
        await Products.update({ isActive: 0 }, {
            where: {
                id
            }
        })
        return res.status(200).json({message: "deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error})
    }
}

module.exports = controller