const Order = require('../models/orderModel');

// Thêm đơn hàng mới
const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(200).json({
      success: true,
      message: 'Tạo đơn hàng thành công',
      data: saveOrder
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng',
      error: error.message
    });
  }
};

// Lấy tất cả đơn hàng
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (orders.length === 0) {
      return res.status(400).send("Không có đơn hàng nào");
    }
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi lấy đơn hàng");
  }
};

// Cập nhật đơn hàng
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) {
      return res.status(400).send("Không tìm thấy đơn hàng để cập nhật");
    }
    res.status(200).json({
      success: true,
      message: 'Cập nhật đơn hàng thành công',
      data: order
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi cập nhật đơn hàng");
  }
};

// Xoá đơn hàng
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(400).send("Không tìm thấy đơn hàng để xoá");
    }
    res.status(200).json({
      success: true,
      message: "Xoá đơn hàng thành công"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi xoá đơn hàng");
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
};
