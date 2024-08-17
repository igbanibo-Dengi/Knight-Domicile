"use client";

import { useForm } from "react-hook-form";
import { valibotResolver } from "@hookform/resolvers/valibot";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SigninInput, SigninSchema } from "@/validators/signin-validator";
import { signInAction } from "@/lib/actions/signin.actions";

export const SignInForm = () => {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<SigninInput>({
    resolver: valibotResolver(SigninSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit, control, formState, setError, reset } = form;

  const submit = async (values: SigninInput) => {
    // console.log(values);
    const res = await signInAction(values);

    if (res.success) {
      reset();
    } else {
      console.log("this shouldnt be happening");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-[600px] space-y-4 px-20 "
        autoComplete="false"
      >
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="e.g. john.smith@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="e.g. ********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size={"lg"}
          disabled={formState.isSubmitting}
          className="w-full "
        >
          Sign In
        </Button>
      </form>
    </Form>
  );
};
