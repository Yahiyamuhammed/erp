import { useState } from "react";
// import DataTable from "@/components/common/DataTable";
// import RolePermissionModal from "@/components/roles/RolePermissionModal";
import { useRoles } from "@/hooks/queries/useRoles";
import DataTable from "@/components/common/DataTable/DataTable";
import RolePermissionModal from "@/components/roles/RolePermissionModal";

export default function RolesPage() {
  const { data: roles = [], isLoading } = useRoles();
  const [selectedRoleId, setSelectedRoleId] = useState(null);
    console.log(roles)
  const columns = [
    {
      key: "name",
      label: "Role",
    },
    {
      key: "permissionCount",
      label: "Permissions",
    //   render: row => row?.permissions?.length,
    },
    {
      key: "createdAt",
      label: "Created",
      render: row =>
        new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const actions = [
    {
      label: "Manage permissions",
      onClick: row => setSelectedRoleId(row._id),
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
        roleId={selectedRoleId}
        open={!!selectedRoleId}
        onClose={() => setSelectedRoleId(null)}
      />
    </>
  );
}
