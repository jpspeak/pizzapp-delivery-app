import { Text } from "@chakra-ui/react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const NavLink = ({ to, text }: { to: string; text: string }) => {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname });
  return (
    <>
      <Link to={to}>
        <Text py='2px' px='2' whiteSpace='nowrap' borderBottom='4px' borderColor={match ? "yellow.900" : "transparent"}>
          {text}
        </Text>
      </Link>
    </>
  );
};

export default NavLink;
