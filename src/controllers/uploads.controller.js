const { request, response } = require('express');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL=cloudinary);

const { uploadFile } = require('../helpers');
const { User, Product, Category } = require('../models');

const uploadImage = async (req = request, res = response) => {

  const { archivo } = req.files;

  try {
    const resp = await uploadFile(archivo);
    res.status(200).json({ resp });
  } catch (error) {
    res.status(400).json(error);
  }
};

const updateImage = async (req = request, res = response) => {
  let model;
  const { id, collection } = req.params;

  switch (collection) {
    case 'users':
      try {
        model = await User.findById(id);
        if (!model) {
          return res
            .status(400)
            .json({ msg: 'there is not a user with id', id });
        }
      } catch (error) {
        return res.json(400).json({ error });
      }
      break;

    case 'products':
      try {
        model = await Product.findById(id);
        if (!model) {
          return res
            .status(400)
            .objectjson({ msg: 'there is not a product with id', id });
        }
      } catch (error) {
        return res.json(400).json({ error });
      }
      break;
    default:
      return res
        .status(500)
        .json({ msg: 'contact developer team Error on updating image' });
  }
  const { tempFilePath } = req.files.archivo;
  if (model.img) {
    console.log('si hay');
    try {
      
    } catch (error) {
      res.status(500).json(error);
    }
  }
  console.log('no hay',tempFilePath);
  try {
    const image = await cloudinary.uploader.upload(tempFilePath);
    model.img = image.secure_url;
    await model.save();
    res.status(200).json(model);
  } catch (error) {
    res.status(500).json(error);
  }

  

};

module.exports = { uploadImage, updateImage };
