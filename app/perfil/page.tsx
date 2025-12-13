"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import PerfilForm from "@/component/PerfilForm";

export default function Perfil() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated()) {
    return null;
  }

  return (
    <div className="w-full sm:p-6 p-3 md:p-16 flex justify-center items-center">
      <PerfilForm />
    </div>
  );
}

