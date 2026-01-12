import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/common/DataTable/DataTable";
import CompanyModal from "@/components/companies/CompanyModal";
import { useCompanies } from "@/hooks/queries/useCompanies";
import { useCreateCompany } from "@/hooks/mutations/useCreateCompany";
import { useUpdateCompany } from "@/hooks/mutations/useUpdateCompany";
import { toast } from "sonner";

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { data: companies = [], isLoading } = useCompanies();

  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const handleCreate = (form) => {
    createCompany(
      {
        name: form.name,
        code: form.code,
        gstNo: form.gstNo || null,
      },
      {
        onSuccess: () => {
          toast.success("Company created successfully", {
            description: "The company is now available for user assignment",
          });
        },
        onError: (error) => {
          toast.error("Failed to create company", {
            description:
              error?.response?.data?.message ||
              "Please check the details and try again",
          });
        },
      }
    );
  };

  const handleUpdate = (form) => {
    updateCompany(
      {
        companyId: selectedCompany._id,
        payload: {
          name: form.name,
          gstNo: form.gstNo || null,
          isActive: form.isActive,
        },
      },
      {
        onSuccess: () => {
          toast.success("Company updated successfully", {
            description: "Changes have been saved",
          });
        },
        onError: (error) => {
          toast.error("Failed to update company", {
            description:
              error?.response?.data?.message ||
              "Unable to save changes at the moment",
          });
        },
      }
    );
  };

  const columns = [
    { key: "name", label: "Company" },
    { key: "code", label: "Code" },
    {
      key: "isActive",
      label: "Status",
      render: (row) => (row.isActive ? "Active" : "Inactive"),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Edit company",
      onClick: (row) => setSelectedCompany(row),
    },
    {
      label: "View employees",
      onClick: (row) => navigate(`/users?companyId=${row._id}`),
    },
  ];

  return (
    <>
      <DataTable
        title="Companies"
        subtitle="Manage companies and employees"
        columns={columns}
        data={companies}
        actions={actions}
        isLoading={isLoading}
        emptyText="No companies found"
        headerAction={{
          label: "Add company",
          onClick: () => setOpenCreate(true),
        }}
      />

      <CompanyModal
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSubmit={handleCreate}
      />

      <CompanyModal
        open={!!selectedCompany}
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
        onSubmit={handleUpdate}
      />
    </>
  );
}
