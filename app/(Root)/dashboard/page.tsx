import { auth } from "@/auth";
import { USER_ROLES } from "@/lib/constants";
import { redirect } from "next/navigation";
import { findAllUsers } from "@/resources/user.queries";
import { AdminPanelComponent } from "@/components/admin-panel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function Page() {
  const session = await auth();

  if (session?.user?.role !== USER_ROLES.ADMIN) redirect("/profile");

  const users = await findAllUsers();

  return (
    <main className="container mt-4">
      <div className="my-4 h-1 bg-muted" />
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">All Users</h2>
        <div>
          <Button asChild>
            <Link href={"/dashboard/admin-panel/create"}>
              <Plus size={16} className="mr-2" /> New
            </Link>
          </Button>
        </div>
      </div>
      <div className="my-4 h-1 bg-muted" />
      <AdminPanelComponent users={users} />
    </main>
  );
}
