import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

import { LayoutBaseDePagina } from "../../shared/layouts";
import { Lottie } from "../../shared/components";
import animationData from "../../assets/LottieJson/Animation1.json";
import animation from "../../assets/LottieJson/Animation2.json";

export const Dashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <LayoutBaseDePagina>
      <Box display="flex" alignItems="center" height="38%">
        <Lottie animationData={animationData} />
        <Typography variant="h4">
          Bem-vindo ao seu Sistema de Gerenciamento de Investimentos
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? "column" : "row"}
        sx={{ m: 3 }}
      >
        <Box sx={{ mr: isSmallScreen ? 0 : 3, mb: isSmallScreen ? 3 : 0 }}>
          <Typography variant="body1">
            A gestão de investimentos é uma área dedicada ao estudo e
            administração de recursos financeiros, com o objetivo de maximizar o
            retorno e minimizar os riscos para os investidores. Os gestores de
            investimentos são responsáveis por analisar, planejar e implementar
            estratégias financeiras que abrangem uma ampla variedade de ativos,
            desde ações e títulos até imóveis e fundos mútuos. A gestão de
            investimentos é um campo em constante evolução, com novas técnicas e
            tecnologias emergindo que permitem análises mais precisas e decisões
            mais informadas. Além disso, a gestão de investimentos é também uma
            arte, que exige habilidades analíticas e a capacidade de se
            comunicar de forma clara e eficaz com os clientes. Os gestores de
            investimentos são altamente treinados e dedicados a ajudar seus
            clientes a alcançar seus objetivos financeiros e a proteger seu
            patrimônio. Com a orientação correta, a gestão de investimentos pode
            ser um recurso poderoso para melhorar a segurança financeira e
            alcançar um crescimento sustentável a longo prazo.
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          height={isSmallScreen ? "auto" : "35%"}
          border="ActiveBorder"
        >
          <Lottie animationData={animation} />
        </Box>
      </Box>
    </LayoutBaseDePagina>
  );
};
