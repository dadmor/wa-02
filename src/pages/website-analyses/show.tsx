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
  ExternalLink,
  Calendar,
  Tag,
  Globe,
  FileText,
} from "lucide-react";

export const WebsiteAnalysisShow = () => {
  const { queryResult } = useShow();
  const { list, edit } = useNavigation();
  const { mutate: deleteAnalysis } = useDelete();

  const { data, isLoading, isError } = queryResult;
  const record = data?.data;

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (isError || !record) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error loading analysis</p>
          <Button className="mt-4" onClick={() => list("website_analyses")}>
            Back to List
          </Button>
        </div>
      </div>
    );
  }

  const handleDelete = () => {
    if (
      record?.id &&
      confirm(
        "Are you sure you want to delete this analysis? This action cannot be undone."
      )
    ) {
      deleteAnalysis(
        {
          resource: "website_analyses",
          id: record.id,
        },
        {
          onSuccess: () => {
            list("website_analyses");
          },
        }
      );
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => list("website_analyses")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Website Analysis
            </h1>
            <p className="text-muted-foreground">
              ID: #
              {record?.id != null ? String(record.id).slice(0, 8) : "unknown"}
            </p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              if (record?.id != null) {
                edit("website_analyses", record.id);
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

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Primary Information */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Website URL
                  </CardTitle>
                  <CardDescription className="text-lg font-mono">
                    <a
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                    >
                      {record.url}
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {record.industry}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {record.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                Keywords ({record.keywords?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {record.keywords?.map((keyword: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Created</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(record.updated_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Statistics</p>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Keywords:</span>
                    <span className="font-medium">
                      {record.keywords?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Industry:</span>
                    <span className="font-medium capitalize">
                      {record.industry}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Description Length:
                    </span>
                    <span className="font-medium">
                      {record.description?.length || 0} chars
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => window.open(record.url, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  if (record?.id != null) {
                    edit("website_analyses", record.id);
                  }
                }}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
