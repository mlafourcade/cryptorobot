import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import {
  Avatar,
  Badge,
  Box,
  Grid,
  LinearProgress,
  Stack,
  Theme,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCryptoContext } from "../../contexts";

type Locale = {
  code?: string;
  formatDistance?: (...args: Array<any>) => any;
  formatRelative?: (...args: Array<any>) => any;
  localize?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  formatLong?: {
    date: (...args: Array<any>) => any;
    time: (...args: Array<any>) => any;
    dateTime: (...args: Array<any>) => any;
  };
  match?: {
    ordinalNumber: (...args: Array<any>) => any;
    era: (...args: Array<any>) => any;
    quarter: (...args: Array<any>) => any;
    month: (...args: Array<any>) => any;
    day: (...args: Array<any>) => any;
    dayPeriod: (...args: Array<any>) => any;
  };
  options?: {
    weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    firstWeekContainsDate?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  };
};

// function subDays(date: Date | number, amount: number): Date;
// namespace subDays {}

// function formatDistance(
//   date: Date | number,
//   baseDate: Date | number,
//   options?: {
//     includeSeconds?: boolean;
//     addSuffix?: boolean;
//     locale?: Locale;
//   }
// ): string;
// namespace formatDistance {}

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
    flex-grow: 1;
    height: 10px;
    
    &.MuiLinearProgress-root {
      background-color: ${theme.colors.alpha.black[10]};
    }
    
    .MuiLinearProgress-bar {
      border-radius: ${theme.general.borderRadiusXl};
    }
`
);

// "Offline since " +
// formatDistance(subDays(new Date(), 14), new Date(), {
//   addSuffix: true,
// })

//<Text color="black">4</Text> out of <Text color="black">6</Text>

export const Currently = () => {
  const theme = useTheme();
  const { crypto, symbol, colorPrice, handleCrypto } = useCryptoContext();

  const MyTypography = styled(Typography)({
    color:
      colorPrice === "high" ? theme.colors.high.main : theme.colors.low.main,
    textAlign: "center",
    fontSize: "0.875rem",
    fontWeight: "700",
  });

  return (
    <Stack
      direction={"row"}
      justifyContent="rigth"
      alignItems="center"
      sx={{ gap: "0.4%", p: "0.4%", boxShadow: 4, background: "#424242" }}
    >
      <Card>
        <Box
          width="12vw"
          height="4.5vh"
          //style={{ background: `${theme.colors.success.main}` }}
          style={{ background: "darkCard" }}
          sx={{
            boxShadow: 30,
          }}
        >
          <Typography
            sx={{
              mb: 1.5,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              color:
                colorPrice === "high"
                  ? theme.colors.high.main
                  : theme.colors.low.main,
            }}
            color="success"
          >
            {symbol + " = " + crypto}
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box width="12vw" height="4.5vh">
          <MyTypography>{symbol + " = " + colorPrice}</MyTypography>
        </Box>
      </Card>
      <Card>
        <Box width="12vw" height="4.5vh" color="theme.colors.success.main">
          <Typography
            sx={{
              mb: 1.5,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              color: theme.colors.success.main,
              background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
              border: 0,
              borderRadius: 3,
              boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
              padding: "0 30px",
            }}
          >
            Nova coisa
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box width="12vw" height="4.5vh">
          Nova coisa
        </Box>
      </Card>
      <Card>
        <Box width="12vw" height="4.5vh">
          <Typography
            sx={{
              mb: 1.5,
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "700",
              color: "high",
            }}
          >
            Nova coisa
          </Typography>
        </Box>
      </Card>
      <Card>
        <Box width="12vw" height="4.5vh">
          Nova coisa
        </Box>
      </Card>
    </Stack>
  );
};

/*

          sx={{
            m: theme.spacing(0, 0, 0, 5),
            //height: (theme) => theme.spacing(3.9),
            //width: (theme) => theme.spacing(20.9),
          }}

          sx={{
            height: (theme) => theme.spacing(3.9),
            width: (theme) => theme.spacing(20.9),
          }}

        <Stack direction={"row"}>
          <Box width="10%" height="100%">
            <Card>qualquer coisa</Card>
          </Box>
          <Box width="10%" height="100%">
            <Card>qualquer coisa</Card>
          </Box>
        </Stack>
*/

/*<Stack direction={"column"}>

</Stack>
  </Box>
  <Box width="100%" height="100%">
<Stack direction={"column"}>

</Stack>*/

// export const Currently = (image: any, title: string) => {
//   const theme = useTheme();
//   return (
//     <Grid item xs={12} md={4}>
//       <Card sx={{ p: 2.5 }}>
//         <Box display="flex" alignItems="center" pb={3}>
//           <Badge
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             overlap="circular"
//             badgeContent={
//               <Tooltip arrow placement="top" title={"Offline since "}>
//                 <DotLegend
//                   style={{ background: `${theme.colors.error.main}` }}
//                 />
//               </Tooltip>
//             }
//           >
//             <AvatarWrapper
//               alt="Remy Sharp"
//               src="/static/images/avatars/4.jpg"
//             />
//           </Badge>
//           <Box sx={{ ml: 1.5 }}>
//             <Typography variant="h4" noWrap gutterBottom>
//               Hanna Siphron
//             </Typography>
//             <Typography variant="subtitle2" noWrap>
//               Web Dev Support Team
//             </Typography>
//           </Box>
//         </Box>

//         <Typography variant="subtitle2" gutterBottom>
//           tasks completed
//         </Typography>
//         <LinearProgressWrapper
//           value={65}
//           color="primary"
//           variant="determinate"
//         />
//       </Card>
//     </Grid>

//     // <Card>
//     //   <Box>
//     //     <Box>
//     //       Currently
//     //     </Box>
//     //   </Box>
//     // </Card>
//   );
// };
