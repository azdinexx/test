"use client";
import { remove_produit } from "@/actions/demande";
import { LoadingLoop } from "@/components/icons/Loading";
import { Delete } from "@/components/icons/remove";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";

const DeleteProduct = ({ id }: { id: string }) => {
  const [state, action] = useFormState(remove_produit, null);
    const {pending} = useFormStatus()
    const router = useRouter()

    useEffect(() => {
        if(state?.success){
            toast.success(state.success)
            router.refresh()
            
        }
    }, [state, router])
  return (
    <form className="" action={action}>
        <input type="hidden" name="produit_id" value={id} />
      <button type="submit">
        {
            pending ? <LoadingLoop className="w-5 h-5"/> : <Delete className="w-5 h-5"/>
        }
      </button>
    </form>
  );
};

export default DeleteProduct;
