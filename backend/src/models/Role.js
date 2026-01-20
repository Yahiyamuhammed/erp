import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    isSystemRole: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

roleSchema.index({ name: 1, companyId: 1 }, { unique: true });

export default mongoose.model("Role", roleSchema);
