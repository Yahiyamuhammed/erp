import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  MoreVertical,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  Shield,
  Mail,
  Lock,
  User,
} from "lucide-react";
import { toast } from "sonner";

// import { useUsers } from "../../hooks/query/useUsers";
import { useRoles } from "@/hooks/queries/useRoles";
import { useCreateUser } from "@/hooks/mutations/useCreateUser";
import { useUsers } from "@/hooks/queries/useUsers";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserSchema } from "@/validations/user.schema";

const UserManagementPage = () => {
  const { data: users = [], isLoading } = useUsers();
  const { data: roles = [] } = useRoles();
  const createUserMutation = useCreateUser();

  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [currentUser, setCurrentUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createUserSchema ,{ context: { modalMode } }),
  });

  const handleOpenCreate = () => {
    setModalMode("create");
    reset({
      name: "",
      email: "",
      password: "",
      roleId: roles[0]?._id || "",
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setModalMode("edit");

    reset({
      name: user.name,
      email: user.email,
      roleId: user.roleId?._id,
      password: "",
    });

    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    const toastId = toast.loading("Creating user...");

    createUserMutation.mutate(data, {
      onSuccess: () => {
        toast.success("User created successfully", {
          id: toastId,
        });
        reset();
        setIsModalOpen(false);
      },
      onError: (err) => {
        toast.error("Failed to create user", {
          id: toastId,
          description: err?.response?.data?.message || "Something went wrong",
        });
      },
    });
  };

  const formatRole = (role) =>
    role
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6 relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-gray-500">Manage system access</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-[#D4F34A] px-6 py-3 rounded-xl font-semibold"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-4">
                  <div className="font-semibold">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="p-4">{formatRole(user.roleId.name)}</td>
                <td className="p-4">{user.isActive ? "Active" : "Inactive"}</td>
                <td className="p-4">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className="text-blue-600"
                  >
                    <Edit3 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="p-6 text-center text-gray-500">No users found</div>
        )}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <form
            onSubmit={handleSubmit(handleSave)}
            className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
          >
            <h2 className="text-xl font-bold">
              {modalMode === "create" ? "Create User" : "Edit User"}
            </h2>

            <input
              {...register("name")}
              className={`w-full border p-2 rounded ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}

            <input
              {...register("email")}
              className={`w-full border p-2 rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}

            <select
              {...register("roleId")}
              className={`w-full border p-2 rounded ${
                errors.roleId ? "border-red-500" : ""
              }`}
            >
              <option value="">Select role</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {formatRole(r.name)}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="text-sm text-red-600">{errors.roleId.message}</p>
            )}

           { modalMode== 'create' && <input
              type="password"
              {...register("password")}
              className={`w-full border p-2 rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Password"
            />}
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#D4F34A] rounded font-semibold"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagementPage;
