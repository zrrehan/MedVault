import { ReactNode } from "react";
import { Button } from "./button";

type SubmitButtonProps = {
  children: ReactNode;
  pending: boolean;
  className: string
};

export default function SubmitButton({children, pending, className}: SubmitButtonProps) {
    return(
        <Button className={className} disabled={pending}>
            {
                pending ? "Loading...": children 
            }
        </Button>
    )
}