import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axiosDynamic from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

const FormRoles = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const formSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number(),
    stock: z.number(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (searchParams.get("id")) {
        await axiosDynamic
          .put(`/api/admin/roles/${searchParams.get("id")}`, values)
          .then(() => {
            toast.success("Product updated successfully");
            navigate(0);
          });
        return;
      } else {
        await axiosDynamic.post(`/api/admin/roles`, values).then(() => {
          toast.success("Product added successfully");
          navigate(0);
        });
      }
    } catch (error) {
      toast.error("Product added failed");
    }
  };

  const handleSave = () => {
    handleSubmit(onSubmit)();
  };

  const fetchRoles = (id: string) => {
    axiosDynamic
      .get(`/api/admin/roles/${id}`)
      .then((response) => {
        const res = response.data.data;
        form.setValue("name", res.name);
        form.setValue("description", res.description);
        form.setValue("price", Number(res.price));
        form.setValue("stock", Number(res.stock));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (searchParams.get("id")) {
      fetchRoles(searchParams.get("id")!);
    }
  }, [searchParams.get("id")]);

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-2">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Roles</DialogTitle>
          </DialogHeader>
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} className="text-black">
              {searchParams.get("id") ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </FormProvider>
  );
};

export default FormRoles;
