import type { ModalType } from "@/types/components/ui";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../ui/animated-modal";
import { cn } from "@/lib/utils";

const AnimatedModalDemo: React.FC<ModalType> = ({
  children,
  name,
  className,
  ref,
}) => {
  return (
    <Modal>
      <ModalTrigger
        className={cn(
          `border cursor-pointer dark:border-muted-foreground border-black dark:bg-white dark:text-white text-black flex-1 flex justify-center group/modal-btn`,
          className
        )}
      >
        {name}
      </ModalTrigger>
      <ModalBody ref={ref}>
        <ModalContent>{children}</ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default AnimatedModalDemo;
