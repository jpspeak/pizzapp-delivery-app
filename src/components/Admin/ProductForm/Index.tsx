import { Button, Flex, FormControl, FormLabel, HStack, Input, InputGroup, InputLeftElement, Select, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";

export interface ProductFormValuesType {
  name: string;
  description?: string;
  priceRegular: string;
  priceLarge: string;
  priceExtraLarge: string;
  status: string;
  image?: File;
}

const ProductForm = ({ initialFormValues, onSubmit, editMode = false }: { initialFormValues: ProductFormValuesType; onSubmit: (formValues: ProductFormValuesType) => void; editMode?: boolean }) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === "image") {
      setFormValues(prevState => ({ ...prevState, [e.target.name]: (e.target as HTMLInputElement).files?.[0] }));
    } else {
      setFormValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formValues);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <VStack alignItems='normal'>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name='name' minLength={2} onChange={handleInputChange} value={formValues.name} required />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea name='description' onChange={handleInputChange} value={formValues.description}></Textarea>
          </FormControl>

          <FormControl>
            <FormLabel>Prices</FormLabel>
            <HStack>
              <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$' />
                <Input type='number' name='priceRegular' placeholder='Regular' onChange={handleInputChange} value={formValues.priceRegular} required />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$' />
                <Input type='number' name='priceLarge' placeholder='Large' onChange={handleInputChange} value={formValues.priceLarge} required />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em' children='$' />
                <Input type='number' name='priceExtraLarge' placeholder='Extra Large' onChange={handleInputChange} value={formValues.priceExtraLarge} required />
              </InputGroup>
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select name='status' onChange={handleInputChange} value={formValues.status}>
              <option value='available'>Available</option>
              <option value='not available'>Not available</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Image</FormLabel>
            <input type='file' name='image' accept='image/png, image/jpeg' onChange={handleInputChange} required={editMode ? false : true} />
          </FormControl>
        </VStack>

        <Flex justifyContent='end'>
          <Button type='submit' mt='8' colorScheme='orange'>
            {editMode ? "Update" : "Create"}
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default ProductForm;
