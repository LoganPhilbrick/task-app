import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "./modeToggle";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = auth();

  return (
    <div className="flex justify-between items-center bg-accent">
      <h1 className="font-bold ml-4 my-8 md:my-4 ">Task-App</h1>
      <div className="flex flex-row justify-between items-center bg-accent">
        {userId ? <UserButton /> : <Button>Sign In</Button>}
        <ModeToggle />
      </div>
    </div>
  );
}
