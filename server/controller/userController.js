import User from "../model/userModel.js";
/*
 * The function creates a new user record using the data from the request body and returns the saved
 * data or an error message.
 * @param req - The `req` parameter in the `create` function is typically an object representing the
 * HTTP request that the server receives from the client. It contains information such as the request
 * headers, body, parameters, query strings, and more. In this case, it seems like `req` is being used
 * to
 * @param res - The `res` parameter in the code snippet refers to the response object in an Express.js
 * route handler. It is used to send a response back to the client making the request. In this case,
 * the `res` object is used to send JSON responses with status codes such as 200 for successful
 * @returns If the `userData` object is not created successfully, a response with status code 400 and a
 * message "Bad Request" will be returned. If the `userData` object is successfully saved to the
 * database, a response with status code 200 and the saved data will be returned. If an error occurs
 * during the process, a response with status code 500 and the error message will be returned.
 */
export const create = async (req, res) => {
  try {
    const userData = User(req.body);
    if (!userData) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    const savedData = await userData.save();
    res.status(200).json({"msg":"saved successfully"});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

/**
 * The function `getAll` retrieves all user data and returns it as a JSON response, handling errors
 * appropriately.
 * @param req - The `req` parameter in the `getAll` function stands for the request object. It contains
 * information about the HTTP request that was made, such as the request headers, body, parameters, and
 * other details. In this context, it is used to handle incoming requests and interact with the client
 * making the
 * @param res - The `res` parameter in the code snippet refers to the response object in an Express.js
 * route handler. It is used to send a response back to the client making the request. In this case,
 * the `res` object is used to send JSON responses with appropriate status codes based on the outcome
 * of
 * @returns If the `User.find()` operation is successful and returns user data, the user data will be
 * returned with a status code of 200. If no user data is found, a message "User Data not found" will
 * be returned with a status code of 404. If an error occurs during the operation, a status code of 500
 * will be returned along with the error message.
 */
export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({
        message: "User Data not found",
      });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
      const userExist = await User.findById(id);
  
      if (!userExist) {
        return res.status(404).json({
          message: "User Data not found",
        });
      }
      res.status(200).json(userExist);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

  export const update = async (req, res) => {
    try {
      const id = req.params.id;
      const userData = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!userData) {
        return res.status(401).json({
          message: "User Data not found",
        });
      }
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };

export const deleteUser = async (req,res)=>{
  try{
    const id = req.params.id;
    const userData = await User.findById(id);
    if (!userData) {
      return res.status(404).json({
        message: "User Data not found",
      })}
      await User.findByIdAndDelete(id);
      res.status(200).json({message:"deleted sucessfully"})
   
  }catch(error){
    res.status(500).json({error:error})
  }

}