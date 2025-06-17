import { useTable, useNavigation, useDelete } from "@refinedev/core";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Plus, DollarSign, Target } from "lucide-react";

export const MarketingStrategyList = () => {
  const { tableQueryResult, current, setCurrent, pageSize, setPageSize, filters, setFilters } = useTable();
  const { create, edit, show } = useNavigation();
  const { mutate: deleteStrategy } = useDelete();

  const { data, isLoading, isError } = tableQueryResult;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading strategies</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Strategies</h1>
          <p className="text-muted-foreground">Manage your marketing strategies</p>
        </div>
        <Button onClick={() => create("marketing_strategies")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Strategy
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search strategies..." 
          className="max-w-sm"
          onChange={(e) => {
            setFilters([
              {
                field: "title",
                operator: "contains",
                value: e.target.value,
              },
            ]);
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((strategy: any) => (
          <Card key={strategy.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {strategy.industry_override || "General"}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  #{strategy.id.slice(0, 8)}
                </span>
              </div>
              <CardTitle className="text-lg font-semibold leading-tight">
                {strategy.title}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <Target className="w-4 h-4" />
                {strategy.target_audience}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Budget Recommendation
                  </span>
                  <Badge variant="outline">
                    ${strategy.budget_recommendation?.toLocaleString()}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {strategy.notes?.substring(0, 80)}...
                </div>
                <div className="text-xs text-muted-foreground">
                  Created: {new Date(strategy.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => show("marketing_strategies", strategy.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => edit("marketing_strategies", strategy.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this strategy?")) {
                    deleteStrategy({
                      resource: "marketing_strategies",
                      id: strategy.id,
                    });
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, data?.total || 0)} of {data?.total || 0} strategies
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrent(current - 1)}
            disabled={current === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrent(current + 1)}
            disabled={current * pageSize >= (data?.total || 0)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};