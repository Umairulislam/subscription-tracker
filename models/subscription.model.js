import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required."],
      trim: true,
      min: [2, "Subscription name must be at least 2 characters."],
      max: [50, "Subscription name must be at most 50 characters."],
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required."],
      min: [1, "Subscription must greater than 0."],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["entertainment", "education", "travel", "medical", "finance"],
      default: "entertainment",
      required: [true, "Subscription category is required."],
    },
    paymentMethod: {
      type: String,
      required: [true, "Subscription payment method is required."],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v < Date.now();
        },
        message: "Start date must be in the past.",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v > this.startDate;
        },
        message: "Renewal date must be after start date.",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Subscription user is required."],
      index: true,
    },
  },
  { timestamps: true },
);

// Auto-calculate renewal date if missing.
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
