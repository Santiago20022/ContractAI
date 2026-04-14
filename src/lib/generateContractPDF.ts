import { pdf } from "@react-pdf/renderer";
import React from "react";
import { ContractPDF, type ContractPDFProps } from "./ContractPDF";

export async function generateContractPDF(options: ContractPDFProps): Promise<Blob> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const element = React.createElement(ContractPDF, options) as any;
  return pdf(element).toBlob();
}
