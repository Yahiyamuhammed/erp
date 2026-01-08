import { useEffect, useState } from "react";
// import Modal from "@/components/common/Modal";
import { usePermissions } from "@/hooks/queries/usePermissions";
import { useRoleById } from "@/hooks/queries/useRoles";
import { useUpdateRolePermissions } from "@/hooks/mutations/useUpdateRolePermissions";
import Modal from "../common/Modal/Modal";

export default function RolePermissionModal({ roleId, open, onClose }) {
  const { data: role } = useRoleById(roleId);
  const { data: allPermissions = [] } = usePermissions();
  const updatePermissions = useUpdateRolePermissions();
  console.log(allPermissions,role)

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions.map(p => p._id));
    }
  }, [role]);

  const removePermission = id => {
    setSelectedPermissions(prev => prev.filter(p => p !== id));
  };

  const togglePermission = id => {
    setSelectedPermissions(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    updatePermissions.mutate({
      roleId,
      permissionIds: selectedPermissions,
    });

    onClose();
  };

  const filteredPermissions = allPermissions.filter(p =>
    p.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Modal
      open={open}
      title={`Manage Permissions – ${role?.name || ""}`}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitLabel="Save changes"
    >
      {/* Assigned permissions */}
      <div>
        <h3 className="font-semibold mb-2">Assigned permissions</h3>

        <div className="flex flex-wrap gap-2">
          {role?.permissions.map(p => (
            <span
              key={p._id}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
            >
              {p.description}
              <button
                type="button"
                onClick={() => removePermission(p._id)}
                className="text-gray-500 hover:text-red-600"
              >
                ×
              </button>
            </span>
          ))}

          {selectedPermissions.length === 0 && (
            <p className="text-sm text-gray-500">
              No permissions assigned
            </p>
          )}
        </div>
      </div>

      {/* Add permissions */}
      <div className="pt-4">
        <h3 className="font-semibold mb-2">Add permissions</h3>

        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search permissions..."
          className="w-full border rounded px-3 py-2 mb-2"
        />

        <div className="max-h-56 overflow-y-auto border rounded">
          {filteredPermissions.map(p => (
            <label
              key={p._id}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
            >
              <input
                type="checkbox"
                checked={selectedPermissions.includes(p._id)}
                onChange={() => togglePermission(p._id)}
              />
              <span className="text-sm">{p.code}</span>
            </label>
          ))}
        </div>
      </div>
    </Modal>
  );
}
