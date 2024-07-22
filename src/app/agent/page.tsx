import { DemandeAccepter } from "@/components/icons/demadeAccepter";
import { MesDemande } from "@/components/icons/mesdemande";
import { NotificationSvg } from "@/components/icons/notification";
import TableDemande from "@/components/table-demande";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  searchParams: {
    tab: string;
  };
}
function AgentDashbord({ searchParams: { tab } }: Props) {
  if (tab === undefined) {
    redirect("/agent?tab=mesdemandes");
  }
  return (
    <main>
      <div className="bg-white/80">
        <h1 className="px-10 pt-10 pb-6 text-2xl">
          Bienvenue Au tableau de bord de l&apos;agent
        </h1>
        <ul className="pt-2 flex  gap-1 border-b px-10">
          <li>
            <Link
              href={"/agent?tab=mesdemandes"}
              className={
                tab === "mesdemandes"
                  ? "flex gap-1 justify-center items-center p-2 border-b-4 border-blue-500 "
                  : "flex gap-1 justify-center items-center p-2"
              }
            >
              <MesDemande />
              Mes Demandes
            </Link>
          </li>
          <li>
            <Link
              href={"/agent?tab=toutesdemandes"}
              className={
                tab === "toutesdemandes"
                  ? "flex gap-1 justify-center items-center p-2 border-b-4 border-blue-500 "
                  : "flex gap-1 justify-center items-center p-2"
              }
            >
              <DemandeAccepter />
              Toutes les demandes
            </Link>
          </li>
        </ul>
      </div>
      {tab === "mesdemandes" ? (
        <TabHeader tab={"mesdemandes"} />
      ) : (
        <TabHeader tab={"toutesdemandes"} />
      )}
      <TableDemande/>

    </main>
  );
}

export default AgentDashbord;

function TabHeader({ tab }: { tab: string }) {
  return (
    <div className="flex  p-10 justify-between items-center">
      <h1 className="text-2xl">
        {tab === "mesdemandes" ? "Mes Demandes" : "Toutes les demandes"}
      </h1>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-gray-300 rounded-md">filtrer</button>
        <button className="px-4 py-2 bg-gray-300 rounded-md">Deriner 30 jours</button>
      </div>

    </div>
  );
}
