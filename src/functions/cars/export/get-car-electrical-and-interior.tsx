import { CarReportData } from "@/services/cars/report/types";
import { PdfColors } from "@/types/cars/pdf";
import { formatArrayString } from "@/utils/format-array-string";
import { formatString } from "@/utils/format-string";

export function getCarElectricalInterior(
  carReportsData?: CarReportData,
  colors?: PdfColors,
) {
  const allCarInfo = carReportsData?.allCarInfo;
  return [
    {
      text: "Electricals + Interior",
      margin: [0, 145, 0, 5],
      decoration: "underline",
      decorationStyle: "dashed",
      decorationColor: colors?.header,
    },
    {
      style: "carDetailTable",
      table: {
        widths: [166, 166, 170],
        dontBreakRows: true,
        body: [
          [
            { rowSpan: 1, text: "Sunroof", alignment: "left" },
            "",
            formatArrayString(allCarInfo?.sunroof),
          ],

          ["Rear Defogger", "", formatString(allCarInfo?.rearDefogger || "")],
          [
            "Rear Parking Sensor",
            "",
            formatString(allCarInfo?.rearParkingSensor || ""),
          ],
          [
            { rowSpan: 1, text: "ABS", alignment: "left" },
            "",
            formatArrayString(allCarInfo?.absEbd?.condition),
          ],
          ["Airbag", "", formatArrayString(allCarInfo?.airbag?.condition)],
          [
            { rowSpan: 1, text: "Stereo", alignment: "left" },
            "",
            formatArrayString(allCarInfo?.stereoImage?.condition),
          ],
          [
            "Steering Mounted Audio Control",
            "",
            formatString(allCarInfo?.steeringMountedAudioControl),
          ],
          [
            { text: "Power Window & Window Lock" },
            "",
            formatArrayString(allCarInfo?.powerWindowCentalLock?.condition),
          ],
          [
            { rowSpan: 1, text: "Car Electrical", alignment: "left" },
            "",
            formatArrayString(allCarInfo?.carElectrical?.condition),
          ],
        ],
      },
      layout: {
        defaultBorder: true,
        fillColor: function (i: number) {
          return i % 2 === 0 ? "#CCCCCC" : null;
        },
      },
    },
  ];
}

export default getCarElectricalInterior;
