import { CarData } from "@/services/cars/list/types";
import { CarReportData } from "@/services/cars/report/types";
import { PdfColors } from "@/types/cars/pdf";
import { formatDate } from "@/utils/format-date";

const getHeader = (
  colors: PdfColors,
  carReportsData?: CarReportData,
  carData?: CarData,
) => {
  return [
    {
      canvas: [
        {
          type: "rect",
          x: 0,
          y: 0,
          w: 592,
          h: 45,
          color: colors.header,
        },
      ],
      margin: [10, 10, 10, 10],
    },
    {
      text: "Mera Cars",
      absolutePosition: { x: 25, y: 24 },
      color: colors.white,
    },
    {
      text: `Car No. ${carData?.uniqueId}`,
      absolutePosition: { x: 515, y: 21 },
      fontSize: 10,
      color: colors.white,
      bold: true,
    },
    {
      text: `Evaluated On ${formatDate(carData?.createdAt as any)}`,
      absolutePosition: { x: 504, y: 35 },
      fontSize: 8,
      color: colors.white,
      align: "right",
    },
  ];
};

export default getHeader;
