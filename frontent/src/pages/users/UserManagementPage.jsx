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
import { useUpdateUser } from "@/hooks/mutations/useUpdateUser";
import DataTable from "@/components/common/DataTable/DataTable";
import UserFormModal from "@/components/users/UserFormModal";

const UserManagementPage = () => {
  const { data: users = [], isLoading } = useUsers();
  const { data: roles = [] } = useRoles();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();

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
    resolver: yupResolver(createUserSchema),
    context: { modalMode },
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
    setCurrentUser(user);

    reset({
      name: user.name,
      email: user.email,
      roleId: user.roleId?._id,
      password: "",
    });

    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (modalMode === "create") {
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
      return;
    }

    if (modalMode === "edit") {
      const toastId = toast.loading("Updating user...");

      const payload = { ...data };

      // Do not send empty password
      if (!payload.password) {
        delete payload.password;
      }

      updateUserMutation.mutate(
        {
          userId: currentUser._id,
          payload,
        },
        {
          onSuccess: () => {
            toast.success("User updated successfully", {
              id: toastId,
            });
            reset();
            setIsModalOpen(false);
            setCurrentUser(null);
          },
          onError: (err) => {
            toast.error("Failed to update user", {
              id: toastId,
              description:
                err?.response?.data?.message || "Something went wrong",
            });
          },
        }
      );
    }
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


  const columns = [
  {
    key: "user",
    label: "User",
    render: user => (
      <div>
        <div className="font-semibold">{user.name}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
    ),
  },
  {
    key: "role",
    label: "Role",
    render: user => formatRole(user.roleId.name),
  },
  {
    key: "status",
    label: "Status",
    render: user => (user.isActive ? "Active" : "Inactive"),
  },
  {
    key: "createdAt",
    label: "Created",
    render: user =>
      new Date(user.createdAt).toLocaleDateString(),
  },
];


const actions = [
  {
    label: "Edit",
    onClick: handleOpenEdit,
  },
  {
    label: "Block",
    className: "text-red-600",
    onClick: user => {
      console.log("Block user", user._id);
    },
  },
];

const headerAction = {
  label: "Add User",
  onClick: handleOpenCreate,
};


  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <>
    <UserFormModal
  open={isModalOpen}
  mode={modalMode}
  roles={roles}
  register={register}
  errors={errors}
  onClose={() => {
    setIsModalOpen(false);
    reset();
  }}
  onSubmit={handleSubmit(handleSave)}
  formatRole={formatRole}
/>

   <DataTable
  title="User Management"
  subtitle="Manage system access"
  columns={columns}
  data={filteredUsers}
  actions={actions}
  isLoading={isLoading}
  headerAction={headerAction}
  
  emptyText="No users found"
/>
  </>

  );
};

export default UserManagementPage;
