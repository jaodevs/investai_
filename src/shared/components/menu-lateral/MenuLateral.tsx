import {
  Avatar,
  Divider,
  Drawer,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import log from "/public/logo.png";
import { useAppThemeContext, useDrawerContext } from "../../contexts";
import { useMatch, useNavigate, useResolvedPath } from "react-router";
import { useAuthContext } from '../../contexts';

interface IMenuLateral {
  children: React.ReactNode;
}

interface IListIntemLinkprops {
  to: string;
  icon: string;
  label: string;
  onClick?: () => void;
}

const ListIntemLink: React.FC<IListIntemLinkprops> = ({
  to,
  icon,
  label,
  onClick,
}) => {
  const navigate = useNavigate();

  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };
  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { toggleTheme } = useAppThemeContext();
  const { isDrawerOpen, toggleDrawerOpen, DrawerOptions } = useDrawerContext();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Drawer
        open={isDrawerOpen}
        variant={smDown ? "temporary" : "permanent"}
        onClose={toggleDrawerOpen}
      >
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={"108px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
                style={{ width: "6rem", height: "12rem" ,marginLeft: 10 }}
              src={log}
            ></Avatar>
          </Box>
          <Divider />
          <Box flex={1}>
            <List component="nav">
              {DrawerOptions.map((item) => (
                <ListIntemLink
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  label={item.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>
          <Box>
          <List component="nav">
    <ListItemButton onClick={toggleTheme}>
      <ListItemIcon>
        <Icon>brightness_4</Icon>
      </ListItemIcon>
      <ListItemText primary="Tema" />
    </ListItemButton>
    <ListItemButton onClick={handleLogout}>
      <ListItemIcon>
        <Icon>logout</Icon>
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItemButton>
  </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};