import Card from "@/shared/components/ui/card";
import { Users } from "lucide-react";
import React from "react";

export const Dashboard = () => {
  return (
    <div>
      <section className="grid grid-cols-2 gap-4">
        <Card icon={Users} />
        <Card icon={Users} />
        <Card icon={Users} />
        <Card icon={Users} />
      </section>
      <section></section>
      <section></section>
    </div>
  );
};

export default Dashboard;
