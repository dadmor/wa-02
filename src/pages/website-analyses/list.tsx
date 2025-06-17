import { useTable, useNavigation, useDelete } from "@refinedev/core";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Eye, Edit, Trash2, Plus, ExternalLink } from "lucide-react";

export const WebsiteAnalysisList = () => {
  const { tableQueryResult, current, setCurrent, pageSize, setPageSize, filters, setFilters } = useTable();
  const { create, edit, show } = useNavigation();
  const { mutate: deleteAnalysis } = useDelete();

  const { data, isLoading, isError } = tableQueryResult;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading analyses</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Website Analyses</h1>
          <p className="text-muted-foreground">Manage your website analyses</p>
        </div>
        <Button onClick={() => create("website_analyses")}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Analysis
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Input 
          placeholder="Search analyses..." 
          className="max-w-sm"
          onChange={(e) => {
            setFilters([
              {
                field: "url",
                operator: "contains",
                value: e.target.value,
              },
            ]);
          }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((analysis: any) => (
          <Card key={analysis.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary" className="mb-2">
                  {analysis.industry}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  #{analysis.id.slice(0, 8)}
                </span>
              </div>
              <CardTitle className="text-lg font-semibold leading-tight flex items-center gap-2">
                <span className="truncate">{analysis.url}</span>
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-2">
                {analysis.description?.substring(0, 100)}...
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {analysis.keywords?.slice(0, 3).map((keyword: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                  {analysis.keywords?.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{analysis.keywords.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span>{new Date(analysis.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => show("website_analyses", analysis.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => edit("website_analyses", analysis.id)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this analysis?")) {
                    deleteAnalysis({
                      resource: "website_analyses",
                      id: analysis.id,
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
          Showing {((current - 1) * pageSize) + 1} to {Math.min(current * pageSize, data?.total || 0)} of {data?.total || 0} analyses
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