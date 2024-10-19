import { auth } from "@/auth"
import SignOutButton from "@/components/SignOutButton"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type User } from "next-auth"
import Link from "next/link"
import React from "react"
import { UpdateUserForm } from "./_components/update-user-form"
import { findUserByAuth } from "@/resources/user.queries"
import { USER_ROLES } from "@/lib/constants"
import { LockIcon, UserIcon, MailIcon, KeyIcon, ActivityIcon } from "lucide-react"

const ProfilePage = async () => {
  const session = await auth()
  const isAdmin = session?.user?.role === USER_ROLES.ADMIN

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <Card>
          <CardContent>
            {!!session?.user ? <SignedIn user={session.user} /> : <SignedOut />}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

export default ProfilePage

const SignedIn = async ({ user }: { user: User }) => {
  const dbUser = await findUserByAuth()

  const session = await auth()
  const isAdmin = session?.user?.role === USER_ROLES.ADMIN

  return (
    <div className="space-y-8 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.image || undefined} alt={user.name || "User avatar"} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{dbUser.name || "User"}</h2>
            <p className="text-muted-foreground">{dbUser.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 w-fit">
          {isAdmin && (
            <Button size="lg" asChild>
              <Link href="/dashboard">
                <LockIcon className="mr-2 h-4 w-4" />
                Admin Dashboard
              </Link>
            </Button>
          )}
          <UpdateUserForm user={user} />
        </div>
      </div>

      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">User Information</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                  <dd className="flex items-center mt-1 text-sm">
                    <UserIcon className="mr-2 h-4 w-4" />
                    {dbUser.name || "Not set"}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                  <dd className="flex items-center mt-1 text-sm">
                    <MailIcon className="mr-2 h-4 w-4" />
                    {dbUser.email}
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">Role</dt>
                  <dd className="flex items-center mt-1 text-sm">
                    <KeyIcon className="mr-2 h-4 w-4" />
                    <Badge variant="secondary">{dbUser.role}</Badge>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
                  <dd className="flex items-center mt-1 text-sm">
                    <ActivityIcon className="mr-2 h-4 w-4" />
                    {dbUser.id || "Not available"}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">No recent activity to display.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end w-fit">
        <SignOutButton />
      </div>
    </div>
  )
}

const SignedOut = () => {
  return (
    <div className="text-center">
      <UserIcon className="mx-auto h-12 w-12 text-muted-foreground" />
      <h2 className="mt-2 text-2xl font-semibold">User not signed in</h2>
      <p className="mt-1 text-muted-foreground">Sign in to view and manage your profile</p>
      <Button asChild className="mt-4">
        <Link href="/auth/sign-in">Sign In</Link>
      </Button>
    </div>
  )
}