import { useState, useCallback } from 'react';

export interface CallbackToggle {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onToggle: () => void;
}

const useDisclosure = (initialValue = false): CallbackToggle => {
  const [isOpen, setOpen] = useState<boolean>(initialValue);

  const onOpen = useCallback(() => {
    return setOpen(true);
  }, []);

  const onClose = useCallback(() => {
    return setOpen(false);
  }, []);

  const onToggle = useCallback(() => {
    return setOpen((value) => !value);
  }, []);

  return { isOpen, onClose, onOpen, onToggle };
};

export { useDisclosure };
export default useDisclosure;
