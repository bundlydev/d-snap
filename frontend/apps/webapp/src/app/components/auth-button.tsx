import { useAuth } from "ic-react";

export function AuthButton() {
  const { isAuthenticated, connect, disconnect } = useAuth();

  return !isAuthenticated ? <LoginButton login={connect} /> : <LogoutButton logout={disconnect} />;
}

type LoginButtonProps = {
  readonly login: () => void;
};

function LoginButton(props: LoginButtonProps) {
  return (
    <button className="w-full py-2 bg-purple-600 text-white rounded-md" onClick={() => props.login()}>
      <div className="flex items-center justify-center gap-2">Login</div>
    </button>
  );
}

type LogoutButtonProps = {
  readonly logout: () => void;
};

function LogoutButton(props: LogoutButtonProps) {
  return (
    <button className="w-full py-2 bg-black text-white rounded-md" onClick={() => props.logout()}>
      <div className="flex items-center justify-center gap-2">Logout</div>
    </button>
  );
}
