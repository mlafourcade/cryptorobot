import { Box, Stack } from "@mui/material";
import { FC, ReactNode, useEffect, useState } from "react";
import { getCandles } from "../../services/DataService";
import { AChart } from "../apexcharts";
import { Canvas, CanvasJsMenuArea, CanvasJsWindowArea } from "../canvasjschart";
import { FooterArea } from "../Template/footer";
import { MenuArea } from "../Template/menu";
import { NavBarArea } from "../Template/navbar";
import { SideBarArea } from "../Template/sidebar";
import { SubSideBarArea } from "../Template/subsidebar";
import { WindowArea } from "../Template/window";

interface NavProps {
  children?: ReactNode;
}

export const BodyArea: FC<NavProps> = ({ children }) => {
  type dataChart = {
    x: Date;
    y: [number, number, number, number];
  };

  const dataProps: dataChart[] = [];

  const [data, setdata] = useState(dataProps);

  useEffect(() => {
    console.log("useEfect");
    getCandles("XLMUSDT", "5m", 250)
      .then((value: any) => setdata(value))
      .catch((err) => alert(err.response ? err.response.data : err.message));
  }, []);

  console.log("Dados = ", data);

  return (
    <Box width="100vw" height="100vh">
      <Stack direction={"column"}>
        <NavBarArea>Nav Bar</NavBarArea>
        <Stack direction={"row"}>
          <SideBarArea>Side Bar</SideBarArea>
          <Stack direction={"column"}>
            <MenuArea>Menu</MenuArea>
            <Stack direction={"row"}>
              <Stack direction={"column"}>
                <WindowArea>
                  <CanvasJsMenuArea>Chart Menu</CanvasJsMenuArea>
                  <CanvasJsWindowArea>
                    <AChart data={data} />
                  </CanvasJsWindowArea>
                </WindowArea>
              </Stack>
              <SubSideBarArea>Sub Side</SubSideBarArea>
            </Stack>
            <FooterArea>Footer</FooterArea>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
