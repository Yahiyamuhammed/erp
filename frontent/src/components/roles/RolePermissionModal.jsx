import { useEffect, useState } from "react";
// import Modal from "@/components/common/Modal";
import { usePermissions } from "@/hooks/queries/usePermissions";
import { useRoleById } from "@/hooks/queries/useRoles";
import { useUpdateRolePermissions } from "@/hooks/mutations/useUpdateRolePermissions";
import Modal from "../common/Modal/Modal";
import { XCircle } from "lucide-react";

export default function RolePermissionModal({ roleId, open, onClose }) {
  const { data: role } = useRoleById(roleId);
  const { data: allPermissions = [] } = usePermissions();
  const updatePermissions = useUpdateRolePermissions();
  //   console.log(allPermissions,role)

  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions.map((p) => p._id));
    }
  }, [role]);

  const removePermission = (id) => {
    setSelectedPermissions((prev) => prev.filter((p) => p !== id));
  };

  const togglePermission = (id) => {
    setSelectedPermissions((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const permissionMap = allPermissions.reduce((acc, p) => {
    acc[p._id] = p;
    return acc;
  }, {});

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePermissions.mutate({
      roleId,
      permissionIds: selectedPermissions,
    });

    onClose();
  };

  const filteredPermissions = allPermissions.filter((p) =>
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
        <h3 className="font-semibold mb-2 text-sm text-gray-700">
          Assigned permissions ({selectedPermissions.length})
        </h3>

        <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 max-h-32 overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {selectedPermissions.map((id) => {
              const p = permissionMap[id];
              if (!p) return null;

              return (
                <span
                  key={id}
                  className="flex items-center gap-1.5 pl-3 pr-2 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 shadow-sm"
                >
                  {p.description || p.code}
                  <button
                    type="button"
                    onClick={() => removePermission(id)}
                    className="text-gray-400 hover:text-red-600 p-0.5 rounded-full"
                  >
                    <XCircle size={14} />
                  </button>
                </span>
              );
            })}

            {selectedPermissions.length === 0 && (
              <p className="text-sm text-gray-400 italic w-full text-center py-2">
                No permissions currently assigned.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Add permissions */}
      <div className="pt-4">
        <h3 className="font-semibold mb-2 text-sm text-gray-700">
          Add permissions
        </h3>

        <div className="relative mb-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search permissions..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* CHANGE 2: Reduced max-h from 56 to 40 */}
        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
          {filteredPermissions.length > 0 ? (
            filteredPermissions.map((p) => (
              <label
                key={p._id}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  checked={selectedPermissions.includes(p._id)}
                  onChange={() => togglePermission(p._id)}
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">
                    {p.code}
                  </span>
                  {/* Optional: Show description in small text if available */}
                  {p.description && (
                    <span className="text-xs text-gray-500">
                      {p.description}
                    </span>
                  )}
                </div>
              </label>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No matching permissions found
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
