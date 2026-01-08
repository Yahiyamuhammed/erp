export default function Modal({
  open,
  title,
  children,
  onClose,
  onSubmit,
  submitLabel = "Save",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-bold">{title}</h2>

        {children}

        <div className="flex gap-3 justify-end pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[#D4F34A] rounded font-semibold"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
