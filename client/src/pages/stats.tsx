import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Analysis } from "@shared/schema";
import { Shield, AlertTriangle, XCircle, HelpCircle, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const VERDICT_COLORS = {
  safe: "hsl(142, 71%, 45%)",
  caution: "hsl(38, 92%, 50%)",
  danger: "hsl(0, 72%, 51%)",
  neutral: "hsl(215, 14%, 34%)",
};

export default function Stats() {
  const { data: analyses = [] } = useQuery<Analysis[]>({
    queryKey: ["/api/analyses"],
  });

  const stats = {
    total: analyses.length,
    safe: analyses.filter((a) => a.verdict === "safe").length,
    caution: analyses.filter((a) => a.verdict === "caution").length,
    danger: analyses.filter((a) => a.verdict === "danger").length,
    neutral: analyses.filter((a) => a.verdict === "neutral").length,
    avgConfidence:
      analyses.length > 0
        ? Math.round(
            analyses.reduce((sum, a) => sum + a.confidenceScore, 0) / analyses.length
          )
        : 0,
  };

  const pieData = [
    { name: "Safe", value: stats.safe, color: VERDICT_COLORS.safe },
    { name: "Caution", value: stats.caution, color: VERDICT_COLORS.caution },
    { name: "False", value: stats.danger, color: VERDICT_COLORS.danger },
    { name: "Unverified", value: stats.neutral, color: VERDICT_COLORS.neutral },
  ].filter((d) => d.value > 0);

  const barData = [
    { name: "Safe", count: stats.safe },
    { name: "Caution", count: stats.caution },
    { name: "False", count: stats.danger },
    { name: "Unverified", count: stats.neutral },
  ];

  const statCards = [
    {
      title: "Total Analyses",
      value: stats.total,
      icon: TrendingUp,
      color: "text-primary",
    },
    {
      title: "Safe",
      value: stats.safe,
      icon: Shield,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Caution",
      value: stats.caution,
      icon: AlertTriangle,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "False",
      value: stats.danger,
      icon: XCircle,
      color: "text-red-600 dark:text-red-400",
    },
    {
      title: "Unverified",
      value: stats.neutral,
      icon: HelpCircle,
      color: "text-gray-600 dark:text-gray-400",
    },
  ];

  return (
    <div className="container max-w-7xl py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Statistics</h1>
        <p className="text-muted-foreground">
          Overview of your fact-checking activity and patterns
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {analyses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Verdict Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Analysis Count by Verdict</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <p className="text-muted-foreground">
              No data available yet. Start analyzing claims to see statistics.
            </p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Average Confidence Score</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-bold text-primary">{stats.avgConfidence}%</div>
            <p className="text-sm text-muted-foreground">
              Average confidence across all {stats.total} analyses
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
