import RedTechIcon from "../assets/images/logo.svg";
import "../App.scss";
import { colors } from "../shared/colors";
import { layout } from "../shared/layout";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import Divider from "@mui/material/Divider";

interface IProps {
  label: string;
}
export default function Header(props: IProps) {
  const { label } = props;
  return (
    <div
      className="header"
      style={{
        display: "flex",
        padding: layout.standardComponentPadding,
        alignItems: "center",
      }}
    >
      <img
        src={RedTechIcon}
        className="headerLogo"
        alt="logo"
        style={{ marginRight: "16px" }}
      />
      <Divider sx={{ height: 40, mr: 2 }} orientation="vertical" />
      <span className="headerFont" style={{ color: colors.brandDarkGray }}>
        {label}
      </span>
      <div
        className="header__actions"
        style={{ alignItems: "center", marginLeft: "auto" }}
      >
        <SettingsIcon style={{ color: "aaa", marginLeft: "16px" }} />
        <AccountCircleIcon style={{ color: "aaa", marginLeft: "16px" }} />
      </div>
    </div>
  );
}
