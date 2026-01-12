import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import { useCreateCompany } from "@/hooks/mutations/useCreateCompany";
import { useUpdateCompany } from "@/hooks/mutations/useUpdateCompany";

const EMPTY_FORM = {
  name: "",
  code: "",
  gstNo: "",
  isActive: true,
};

export default function CompanyModal({ open, onClose, company }) {
  const isEdit = !!company;

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

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
    if (!isDirty) return;

    if (isEdit) {
      updateCompany.mutate({
        companyId: company._id,
        payload: {
          name: form.name,
          gstNo: form.gstNo || null,
          isActive: form.isActive,
        },
      });
    } else {
      createCompany.mutate({
        name: form.name,
        code: form.code,
        gstNo: form.gstNo || null,
      });
    }

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
        {/* Company name */}
        <div>
          <label className="block text-sm font-medium mb-1">Company name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="input w-full"
            placeholder="Acme Corporation"
          />
        </div>

        {/* Company code */}
        <div>
          <label className="block text-sm font-medium mb-1">Company code</label>
          <input
            name="code"
            value={form.code}
            onChange={handleChange}
            disabled={isEdit}
            className={`input w-full ${
              isEdit ? "bg-gray-100 cursor-not-allowed" : ""
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

        {/* GST */}
        <div>
          <label className="block text-sm font-medium mb-1">
            GST number (optional)
          </label>
          <input
            name="gstNo"
            value={form.gstNo}
            onChange={handleChange}
            className="input w-full"
            placeholder="29ABCDE1234F1Z5"
          />
        </div>

        {/* Status */}
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

      {/* Footer hint */}
      {isEdit && !isDirty && (
        <p className="text-xs text-gray-400 text-right pt-2">
          No changes to save
        </p>
      )}
    </Modal>
  );
}
