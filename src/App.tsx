import "./index.css";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";

const formSchema = z.object({
  method: z.string(),
  url: z.string(),
});

type FormType = z.infer<typeof formSchema>;

function App() {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: "GET",
      url: ""
    }
  });

  const onSubmit = (values: FormType) => {
    console.log(values)
  }

  return (
    <div className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select something" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem
                className="flex-1"
              >
                <FormControl>
                  <Input
                    placeholder="Please enter the URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default App;
