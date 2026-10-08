import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { controlClass } from "./controlClass";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}
