import { ReactNode } from "react";
import { Button } from "./button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type SubmitButtonProps = {
  children: ReactNode;
  pending: boolean;
  className: string
};

const loading = (
  <div className="animate-spin text-2xl">
    <AiOutlineLoading3Quarters />
  </div>
);

export default function SubmitButton({children, pending, className}: SubmitButtonProps) {
    return(
        <Button className={className} disabled={pending}>
            {
                pending ? loading: children 
            }
        </Button>
    )
}