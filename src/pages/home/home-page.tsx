import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProgressBar from "@/components/ui/testProgress";
import { AlertTriangle, Check, Euro } from "lucide-react";

import { useCheckConnection } from "@/features/hooks";
import { fetchDashboardInfos } from "@/features/services/dashboardService";
import { useQuery } from "react-query";
import CaInfo from "./caInfo";

export default function HomePage() {
  useCheckConnection();
  const {
    data: dashboardInfo,
    isLoading,
    isError,
    isSuccess,
  } = useQuery("dashboardInfo", () => fetchDashboardInfos());

  if (isLoading) {
    return "loading";
  }
  if (isError) {
    return "error";
  }

  if (isSuccess) {
    return (
      <div className="container mt-5">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="tracking-tight text-sm font-medium">
                      Chiffre affaire en cours
                    </h3>
                    <Euro className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    {dashboardInfo.currentCA.toFixed(2)}€
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="tracking-tight text-sm font-medium">
                      Nombre de jours travaillé ce mois
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardInfo.workPeriodInfos.map((i) => (
                    <div className="flex gap-2">
                      <p>{i.customerName}</p>
                      <p>{i.nbDaysWorked}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="tracking-tight text-sm font-medium">
                      Progression CA/plafond
                    </h3>
                    <CaInfo />
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardInfo.plafondActivite ? (
                    <ProgressBar
                      max={dashboardInfo.plafondActivite}
                      atteint={dashboardInfo.currentCA}
                    />
                  ) : (
                    <Alert variant={"destructive"}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Plafond non défini!</AlertTitle>
                      <AlertDescription>
                        Pour avoir un plafond qui correspond à votre activité
                        veuillez saisir dans votre profil votre type
                        d&apos;activité
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="tracking-tight text-sm font-medium">
                      Factures en retard
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardInfo.lateInvoices.length === 0 ? (
                    <p className="text-2xl font-bold flex justify-center items-center">
                      0 <Check color="green" />
                    </p>
                  ) : (
                    <ul>
                      {dashboardInfo.lateInvoices.map((i) => (
                        <li key={i.id}>
                          <a href={`/invoice/view/${i.id}`}>{i.number}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <h3 className="tracking-tight text-sm font-medium">
                      TODO URGENT!
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  {dashboardInfo.criticalTaskDto.length === 0 ? (
                    <p className="text-2xl font-bold flex justify-center items-center">
                      Aucune tache urgente! <Check color="green" />
                    </p>
                  ) : (
                    <ul className="list-disc list-inside">
                      {dashboardInfo.criticalTaskDto.map((task) => (
                        <li
                          key={task.id}
                          className="text-lg font-medium text-gray-800 mb-2"
                        >
                          {task.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
