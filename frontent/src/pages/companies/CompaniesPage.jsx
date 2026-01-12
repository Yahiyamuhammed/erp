import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/common/DataTable/DataTable";
import CompanyModal from "@/components/companies/CompanyModal";
import { useCompanies } from "@/hooks/queries/useCompanies";
import { useCreateCompany } from "@/hooks/mutations/useCreateCompany";
import { useUpdateCompany } from "@/hooks/mutations/useUpdateCompany";

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { data: companies = [], isLoading } = useCompanies();

  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const handleCreate = (form) => {
    createCompany.mutate({
      name: form.name,
      code: form.code,
      gstNo: form.gstNo || null,
    });
  };

  const handleUpdate = (form) => {
    updateCompany.mutate({
      companyId: selectedCompany._id,
      payload: {
        name: form.name,
        gstNo: form.gstNo || null,
        isActive: form.isActive,
      },
    });
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
      render: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Edit company",
      onClick: (row) => setSelectedCompany(row),
    },
    {
      label: "View employees",
      onClick: (row) =>
        navigate(`/users?companyId=${row._id}`),
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
