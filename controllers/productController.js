const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saveProduct = await newProduct.save();
    res.status(200).json({
      success: true,
      message: 'Tạo mới sản phẩm thành công',
      data: saveProduct
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi tạo mới sản phẩm",
      error: error.message
    })
  }
}

const getALlProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    if(products.length === 0 ) {
      return res.status(400).send("không có sản phẩm nào")
    }
    res.status(200).send(products)
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "lỗi tạo mới",
      error: error.message
    })
  }
}

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).send("Không tìm thấy sản phẩm");
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi lấy sản phẩm");
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(400).send("Không tìm thấy sản phẩm để cập nhật");
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật sản phẩm thành công",
      data: product
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi cập nhật sản phẩm");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(
      req.params.id);

    if (!product) {
      return res.status(400).send("Không tìm thấy sản phẩm để xoá");
    }

    res.status(200).json({
      success: true,
      message: "Xoá sản phẩm thành công"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi xoá sản phẩm");
  }
};

module.exports ={
  createProduct,
  getALlProduct,
  getOneProduct,
  updateProduct,
  deleteProduct
}