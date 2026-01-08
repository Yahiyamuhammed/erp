import Modal from "@/components/common/Modal/Modal";

export default function UserFormModal({
  open,
  mode,
  roles,
  register,
  errors,
  onClose,
  onSubmit,
  formatRole,
}) {
  return (
    <Modal
      open={open}
      title={mode === "create" ? "Create User" : "Edit User"}
      onClose={onClose}
      onSubmit={onSubmit}
    >
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
        {roles.map(role => (
          <option key={role._id} value={role._id}>
            {formatRole(role.name)}
          </option>
        ))}
      </select>
      {errors.roleId && (
        <p className="text-sm text-red-600">{errors.roleId.message}</p>
      )}

      {mode === "create" && (
        <>
          <input
            type="password"
            {...register("password")}
            className={`w-full border p-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </>
      )}
    </Modal>
  );
}
