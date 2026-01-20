import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";

import DataTable from "@/components/common/DataTable/DataTable";
import CompanyModal from "@/components/companies/CompanyModal";
import { useCompanies } from "@/hooks/queries/useCompanies";
import { useCreateCompany } from "@/hooks/mutations/useCreateCompany";
import { useUpdateCompany } from "@/hooks/mutations/useUpdateCompany";
import {
  createCompanySchema,
  updateCompanySchema,
} from "@/validations/company.schema";

const EMPTY_FORM = {
  name: "",
  code: "",
  gstNo: "",
  isActive: true,
};

export default function CompaniesPage() {
  const navigate = useNavigate();
  const { data: companies = [], isLoading } = useCompanies();
  const { mutate: createCompany } = useCreateCompany();
  const { mutate: updateCompany } = useUpdateCompany();

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const isEdit = !!selectedCompany;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(isEdit ? updateCompanySchema : createCompanySchema),
  });

  useEffect(() => {
    if (selectedCompany) {
      reset({
        name: selectedCompany.name,
        code: selectedCompany.code,
        gstNo: selectedCompany.gstNo || "",
        isActive: selectedCompany.isActive,
      });
    } else {
      reset(EMPTY_FORM);
    }
  }, [selectedCompany, reset]);

  const handleCreate = (data) => {
    createCompany(
      {
        name: data.name,
        code: data.code,
        gstNo: data.gstNo || null,
      },
      {
        onSuccess: () => {
          toast.success("Company created successfully", {
            description: "The company is now available for use",
          });
          setOpenCreate(false);
          reset(EMPTY_FORM);
        },
        onError: (err) => {
          toast.error("Failed to create company", {
            description:
              err?.response?.data?.message || "Unable to create company",
          });
        },
      }
    );
  };

  const handleUpdate = (data) => {
    updateCompany(
      {
        companyId: selectedCompany._id,
        payload: {
          name: data.name,
          gstNo: data.gstNo || null,
          isActive: data.isActive,
        },
      },
      {
        onSuccess: () => {
          toast.success("Company updated successfully", {
            description: "Changes have been saved",
          });
          setSelectedCompany(null);
        },
        onError: (err) => {
          toast.error("Failed to update company", {
            description:
              err?.response?.data?.message || "Unable to update company",
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
        isEdit={false}
        register={register}
        errors={errors}
        isDirty={isDirty}
        onClose={() => {
          setOpenCreate(false);
          reset(EMPTY_FORM);
        }}
        onSubmit={handleSubmit(handleCreate)}
      />

      <CompanyModal
        open={!!selectedCompany}
        isEdit
        register={register}
        errors={errors}
        isDirty={isDirty}
        onClose={() => setSelectedCompany(null)}
        onSubmit={handleSubmit(handleUpdate)}
      />
    </>
  );
}
