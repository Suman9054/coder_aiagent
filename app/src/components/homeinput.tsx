import * as React from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";
import { Message as ms } from "@/types/types";
import { authClient } from "@/lib/auth-client";
import { Post } from "@/lib/fetch";
import { useNavigate } from "@tanstack/react-router";


const HomeInput: React.FC = () => {
  const [message, setMessage] = React.useState("");

  const navigation = useNavigate();
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const session = await authClient.getSession();
    if (!session.data?.session  ) {
      alert("Please log in to send a message.");
      return;
    }
    const newMessage: ms = {
      id: crypto.randomUUID(),
      author: session.data?.user.name || "User",
      mesage: message.trim(),
      key:"user-" + session.data?.user.id,
      urlstring: crypto.randomUUID()
    };
  
   const response = Post(`/api/mesagestore/${newMessage.urlstring}/${session.data?.user.id}`, newMessage);
   
   if (!response) {
     alert("Failed to send message.");
     return;
   }

   navigation({ to: `/workspace/${newMessage.urlstring}` });
   
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
