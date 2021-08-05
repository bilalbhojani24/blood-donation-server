import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedData = jwt.verify(token, "test-bilal");
    req.userId = decodedData?.id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: false,
      message: error,
    });
  }
};

export default auth;
