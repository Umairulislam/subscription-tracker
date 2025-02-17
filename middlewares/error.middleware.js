const errorMiddleWare = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message;
    console.log(error);

    // Mongoose bad ObjectId
    if (error.name === "CastError") {
      const message = "Resource not found.";
      error = new Error(message);
      error.statusCode = 404;
    }

    // Mongoose duplicate key
    if (error.code === 11000) {
      const message = "Duplicate field value entered.";
      error = new Error(message);
      error.statusCode = 400;
    }

    // Mongoose validation
    if (error.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  } catch (error) {
    next(error);
  }
};
export default errorMiddleWare;
