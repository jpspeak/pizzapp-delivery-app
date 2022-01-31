import { Button, HStack, Icon, Input } from "@chakra-ui/react";
import { useState } from "react";
import { HiOutlineCheckCircle } from "react-icons/hi";
import { bagApplyCoupon, selectApplyCouponState, selectCoupon } from "../../features/bag/bagSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";

const CouponInput = () => {
  const [code, setCode] = useState("");
  const applyCouponState = useAppSelector(selectApplyCouponState);
  const coupon = useAppSelector(selectCoupon);
  const dispatch = useAppDispatch();

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault();
    code && dispatch(bagApplyCoupon({ code }));
  };

  const handleOnChangeCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmitCode}>
        <HStack>
          <Input onChange={handleOnChangeCode} isInvalid={applyCouponState === "ERROR"} disabled={!!coupon?.code} maxLength={10} placeholder='Enter coupon' w='28' fontSize='xs' size='sm'></Input>
          {!!coupon?.code ? (
            <Icon as={HiOutlineCheckCircle} color='green' h='6' w='6' />
          ) : (
            <Button type='submit' size='sm' isLoading={applyCouponState === "LOADING"} disabled={code === "" || !!coupon?.code}>
              Apply
            </Button>
          )}
        </HStack>
      </form>
    </>
  );
};

export default CouponInput;
