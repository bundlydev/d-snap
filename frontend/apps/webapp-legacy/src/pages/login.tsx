import { Card, CardContent, CardHeader, CardTitle } from "@app/components/ui/card";
import { useAuthGuard } from "@app/hooks/useRouterGuard";
import { AuthButton } from "@app/lib/auth/auth-button";

export default function LoginPage() {
  useAuthGuard({ isPrivate: false });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="mx-auto max-w-md py-10 px-8 bg-white shadow-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold text-gray-900">Welcome to DSnap</CardTitle>
        </CardHeader>
        <CardContent className="mt-10">
          <AuthButton />
        </CardContent>
      </Card>
    </div>
  );
}
