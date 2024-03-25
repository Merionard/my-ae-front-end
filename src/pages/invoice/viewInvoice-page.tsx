import { Typography } from "@/components/ui/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCheckConnection } from "@/features/hooks";
import { fetchInvoice } from "@/features/services/invoiceService";

import clsx from "clsx";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

export default function ViewInvoice() {
  const { id } = useParams();
  if (!id) {
    throw new Error("Paramètre invalide!");
  }
  useCheckConnection();

  const { data: invoice, isSuccess: loadInvoiceSuccess } = useQuery(
    ["invoice", id],
    () => fetchInvoice(id)
  );
  if (loadInvoiceSuccess)
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader className="bg-primary-foreground">
            <CardTitle>Facture {invoice.number}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between gap-5 mt-5">
              <div className="w-1/2 space-y-1">
                <Typography variant={"h3"} className="mb-3">
                  Destinataire
                </Typography>

                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Destinataire</div>
                  <div className="flex-[2_2_0%]">{invoice.customerName}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Société</div>
                  <div className="flex-[2_2_0%]">{invoice.customerSociety}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Siren</div>
                  <div className="flex-[2_2_0%]">{invoice.customerSiren}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Numéro TVA</div>
                  <div className="flex-[2_2_0%]">TODO</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Adresse</div>
                  <div className="flex-[2_2_0%]">{invoice.customerAddress}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Pays</div>
                  <div className="flex-[2_2_0%]">{invoice.customerCountry}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">mail</div>
                  <div className="flex-[2_2_0%]">{invoice.customerMail}</div>
                </div>
              </div>
              <div className="w-1/2  space-y-1">
                <Typography variant={"h3"} className="mb-3">
                  Conditions
                </Typography>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Conditions règlement</div>
                  <div className="flex-[2]">{invoice.conditionReglement}</div>
                </div>
                <div className="flex border-b justify-between">
                  <div className="flex-1 ">Mode règlement</div>
                  <div className="flex-[2]">{invoice.modeReglement}</div>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <Typography variant={"h3"}>Détails</Typography>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">
                      Prix unitaire HT
                    </TableHead>
                    <TableHead className="text-right">Quantité</TableHead>
                    <TableHead>TVA</TableHead>
                    <TableHead className="text-right">Total HT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.lines.map((l, index) => (
                    <TableRow
                      key={l.id}
                      className={clsx({
                        "bg-primary-foreground": index % 2 === 0,
                      })}
                    >
                      <TableCell>{l.type}</TableCell>
                      <TableCell>description</TableCell>
                      <TableCell className="text-right">
                        {l.unitPrice.toFixed(2)}€
                      </TableCell>
                      <TableCell className="text-right">{l.quantity}</TableCell>
                      <TableCell>{l.vatRate}%</TableCell>
                      <TableCell className="text-right">
                        {l.totalHT.toFixed(2)}€
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-end mt-5">
              <div className="flex gap-5">
                <div>
                  <p>Total HT</p>
                  <p>TVA</p>
                  <p className="font-bold text-lg">Total TTC</p>
                </div>
                <div>
                  <p>{invoice.totalHT.toFixed(2)}€</p>
                  <p>{(invoice.totalTTC - invoice.totalHT).toFixed(2)}€</p>
                  <p className="font-bold text-lg">
                    {invoice.totalTTC.toFixed(2)}€
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}
