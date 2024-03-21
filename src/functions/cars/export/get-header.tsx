import { CarData } from "@/services/cars/list/types";
import { PdfColors } from "@/types/cars/pdf";
import { formatDate } from "@/utils/format-date";

const getHeader = (colors: PdfColors, carData?: CarData, logo?: string) => {
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
      image: logo,
      fit: [100, 100],
      absolutePosition: { x: 25, y: 19 },
    },
    {
      text: `Car No. ${carData?.uniqueId}`,
      absolutePosition: { x: 503, y: 21 },
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
