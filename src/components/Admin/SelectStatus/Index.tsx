import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Button,
  Select,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { updateStatus } from "../../../features/admin/order/ordersSlice";
import { OrderStatusType } from "../../../features/order-history/ordersSlice";
import { useAppDispatch } from "../../../hooks";
import badgeColor from "../../../utils/badgeColor";

const SelectStatus = ({ orderId, currentStatus }: { orderId: string; currentStatus: OrderStatusType }) => {
  const [status, setStatus] = useState<OrderStatusType>(currentStatus);
  const [newStatus, setNewStatus] = useState<OrderStatusType>(status);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = useRef(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onOpen();
    setNewStatus(e.target.value as OrderStatusType);
  };

  const handleClickYes = async () => {
    await dispatch(updateStatus({ orderId, status: newStatus }));
    onClose();
  };

  const handleClickNo = () => {
    setNewStatus(status);
    onClose();
  };

  useEffect(() => {
    setStatus(currentStatus);
  }, [currentStatus]);
  return (
    <>
      <Select onChange={handleChange} w='max-content' size='sm' value={status}>
        <option value='pending'>Pending</option>
        <option value='prepairing'>Prepairing</option>
        <option value='on the way'>On The Way</option>
        <option value='delivered'>Delivered</option>
      </Select>
      <AlertDialog isCentered leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={handleClickNo}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader>Confirm Update</AlertDialogHeader>
          <AlertDialogBody>
            From{" "}
            <Badge colorScheme={badgeColor(status)} variant='solid'>
              {status}
            </Badge>{" "}
            {"->"}{" "}
            <Badge colorScheme={badgeColor(newStatus)} variant='solid'>
              {newStatus}
            </Badge>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleClickNo}>
              No
            </Button>
            <Button onClick={handleClickYes} colorScheme='orange' ml={3}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SelectStatus;
