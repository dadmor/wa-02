// ------ src/pages/marketing-strategies/show.tsx ------
import { useShow, useNavigation, useDelete } from "@refinedev/core";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Edit,
  Trash2,
  DollarSign,
  Target,
  Globe,
  Calendar,
  FileText,
  Building2,
} from "lucide-react";

export const MarketingStrategyShow = () => {
  const { queryResult } = useShow();
  const { edit, list, goBack } = useNavigation();
  const { mutate: deleteStrategy } = useDelete();

  const { data, isLoading, isError } = queryResult;
  const strategy = data?.data;

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError)
    return <div className="p-6 text-red-500">Error loading strategy</div>;
  if (!strategy)
    return <div className="p-6 text-red-500">Strategy not found</div>;

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this strategy?")) {
      deleteStrategy(
        {
          resource: "marketing_strategies",
          id: strategy.id!,
        },
        {
          onSuccess: () => {
            list("marketing_strategies");
          },
        }
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => goBack()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {strategy.title}
            </h1>
            <p className="text-muted-foreground">
              Strategy ID: #{String(strategy.id).slice(0, 8)}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              if (strategy?.id != null) {
                edit("marketing_strategies", strategy.id);
              }
            }}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Target Audience
              </h4>
              <p className="text-sm">{strategy.target_audience}</p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                Budget Recommendation
              </h4>
              <Badge variant="outline" className="text-lg font-semibold">
                ${strategy.budget_recommendation?.toLocaleString()}
              </Badge>
            </div>

            {strategy.industry_override && (
              <>
                <Separator />
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    Industry Override
                  </h4>
                  <Badge variant="secondary">
                    {strategy.industry_override}
                  </Badge>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Metadata */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Metadata
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Created
              </h4>
              <p className="text-sm">
                {new Date(strategy.created_at).toLocaleString()}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1">
                Last Updated
              </h4>
              <p className="text-sm">
                {new Date(strategy.updated_at).toLocaleString()}
              </p>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-1 flex items-center gap-1">
                <Globe className="w-4 h-4" />
                Website Analysis ID
              </h4>
              <p className="text-sm font-mono">
                {strategy.website_analysis_id}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Strategy Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-sm leading-relaxed whitespace-pre-wrap">
              {strategy.notes}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common actions for this marketing strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Create Google Ads Campaign
            </Button>
            <Button variant="outline" size="sm">
              Export Strategy
            </Button>
            <Button variant="outline" size="sm">
              Duplicate Strategy
            </Button>
            <Button variant="outline" size="sm">
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
