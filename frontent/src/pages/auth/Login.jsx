import { useLogin } from "../../hooks/mutations/useLogin";

export default function Login() {
  const { mutate: login, isPending } = useLogin();

  const handleSubmit = () => {
    login(
      {
        email: "admin@test.com",
        password: "123456",
      },
      {
        onSuccess: (data) => {
          console.log("Login success:", data);
        },
        onError: (error) => {
          console.error("Login failed:", error);
        },
      }
    );
  };

  return (
    <button onClick={handleSubmit} disabled={isPending}>
      {isPending ? "Logging in..." : "Login"}
    </button>
  );
}
