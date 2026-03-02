import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";

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

interface ChildComponent {
  id: number;
  child: number; // This seems to be the ID of the child component itself
  child_reference: string;
  child_description: string;
  child_component_type: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

interface Component {
  id: number;
  reference: string;
  description: string;
  quantity: number;
  component_type: string;
  child?: ChildComponent[]; // Make it optional in case some components don't have children
  created_at: string;
  updated_at: string;
}

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const [component, setComponent] = useState<Component | null>(null);
  useEffect(() => {
    fetch(`http://localhost:8000/api/components/${id}/`)
      .then((response) => response.json())
      .then((data) => setComponent(data));
  }, [id]);

  if (!component) {
    return <Loading />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{component.reference}</CardTitle>
          <CardDescription>{component.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm">Quantity: {component.quantity}</span>
            <Badge variant={TYPE_COLORS[component.component_type] ?? "default"}>
              {TYPE_LABELS[component.component_type] ?? "Unknown"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Created At</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(component.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Updated At</h3>
              <p className="text-sm text-muted-foreground">
                {new Date(component.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {component.child && component.child.length > 0 && (
        <div className="space-y-2 w-full max-w-xl ml-auto mr-0">
          <h3 className="text-lg font-semibold">Child Components</h3>
          <div className="grid gap-2">
            {component.child.map((child) => (
              <Card key={child.id} className="p-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{child.child_reference}</span>
                  <Badge
                    variant={
                      TYPE_COLORS[child.child_component_type] ?? "default"
                    }
                  >
                    {TYPE_LABELS[child.child_component_type] ?? "Unknown"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {child.child_description}
                </p>
                <p className="text-sm">Quantity: {child.quantity}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
