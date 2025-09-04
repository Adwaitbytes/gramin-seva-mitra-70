import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, MapPin, Bell } from "lucide-react";

export const HealthStats = () => {
  const stats = [
    {
      title: "Rural Families Served",
      value: "2.3M+",
      description: "Across 15 states in India",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Health Education Sessions",
      value: "45K+", 
      description: "Prevention tips shared daily",
      icon: Shield,
      color: "text-accent"
    },
    {
      title: "Health Centers Connected",
      value: "8,500+",
      description: "PHCs, CHCs & hospitals",
      icon: MapPin,
      color: "text-warning"
    },
    {
      title: "Emergency Alerts Sent",
      value: "12K+",
      description: "Outbreak & health warnings",
      icon: Bell,
      color: "text-emergency"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-soft hover:shadow-medium transition-shadow duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};