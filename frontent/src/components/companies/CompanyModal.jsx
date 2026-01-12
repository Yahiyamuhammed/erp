import Modal from "@/components/common/Modal/Modal";
import { toast } from "sonner";

const INPUT_BASE =
  "w-full px-3 py-2 rounded-md border border-gray-300 text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-[#D4F34A] focus:border-[#D4F34A]";

export default function CompanyModal({
  open,
  onClose,
  isEdit,
  register,
  errors,
  isDirty,
  onSubmit,
}) {
  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Company" : "Create Company"}
      onClose={onClose}
      onSubmit={(e) => {
        if (isEdit && !isDirty) {
          e.preventDefault();
          toast.info("No changes made", {
            description: "The company details are already up to date",
          });
          onClose();
          return;
        }

        onSubmit(e);
      }}
      submitLabel={isEdit ? "Update" : "Create"}
    >
      <div className="space-y-5">
        {/* Company name */}
        <div>
          <label className="block text-sm font-medium mb-1">Company name</label>
          <input
            {...register("name")}
            className={`${INPUT_BASE} ${errors.name ? "border-red-500" : ""}`}
            placeholder="Acme Corporation"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Company code */}
        <div>
          <label className="block text-sm font-medium mb-1">Company code</label>
          <input
            {...register("code")}
            disabled={isEdit}
            className={`${INPUT_BASE} ${
              isEdit
                ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                : errors.code
                ? "border-red-500"
                : ""
            }`}
            placeholder="ACME"
          />
          {errors.code && (
            <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>
          )}

          {isEdit ? (
            <p className="text-xs text-gray-500 mt-1">
              Company code cannot be changed once created
            </p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">
              This code is permanent and will be used for login and company
              identification
            </p>
          )}
        </div>

        {/* GST */}
        <div>
          <label className="block text-sm font-medium mb-1">
            GST number (optional)
          </label>
          <input
            {...register("gstNo")}
            className={`${INPUT_BASE} ${errors.gstNo ? "border-red-500" : ""}`}
            placeholder="29ABCDE1234F1Z5"
          />
          {errors.gstNo && (
            <p className="text-sm text-red-600 mt-1">{errors.gstNo.message}</p>
          )}
        </div>

        {/* Status */}
        {isEdit && (
          <label className="flex items-center gap-2 text-sm pt-1">
            <input type="checkbox" {...register("isActive")} />
            Company is active
          </label>
        )}
      </div>

      {isEdit && !isDirty && (
        <p className="text-xs text-gray-400 text-right pt-2">
          No changes to save
        </p>
      )}
    </Modal>
  );
}
