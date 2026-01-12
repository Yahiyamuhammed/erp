import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import { toast } from "sonner";

const EMPTY_FORM = {
  name: "",
  code: "",
  gstNo: "",
  isActive: true,
};

const INPUT_BASE =
  "w-full px-3 py-2 rounded-md border border-gray-300 text-sm " +
  "focus:outline-none focus:ring-2 focus:ring-[#D4F34A] focus:border-[#D4F34A]";

export default function CompanyModal({ open, onClose, company, onSubmit }) {
  const isEdit = !!company;
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (!open) return;

    if (company) {
      setForm({
        name: company.name,
        code: company.code,
        gstNo: company.gstNo || "",
        isActive: company.isActive,
      });
    } else {
      setForm(EMPTY_FORM);
    }
  }, [company, open]);

  const isDirty = useMemo(() => {
    if (!isEdit) return true;

    return (
      form.name !== company.name ||
      form.gstNo !== (company.gstNo || "") ||
      form.isActive !== company.isActive
    );
  }, [form, company, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDirty) {
      toast.info("No changes made", {
        description: "The company details are already up to date",
      });
      onClose();
      return;
    }

    onSubmit(form);
    onClose();
  };

  return (
    <Modal
      open={open}
      title={isEdit ? "Edit Company" : "Create Company"}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel={isEdit ? "Update" : "Create"}
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Company name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={INPUT_BASE}
            placeholder="Acme Corporation"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Company code</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            disabled={isEdit}
            className={`${INPUT_BASE} ${
              isEdit ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""
            }`}
            placeholder="ACME"
          />

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

        <div>
          <label className="block text-sm font-medium mb-1">
            GST number (optional)
          </label>
          <input
            name="gstNo"
            value={form.gstNo}
            onChange={handleChange}
            className={INPUT_BASE}
            placeholder="29ABCDE1234F1Z5"
          />
        </div>

        {isEdit && (
          <label className="flex items-center gap-2 text-sm pt-1">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
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
