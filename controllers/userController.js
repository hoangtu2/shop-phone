const userModel = require('../models/userModel')
const registerController = async (req, res) => {
  try {
    const {name, email, password, phone, address} = req.body;
    if(!name) {
      return res.status(500).send({message: "Hay nhap ten"})
    }
    if(!email) {
     return  res.status(500).send({message: "Hay nhap email"})
    }
     if(!password) {
      return res.status(500).send({message: "Hay nhap password"})
    }
     if(!phone) {
      return res.status(500).send({message: "Hay nhap phone"})
    }
     if(!address) {
      return res.status(500).send({message: "Hay nhap address"})
    }
    const userExist = await userModel.findOne({email});
    if(userExist) {
      res.status(400).send({
        success: false,
        message: "tai khoan da ton tai"
      })
    }


    const user = await new userModel({
      name,
      email,
      password,
      phone,
      address
    }).save()
    res.status(200).json({
      success: true,
      message: 'régiter success ',
      user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Loi k the register'
    })
  }
}



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email) {
      return res.status(400).send({ message: "Hãy nhập email" });
    }
    if (!password) {
      return res.status(400).send({ message: "Hãy nhập mật khẩu" });
    }

    // Tìm user theo email và password (không hash)
    const user = await userModel.findOne({ email, password });

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Email hoặc mật khẩu không đúng"
      });
    }

    // Đăng nhập thành công
    const { password: pw, ...userWithoutPassword } = user._doc;

    return res.status(200).json({
      success: true,
      message: "Đăng nhập thành công",
      user: userWithoutPassword
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Lỗi máy chủ khi đăng nhập"
    });
  }
};
const createUser = async (req, res) => {
  try {
    const newUser = new userModel(req.body);
    const saveUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Tạo tài khoản thành công",
      data: saveUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi tạo tài khoản");
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (users.length === 0) {
      return res.status(400).send("Không có tài khoản nào");
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi lấy danh sách tài khoản");
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!user) {
      return res.status(400).send("Không tìm thấy tài khoản để cập nhật");
    }

    res.status(200).json({
      success: true,
      message: "Cập nhật tài khoản thành công",
      data: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi cập nhật tài khoản");
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(400).send("Không tìm thấy tài khoản để xoá");
    }

    res.status(200).json({
      success: true,
      message: "Xoá tài khoản thành công"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Lỗi server khi xoá tài khoản");
  }
};
module.exports = {
  registerController,
  loginController,
  getAllUser,
  createUser,
  updateUser,
  deleteUser
}