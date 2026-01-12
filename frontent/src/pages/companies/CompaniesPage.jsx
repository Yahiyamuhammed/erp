import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "@/components/common/DataTable/DataTable";
import { useCompanies } from "@/hooks/queries/useCompanies";
import CompanyModal from "@/components/companies/CompanyModal";

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { data: companies = [], isLoading } = useCompanies();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

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
      />

      <CompanyModal
        open={!!selectedCompany}
        company={selectedCompany}
        onClose={() => setSelectedCompany(null)}
      />
    </>
  );
}
