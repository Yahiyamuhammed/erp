import { useState } from "react";
// import DataTable from "@/components/common/DataTable";
// import RolePermissionModal from "@/components/roles/RolePermissionModal";
import { useRoles } from "@/hooks/queries/useRoles";
import DataTable from "@/components/common/DataTable/DataTable";
import RolePermissionModal from "@/components/roles/RolePermissionModal";
import { useSearchParams } from "react-router-dom";

export default function RolesPage() {
  const [searchParams] = useSearchParams();
  const companyId = searchParams.get("companyId");

  const { data: roles = [], isLoading } = useRoles(companyId);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const columns = [
    {
      key: "name",
      label: "Role",
    },
    {
      key: "permissionCount",
      label: "Permissions",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Manage permissions",
      onClick: (row) => setSelectedRoleId(row._id),
    },
  ];

  return (
    <>
      <DataTable
        title="Roles"
        subtitle="Manage role permissions"
        columns={columns}
        data={roles}
        actions={actions}
        isLoading={isLoading}
        emptyText="No roles found"
      />

      <RolePermissionModal
        companyId={companyId}
        roleId={selectedRoleId}
        open={!!selectedRoleId}
        onClose={() => setSelectedRoleId(null)}
      />
    </>
  );
}
