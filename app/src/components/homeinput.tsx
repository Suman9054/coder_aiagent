import * as React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const HomeInput: React.FC = () => {
  const [message, setMessage] = React.useState("");

  const quaryclient = useQueryClient();
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    quaryclient.setQueryData(['mesages'],()=>{
      return [{"id":"1","author":"user","mesage":message}]
    })
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center w-full px-4 min-h-screen">
      <Card className="w-full max-w-2xl bg-slate-900 border-none shadow-lg rounded-2xl">
        <form onSubmit={handleSubmit}>
          <CardContent className="p-4">
            <Input
              placeholder="Ask anything and create anything..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full border-none text-gray-100 placeholder-gray-400 "
            />
          </CardContent>

          <CardFooter className="flex justify-end p-4">
            <Button
              type="submit"
              variant="outline"
              size="icon"
              disabled={!message.trim()}
              className="border-slate-700 hover:bg-slate-800"
            >
              <SendHorizontal className="w-5 h-5" />
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default HomeInput;
