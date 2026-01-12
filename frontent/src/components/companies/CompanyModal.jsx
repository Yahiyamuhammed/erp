import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import { useCreateCompany } from "@/hooks/mutations/useCreateCompany";
import { useUpdateCompany } from "@/hooks/mutations/useUpdateCompany";

export default function CompanyModal({ open, onClose, company }) {
  const isEdit = !!company;

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const [form, setForm] = useState({
    name: "",
    code: "",
    gstNo: "",
    isActive: true,
  });

  useEffect(() => {
    if (company) {
      setForm({
        name: company.name,
        code: company.code,
        gstNo: company.gstNo || "",
        isActive: company.isActive,
      });
    }
  }, [company]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      updateCompany.mutate({
        companyId: company._id,
        payload: {
          name: form.name,
          gstNo: form.gstNo || null,
          isActive: form.isActive,
          ...(form.code !== company.code && { code: form.code }),
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
      <div className="space-y-4">
        <input
          name="name"
          placeholder="Company name"
          value={form.name}
          onChange={handleChange}
          className="input"
        />

        <input
          name="code"
          placeholder="Company code"
          value={form.code}
          onChange={handleChange}
          disabled={isEdit}
          className="input"
        />

        <input
          name="gstNo"
          placeholder="GST number (optional)"
          value={form.gstNo}
          onChange={handleChange}
          className="input"
        />

        {isEdit && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
            />
            Active
          </label>
        )}
      </div>
    </Modal>
  );
}
