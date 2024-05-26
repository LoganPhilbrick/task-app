import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function MappedCards({ tasks }) {
  return tasks.map((task, index) => (
    <div key={index} className="m-4">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle>{task.title}</CardTitle>
          <CardDescription>{task.text}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ));
}
