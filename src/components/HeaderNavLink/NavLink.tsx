import { Text } from "@chakra-ui/react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

const HeaderNavLink = ({ to, text }: { to: string; text: string }) => {
  const resolvedPath = useResolvedPath(to);
  const match = useMatch({ path: resolvedPath.pathname });
  return (
    <>
      <Link to={to}>
        <Text py='0' lineHeight={{ base: "10", md: "short" }} px='0' whiteSpace='nowrap' borderBottom='4px' borderColor={match ? "" : "transparent"}>
          {text}
        </Text>
      </Link>
    </>
  );
};

export default HeaderNavLink;
