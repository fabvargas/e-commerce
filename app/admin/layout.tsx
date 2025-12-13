"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/useAuth";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!isAuthenticated() || !isAdmin())) {
      router.push("/");
    }
  }, [mounted, isAuthenticated, isAdmin, router]);

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated() || !isAdmin()) {
    return null;
  }

  return <>{children}</>;
}

