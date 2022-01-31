import { Avatar, Divider, HStack, Icon, Image, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import { HiOutlineLogout } from "react-icons/hi";
import { selectAuthUser, signOutUser } from "../../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks";

const ProfileMenuButton = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  return (
    <>
      <Menu autoSelect={false}>
        <MenuButton>
          <Avatar src={user?.photoURL || undefined} size='xs' />
        </MenuButton>
        <MenuList py='0'>
          <MenuItem _hover={{ bgColor: "transparent" }} p='2'>
            <Avatar src={user?.photoURL || undefined} size='xs' mr='2' />
            <span>{user?.displayName}</span>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => dispatch(signOutUser())}>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default ProfileMenuButton;
