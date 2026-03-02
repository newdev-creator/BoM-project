import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TYPE_COLORS: Record<
  string,
  "default" | "secondary" | "outline" | "destructive"
> = {
  assembly: "default",
  sub_assembly: "secondary",
  part: "outline",
  raw_material: "destructive",
};

const TYPE_LABELS: Record<string, string> = {
  assembly: "🔧 Ensemble",
  sub_assembly: "⚙️ Sous-ensemble",
  part: "🔩 Pièce",
  raw_material: "🪨 Matière",
};

interface Component {
  id: number;
  reference: string;
  description: string;
  quantity: number;
  component_type: string;
  created_at: string;
  updated_at: string;
}

export default function ComponentsList() {
  // Fetch from api route : http://localhost:8000/api/components/
  const [components, setComponents] = useState<Component[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/components/")
      .then((response) => response.json())
      .then((data) => setComponents(data));
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Components List</CardTitle>
          <CardDescription>
            List if the actual quantity of each component
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="font-medium">
            <ul>
              {components.length > 0 &&
                components.map((component) => (
                  <li key={component.id} className="mb-2">
                    <Link to={`/components/${component.id}`}>
                      <Card className="hover:bg-primary/20">
                        <CardContent className="flex items-center gap-4 py-3">
                          <span className="font-semibold">
                            {component.reference}
                          </span>
                          <span className="text-muted-foreground text-sm flex-1">
                            {component.description}
                          </span>
                          <span className="text-sm">
                            Qty: {component.quantity}
                          </span>
                          <Badge
                            variant={
                              TYPE_COLORS[component.component_type] ?? "default"
                            }
                          >
                            {TYPE_LABELS[component.component_type] ?? "Unknown"}
                          </Badge>
                        </CardContent>
                      </Card>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
